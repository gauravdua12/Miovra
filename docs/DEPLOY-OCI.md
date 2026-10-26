# Putting miovra.eu live on Oracle Cloud (OCI)

A step-by-step guide starting from no Oracle account at all. Allow about 1–2 hours, plus waiting time for DNS changes.

**What you'll end up with:** one small Linux server in Oracle Cloud running the Miovra website, with HTTPS (the padlock) set up and renewed automatically, and every enquiry emailed to Miovra4u@gmail.com.

**Cost:** everything here fits inside Oracle's **Always Free** allowance (an ARM server with up to 4 CPUs and 24 GB memory, 200 GB of storage, 10 TB of traffic a month). Oracle asks for a card to verify you, but doesn't charge for Always Free resources.

**You will need:**
- A credit or debit card (for identity verification).
- Access to wherever `miovra.eu` is registered, to change its DNS. It currently points at a Shopify store.
- Access to the Miovra4u@gmail.com Google account, to create an app password for sending emails.
- Your Mac's Terminal app.

> Screen labels in the Oracle console change from time to time. If a button is named slightly differently, look for the closest match. The steps stay the same.

---

## Part A · Create the Oracle Cloud account

1. Go to **https://www.oracle.com/cloud/free/** and click **Start for free**.
2. Fill in your country (Sweden), name and email, then verify the email.
3. Choose a **Cloud Account Name**, for example `miovra`. You'll type this every time you sign in, so note it down.
4. Choose your **Home Region**. Pick **Sweden Central (Stockholm)**, which is closest to your customers.
   - ⚠️ The home region **can't be changed later**, and Always Free servers can only be created there.
   - If Stockholm isn't offered, choose **Germany Central (Frankfurt)**.
5. Enter your address and phone number, then add your card for verification. A small temporary hold may appear and is released.
6. Accept the agreement and click **Start my free trial**. Setup takes a few minutes, and you'll get an email when the account is ready.
7. Sign in at **https://cloud.oracle.com** with your Cloud Account Name, email and password. Turn on two-factor sign-in when it's offered.

### Recommended: upgrade to Pay As You Go

On a pure free account, Oracle may **reclaim servers that look idle** for a week, and a quiet small-business website can look idle. Upgrading removes that risk. **Always Free resources stay free after upgrading**; you only pay if you deliberately create something bigger.

1. In the console menu (☰), go to **Billing & Cost Management → Upgrade and Manage Payment**.
2. Choose **Upgrade to Pay As You Go** and confirm.
3. Then set a safety net: **Billing & Cost Management → Budgets → Create Budget**, with an amount of **1** (in your currency) and an alert to your email at 100%. If anything ever starts costing money, you'll know straight away.

---

## Part B · Create the network

1. Menu (☰) → **Networking → Virtual cloud networks**.
2. Check the **Compartment** on the left is your root compartment (it has your account name).
3. Click **Actions → Start VCN Wizard** (sometimes shown as a **Start VCN Wizard** button).
4. Choose **Create VCN with Internet Connectivity** → **Start VCN Wizard**.
5. Name it `miovra-vcn`. Leave every other setting as it is. Click **Next**, then **Create**.
6. When it finishes, click **View VCN**.

### Open the web ports (80 and 443)

1. Inside `miovra-vcn`, open **Subnets** → click **public subnet-miovra-vcn**.
2. Open **Security Lists** (or the **Security** tab) → click **Default Security List for miovra-vcn**.
3. **Security Rules** (or **Ingress Rules**) → **Add Ingress Rules**, and add two rules:

| Source CIDR | IP Protocol | Destination Port Range | Description |
|---|---|---|---|
| `0.0.0.0/0` | TCP | `80` | Web (HTTP) |
| `0.0.0.0/0` | TCP | `443` | Web (HTTPS) |

4. Click **Add Ingress Rules**. Port 22 (SSH) is already open by default; leave it.

---

## Part C · Create the server

1. Menu (☰) → **Compute → Instances** → **Create instance**.
2. **Name:** `miovra-web`.
3. **Image and shape** → **Edit**:
   - **Image:** click **Change image** → **Ubuntu** → **Canonical Ubuntu 24.04** (not the "Minimal" one) → **Select image**.
   - **Shape:** click **Change shape** → **Virtual machine** → **Ampere** → **VM.Standard.A1.Flex**. Set **OCPUs = 1** and **Memory = 6 GB**. It shows an **Always Free-eligible** label. → **Select shape**.
4. **Networking:** choose `miovra-vcn` and its **public subnet**. Make sure **Automatically assign public IPv4 address** is **on**.
5. **Add SSH keys:** choose **Generate a key pair for me** → click **Save private key**. A file like `ssh-key-2026-10-27.key` downloads.
   - ⚠️ Keep this file safe. It's the only way into the server, and Oracle can't send it again.
6. **Boot volume:** leave the default (about 47–50 GB).
7. Click **Create**. After a minute or two the status turns green: **Running**.
8. On the instance page, copy the **Public IP address** (for example `141.144.x.x`). This guide calls it **YOUR_IP**.

> **"Out of capacity" error?** Free ARM servers are popular. Try again in a few hours, pick a different **Availability domain** in the Placement section, or (on Pay As You Go) simply retry later the same day. It usually works within a day.

### Optional: make the IP address permanent

The public IP survives reboots and stop/start; it's only lost if the server is deleted. A reserved IP stays yours even then, which helps if you ever rebuild the server. You can skip this and use the current IP.

1. On the instance page → **Networking** tab → scroll to **Attached VNICs** (or **VNICs**) → click the VNIC name.
2. **IP administration** tab (or **IPv4 Addresses** under Resources) → on the row with the public IP, click **⋮ → Edit**.
3. Choose **No public IP** → **Update**. (This releases the temporary IP.)
4. Click **⋮ → Edit** again → choose **Reserved public IP** → **Create a new reserved IP**, named `miovra-ip` → **Update**.
5. Note the new address. This is now **YOUR_IP** for the rest of the guide.

---

## Part D · Connect to the server from your Mac

Open **Terminal** on your Mac and run these one at a time. Replace the file name and YOUR_IP with yours.

```bash
mkdir -p ~/.ssh && mv ~/Downloads/ssh-key-*.key ~/.ssh/miovra.key
```

```bash
chmod 400 ~/.ssh/miovra.key
```

```bash
ssh -i ~/.ssh/miovra.key ubuntu@YOUR_IP
```

Type `yes` when asked about the fingerprint. Your prompt changes to something like `ubuntu@miovra-web:~$`. Everything in Parts E–H runs **on the server**, in this window.

---

## Part E · Prepare the server

**1. Update the system** (takes a few minutes):

```bash
sudo apt update && sudo apt -y upgrade
```

**2. Open the web ports in the server's own firewall.** Oracle's Ubuntu images block everything except SSH, in addition to the network rules from Part B.

```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
```

```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
```

```bash
sudo netfilter-persistent save
```

**3. Install Docker**, which runs the website and the HTTPS server:

```bash
curl -fsSL https://get.docker.com | sudo sh
```

```bash
sudo usermod -aG docker ubuntu
```

Then log out with `exit` and connect again with the same `ssh` command from Part D, so the new permission takes effect. Check that it works:

```bash
docker run --rm hello-world
```

You should see "Hello from Docker!".

---

## Part F · Point miovra.eu at the server

At the moment `miovra.eu` points at Shopify. Change it where the domain's DNS is managed:
- **If you bought the domain through Shopify:** Shopify admin → **Settings → Domains** → click `miovra.eu` → **Domain settings → Edit DNS settings**.
- **Otherwise:** sign in to your domain registrar (where you pay for miovra.eu) and open its **DNS** settings.

Then:
1. **Delete** the Shopify records (in Shopify you may first need to disconnect the domain from the store under **Settings → Domains**), typically an **A** record for `@` pointing to `23.227.38.65` and a **CNAME** for `www` pointing to `shops.myshopify.com`.
2. **Add** these two records:

| Type | Name / Host | Value / Points to | TTL |
|---|---|---|---|
| A | `@` (the bare domain) | YOUR_IP | 300 (or default) |
| A | `www` | YOUR_IP | 300 (or default) |

3. Save. Changes usually take effect within minutes but can take a few hours. To check from your Mac (not the server), run:

```bash
dig +short www.miovra.eu
```

When it prints YOUR_IP, DNS is ready.

> Changing the DNS takes the old Shopify page offline. It currently shows "Store unavailable" anyway. Cancel the Shopify plan separately if you no longer need it.

---

## Part G · Set up email sending (Gmail app password)

The website sends each enquiry to Miovra4u@gmail.com through Gmail. Google requires a special **app password** for this, not your normal password.

1. Sign in to Miovra4u@gmail.com and go to **https://myaccount.google.com/security**.
2. Turn on **2-Step Verification** if it isn't already on.
3. Go to **https://myaccount.google.com/apppasswords**, name it `Miovra website` and click **Create**.
4. Google shows a 16-letter password. Copy it; you'll paste it in the next part. It's only shown once.

---

## Part H · Install and start the website

Back in the server window:

**1. Download the site:**

```bash
git clone https://github.com/gauravdua12/Miovra.git && cd Miovra
```

**2. Create the settings file** from the example:

```bash
cp .env.example .env && nano .env
```

In the editor, paste the Gmail app password after `SMTP_PASS=` (no spaces). Leave the other lines as they are unless you want enquiries to go to a different address (`MAIL_TO`). Save with **Ctrl+O**, **Enter**, then exit with **Ctrl+X**.

**3. Build and start** (the first build takes about 5–10 minutes):

```bash
docker compose up -d --build
```

**4. Watch it start:**

```bash
docker compose logs -f
```

Look for `Ready` from the website and `certificate obtained successfully` from Caddy. Press **Ctrl+C** to stop watching. The site keeps running.

**5. Open https://www.miovra.eu** in your browser. 🎉 Then:
- Check the padlock icon appears.
- Check `http://miovra.eu` forwards to `https://www.miovra.eu`.
- Send a test enquiry from the Connect page and check it arrives in Miovra4u@gmail.com.

> If Caddy logs a certificate error, DNS (Part F) isn't pointing at the server yet. Wait until `dig` shows YOUR_IP, then run `docker compose restart caddy`.

---

## Everyday tasks

All of these run on the server, inside the `Miovra` folder (`cd ~/Miovra`).

**Publish the latest version of the site** (after changes are pushed to GitHub):

```bash
git pull && docker compose up -d --build
```

**See saved enquiries and sign-ups** (each one is also emailed):

```bash
docker compose exec web cat /app/data/enquiries.jsonl
```

```bash
docker compose exec web cat /app/data/subscribers.jsonl
```

**Restart everything:**

```bash
docker compose restart
```

**Check what's running:**

```bash
docker compose ps
```

The site and Caddy restart automatically if the server reboots.

### Backups

In the console: **Compute → Instances → miovra-web → Boot volume → Backups**, or assign a **backup policy** (Bronze is enough). The Always Free allowance includes a handful of volume backups. The website code itself is always safe on GitHub; the backup protects the saved enquiries and settings.

---

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `ssh` says *Permission denied (publickey)* | Wrong key file or user. The user is `ubuntu`, and the key must be the one saved in Part C. Run `chmod 400` on it. |
| `ssh` hangs | The server isn't running, or the wrong IP. Check the instance status and the reserved IP. |
| Browser can't reach the site at all | Port 80/443 missing in the Security List (Part B) or the server firewall (Part E, step 2). |
| Site works on the IP but no padlock | DNS not pointing at YOUR_IP yet (Part F), or the old Shopify records are still there. |
| Enquiries saved but no email | The app password in `.env` is wrong or has spaces. Fix it, then run `docker compose up -d`. |
| *Out of capacity* when creating the server | See the note in Part C. Retry later or in another availability domain. |

---

## When you're done

Tell me **YOUR_IP** and that the site is up, or where you got stuck. If you'd like me to run Parts E–H for you instead, I'll need SSH access to the server. We can set that up together, so you never have to send the private key itself.
