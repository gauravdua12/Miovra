# Putting miovra.eu live on Oracle Cloud (OCI)

Built for the **Always Free 1 GB RAM / 1 OCPU** server running **Oracle Linux** (user `opc`).

**How it fits in 1 GB:** the site is **built by GitHub**, not on the server. Every push to `main` triggers a build that publishes a ready-to-run package as the repo's **latest** release. The server only runs two small programs:

| Program | Job | Memory (measured) |
|---|---|---|
| **Node.js** | Renders the website | ~105 MB idle, ~160 MB under heavy load |
| **Caddy** | HTTPS certificates; serves photos, styles and scripts from disk | ~15–30 MB |

There is no Docker and nothing is compiled on the server. Almost every page is pre-rendered, so the small CPU has very little to do. A 2 GB swap file is added as a safety net.

**You will need:** your Mac's Terminal; access to the DNS for **miovra.eu** (Oderland) and **miovra.in** (Endurance India / BigRock); the Miovra4u@gmail.com Google account.

> Oracle's console labels change from time to time. If a button is named slightly differently, pick the closest match.

---

## Part A · Network (VCN) — skip if done

1. Menu (☰) → **Networking → Virtual cloud networks** → **Actions → Start VCN Wizard** → **Create VCN with Internet Connectivity**.
2. Name `miovra-vcn`; keep the default CIDRs (`10.0.0.0/16`, public subnet `10.0.0.0/24`). **Next → Create**.

If you created the VCN another way, check these two things, or nothing can reach the server:
- **Internet gateway:** VCN → **Gateways** → an Internet Gateway exists (create `miovra-igw` if not).
- **Route:** VCN → **Routing / Route Tables** → the route table used by your subnet has a rule **Destination `0.0.0.0/0` → Target: Internet Gateway**.

**Open the ports:** subnet → **Security / Security Lists** → **Add Ingress Rules**, source `0.0.0.0/0`, TCP:

| Port | Purpose |
|---|---|
| 22 | SSH (already there by default) |
| 80 | Web |
| 443 | Web (HTTPS) |

---

## Part B · Server — skip if done

1. **Compute → Instances → Create instance**, name `miovra-web`.
2. **Image:** Oracle Linux (9 recommended). **Shape:** the Always Free one available to you, for example **VM.Standard.E2.1.Micro** (1 OCPU, 1 GB).
3. **Networking:** `miovra-vcn`, public subnet, **assign a public IPv4 address**.
4. **SSH keys:** *Generate a key pair for me* → **Save private key**.
5. **Create**, wait for **Running**, note the **Public IP address**.

Optional: making the IP permanent (Networking tab → VNIC → IP administration → Edit → No public IP, then Edit → Reserved public IP). The normal IP survives reboots; it's only lost if the server is deleted.

---

## Part C · Connect from your Mac — skip if done

```bash
mkdir -p ~/.ssh && mv ~/Downloads/ssh-key-*.key ~/.ssh/miovra.key && chmod 400 ~/.ssh/miovra.key
```

```bash
ssh -i ~/.ssh/miovra.key opc@YOUR_IP
```

---

## Part D · Install everything (one script, about 5 minutes)

On the server, run:

```bash
curl -fsSLO https://raw.githubusercontent.com/gauravdua12/Miovra/main/deploy/setup.sh && bash setup.sh
```

It prints each step as it goes:

1. Adds a 2 GB swap file and tells Linux to use it only when needed.
2. Turns off the automatic package-list refresh (`dnf-makecache`), which is known to eat memory on 1 GB servers.
3. Checks for `tar`, `xz`, `curl` and `nano` and installs only what's missing, loading just the base package list. A full `dnf` run can be killed for lack of memory on 1 GB.
4. Opens ports 80 and 443 in the server's firewall.
5. Installs **Node.js 22** (official build, checksum verified).
6. Installs **Caddy 2.8.4** (official build, checksum verified).
7. Creates the `miovra` and `caddy` service accounts, the folders, the settings file `/etc/miovra/miovra.env`, and the two services, which start automatically after a reboot.
8. Downloads the latest website build, starts it, checks it responds, then starts Caddy.

It finishes with the memory in use. The script is safe to run again; it skips steps that are already done.

---

## Part E · Point both domains at the server

**miovra.eu** — DNS is at **Oderland** (control panel → DNS / zone editor):
- Delete both A records for `@` (`91.201.63.189` and Shopify's `23.227.38.65`) and the `www` CNAME to `shops.myshopify.com`. Leave any **MX** (email) records alone.
- Add **A `@` → YOUR_IP** and **A `www` → YOUR_IP**.

**miovra.in** — at **Endurance India / BigRock** (DNS Management):
- Delete the parked records pointing to `127.0.0.1`.
- Add **A `@` → YOUR_IP** and **A `www` → YOUR_IP**.

`www.miovra.eu` is the site; `miovra.eu`, `miovra.in` and `www.miovra.in` all forward to it. Caddy fetches the HTTPS certificates on its own once DNS points at the server, usually within minutes of the change spreading. Check from your Mac:

```bash
dig +short www.miovra.eu www.miovra.in
```

---

## Part F · Turn on enquiry emails

1. Sign in to Miovra4u@gmail.com → turn on **2-Step Verification** → create an **App password** at https://myaccount.google.com/apppasswords (name it `Miovra website`). Copy the 16 letters.
2. On the server, open the settings file:

```bash
sudo nano /etc/miovra/miovra.env
```

3. Paste the password after `SMTP_PASS=` (no spaces). Save with **Ctrl+O**, **Enter**, then **Ctrl+X**. (If the setup said nano isn't installed, use `sudo vi` instead: press `i` to type, then `Esc` and `:wq` to save.)
4. Restart the site:

```bash
sudo systemctl restart miovra
```

---

## Part G · Check it's live

```bash
systemctl status miovra caddy --no-pager
```

Both should say **active (running)**. Then open **https://www.miovra.eu**, check the padlock, try `miovra.in` (it should forward), and send a test enquiry from the Connect page.

---

## Everyday tasks (on the server)

**Publish changes.** After a change is pushed to GitHub, wait about 3 minutes for the build (the repo's **Actions** tab shows a green tick), then run:

```bash
miovra-update
```

It downloads the new build, switches over, checks the site responds, and **rolls back automatically** if it doesn't.

**Read saved enquiries and sign-ups** (each is also emailed):

```bash
sudo cat /var/lib/miovra/enquiries.jsonl
```

```bash
sudo cat /var/lib/miovra/subscribers.jsonl
```

**See recent logs:**

```bash
sudo journalctl -u miovra -n 50 --no-pager
```

```bash
sudo journalctl -u caddy -n 50 --no-pager
```

**Memory check:**

```bash
free -h
```

**Restart:**

```bash
sudo systemctl restart miovra caddy
```

**Optional, frees roughly another 50–100 MB:** in the console, instance → **Oracle Cloud Agent** tab, disable the plugins you don't use (for example *Vulnerability Scanning*, *Management Agent*, *Custom Logs Monitoring*). Keep *Compute Instance Monitoring* if you want the memory and CPU graphs.

---

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `ssh` times out | Missing internet gateway, route `0.0.0.0/0`, or port 22 rule (Part A). |
| `ssh` says *Permission denied* | On Oracle Linux the user is `opc`; the key needs `chmod 400`. |
| Site unreachable in the browser | Ports 80/443 missing in the Security List (Part A). The setup script opens the server's own firewall. |
| No padlock / certificate errors in `journalctl -u caddy` | DNS not pointing at YOUR_IP yet (Part E). Caddy retries on its own. |
| Enquiries saved but no email | Wrong app password, or spaces in it. Fix `/etc/miovra/miovra.env`, then `sudo systemctl restart miovra`. |
| `miovra-update` says the build didn't start | It already rolled back. Send me the log lines it printed. |
| A step prints `Killed` | Out of memory. Run `bash setup.sh` again (it skips finished steps); if it repeats, disable the Oracle Cloud Agent plugins (Everyday tasks) and retry. |
