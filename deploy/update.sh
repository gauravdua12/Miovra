#!/usr/bin/env bash
# Puts the latest GitHub build of the site live. Installed by setup.sh as `miovra-update`.
# Each build lands in its own folder; if the new one doesn't start, the previous one is restored.
set -euo pipefail

URL="https://github.com/gauravdua12/Miovra/releases/download/latest/miovra.tar.gz"
RELEASES=/opt/miovra/releases
NEW="$RELEASES/$(date +%Y%m%d-%H%M%S)"
PREVIOUS=$(readlink -f /opt/miovra/current 2>/dev/null || true)

echo "Downloading the latest build…"
sudo mkdir -p "$NEW"
curl -fsSL "$URL" | sudo tar -xz -C "$NEW" --strip-components=1
sudo chown -R miovra:miovra "$NEW"
sudo restorecon -R "$NEW" 2>/dev/null || true

sudo ln -sfn "$NEW" /opt/miovra/current
sudo systemctl restart miovra

echo "Checking the site responds…"
for _ in $(seq 1 30); do
  if curl -fs -o /dev/null http://127.0.0.1:3000/en; then
    echo "Live: $NEW"
    # Keep the three newest builds for quick rollback, delete older ones.
    ls -1dt "$RELEASES"/* | tail -n +4 | xargs -r sudo rm -rf
    exit 0
  fi
  sleep 1
done

echo "The new build didn't start. Rolling back." >&2
if [[ -n "$PREVIOUS" && -d "$PREVIOUS" ]]; then
  sudo ln -sfn "$PREVIOUS" /opt/miovra/current
  sudo systemctl restart miovra
  echo "Restored: $PREVIOUS" >&2
fi
sudo journalctl -u miovra -n 30 --no-pager >&2
exit 1
