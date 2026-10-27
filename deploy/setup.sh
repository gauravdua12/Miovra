#!/usr/bin/env bash
# One-time setup of an Oracle Linux server for www.miovra.eu. Run as the `opc` user:
#   curl -fsSLO https://raw.githubusercontent.com/gauravdua12/Miovra/main/deploy/setup.sh && bash setup.sh
#
# Built for a 1 GB RAM / 1 OCPU instance: no Docker, nothing is compiled on the server.
# The site is built by GitHub Actions; this server only runs Node.js (the site) and Caddy (HTTPS).
# Safe to run again: each step skips what's already done.
set -euo pipefail

NODE_MAJOR=22
CADDY_VERSION=2.8.4
RAW="https://raw.githubusercontent.com/gauravdua12/Miovra/main/deploy"

case "$(uname -m)" in
  x86_64) NODE_ARCH=x64; CADDY_ARCH=amd64 ;;
  aarch64) NODE_ARCH=arm64; CADDY_ARCH=arm64 ;;
  *) echo "Unsupported CPU type: $(uname -m)" >&2; exit 1 ;;
esac

step() { echo; echo "== $* =="; }
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

step "1/8 Swap space (2 GB safety net for the 1 GB of memory)"
if ! sudo swapon --show | grep -q /swapfile; then
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
fi
echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/90-miovra.conf >/dev/null
sudo sysctl -q -p /etc/sysctl.d/90-miovra.conf

step "2/8 Stop background package-index refreshes (they spike memory on small servers)"
sudo systemctl disable --now dnf-makecache.timer 2>/dev/null || true

step "3/8 Small tools: tar/xz for unpacking, nano for editing settings"
sudo dnf install -y -q tar xz nano curl policycoreutils

step "4/8 Firewall: allow web traffic (ports 80 and 443)"
sudo firewall-cmd -q --permanent --add-service=http --add-service=https
sudo firewall-cmd -q --reload

step "5/8 Node.js $NODE_MAJOR (runs the website)"
if ! command -v node >/dev/null || [[ "$(node -v)" != v$NODE_MAJOR.* ]]; then
  BASE="https://nodejs.org/dist/latest-v$NODE_MAJOR.x"
  curl -fsSL "$BASE/SHASUMS256.txt" -o "$TMP/SHASUMS256.txt"
  FILE=$(grep -o "node-v[0-9.]*-linux-$NODE_ARCH\.tar\.xz" "$TMP/SHASUMS256.txt" | head -1)
  curl -fsSL "$BASE/$FILE" -o "$TMP/$FILE"
  (cd "$TMP" && grep " $FILE\$" SHASUMS256.txt | sha256sum -c -)
  sudo tar -xJf "$TMP/$FILE" -C /usr/local --strip-components=1 --exclude='*/include' --exclude='*/share/doc'
  sudo restorecon -R /usr/local/bin /usr/local/lib 2>/dev/null || true
fi
echo "Node $(node -v)"

step "6/8 Caddy $CADDY_VERSION (HTTPS and serving photos)"
if ! command -v caddy >/dev/null || ! caddy version | grep -q "v$CADDY_VERSION"; then
  FILE="caddy_${CADDY_VERSION}_linux_${CADDY_ARCH}.tar.gz"
  REL="https://github.com/caddyserver/caddy/releases/download/v$CADDY_VERSION"
  curl -fsSL "$REL/$FILE" -o "$TMP/$FILE"
  curl -fsSL "$REL/caddy_${CADDY_VERSION}_checksums.txt" -o "$TMP/checksums.txt"
  (cd "$TMP" && grep " $FILE\$" checksums.txt | sha512sum -c -)
  sudo tar -xzf "$TMP/$FILE" -C /usr/local/bin caddy
  sudo restorecon /usr/local/bin/caddy 2>/dev/null || true
fi
caddy version

step "7/8 Service accounts, folders and settings"
id miovra >/dev/null 2>&1 || sudo useradd --system --home-dir /opt/miovra --no-create-home --shell /sbin/nologin miovra
id caddy >/dev/null 2>&1 || sudo useradd --system --home-dir /var/lib/caddy --no-create-home --shell /sbin/nologin caddy
sudo mkdir -p /opt/miovra/releases /var/lib/miovra /etc/miovra /etc/caddy /var/lib/caddy
sudo chown miovra:miovra /var/lib/miovra
sudo chown caddy:caddy /var/lib/caddy
if [[ ! -f /etc/miovra/miovra.env ]]; then
  curl -fsSL "$RAW/miovra.env.example" | sudo tee /etc/miovra/miovra.env >/dev/null
fi
sudo chown root:miovra /etc/miovra/miovra.env
sudo chmod 640 /etc/miovra/miovra.env
curl -fsSL "$RAW/Caddyfile" | sudo tee /etc/caddy/Caddyfile >/dev/null
curl -fsSL "$RAW/miovra.service" | sudo tee /etc/systemd/system/miovra.service >/dev/null
curl -fsSL "$RAW/caddy.service" | sudo tee /etc/systemd/system/caddy.service >/dev/null
curl -fsSL "$RAW/update.sh" | sudo tee /usr/local/bin/miovra-update >/dev/null
sudo chmod 755 /usr/local/bin/miovra-update
sudo restorecon -R /etc/systemd/system /etc/caddy /etc/miovra /usr/local/bin 2>/dev/null || true
sudo systemctl daemon-reload
sudo systemctl enable -q miovra caddy

step "8/8 Download the website and start everything"
miovra-update
sudo systemctl restart caddy

echo
echo "Done. Memory in use:"
free -h
echo
echo "Next: add the Gmail app password with  sudo nano /etc/miovra/miovra.env"
echo "      then run                         sudo systemctl restart miovra"
