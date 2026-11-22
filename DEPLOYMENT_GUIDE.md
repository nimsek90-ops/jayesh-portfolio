# Production Deployment & Hosting Guide

**Target Audience:** Jayesh Nimse & Operations Team  
**Recommended Platform:** Vercel (Edge Network + Serverless Functions)  
**Database Options:** Supabase / Neon (Serverless Postgres) or Railway (MySQL)  
**Status:** **READY FOR 1-CLICK DEPLOYMENT**

---

## 1. Hosting Architecture Overview

```
[ Visitor / Recruiter / Founder ]
              │
              ▼
    [ Vercel Global Edge CDN ]  <── Auto SSL (Let's Encrypt), HTTP/2 & HTTP/3, Brotli Compression
              │
              ├── [ Static HTML / CSS / WebP Images / WebFonts ] (Cached at Edge)
              │
              └── [ Serverless Route Handlers ]
                        │
                        ├── [/api/comments]
                        ├── [/api/contact]
                        └── [/api/admin/*]
                                  │
                                  ▼
                    [ Managed Database / Store ]
                    - Supabase / Neon / Railway OR
                    - data-store.json fallback
```

---

## 2. Step-by-Step Vercel Deployment (Recommended)

### Step 1: Push Code to Your Personal GitHub Account
1. Create a private or public repository on GitHub: `https://github.com/nimsek90-ops/jayesh-portfolio`.
2. Commit your local files and push:
   ```bash
   git add .
   git commit -m "feat: complete production-ready portfolio"
   git branch -M main
   git remote add origin https://github.com/nimsek90-ops/jayesh-portfolio.git
   git push -u origin main
   ```

### Step 2: Import into Vercel
1. Log in to [vercel.com](https://vercel.com) using your GitHub account.
2. Click **"Add New..."** ➔ **"Project"**.
3. Select your repository `jayesh-portfolio`.
4. Framework Preset will auto-detect **Next.js**.
5. Root Directory: `./` (Leave as default).

### Step 3: Configure Environment Variables in Vercel Dashboard
Under **"Environment Variables"**, add the following keys:

| Key | Value Description | Production Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Your public domain | `https://jayeshnimse.com` |
| `JWT_SECRET` | 32+ character random secret | Generate via `openssl rand -base64 32` |
| `ADMIN_INITIAL_PASSWORD` | Strong password for `/admin` | `[YourSecretPassword2026!]` |
| `ADMIN_NOTIFICATION_EMAIL`| Your inbox for inquiries | `jayeshnimse3@gmail.com` |
| `RESEND_API_KEY` | *(Optional)* Resend API Key | `re_123456789...` |
| `DATABASE_URL` | *(Optional)* PostgreSQL / MySQL | `postgres://postgres:...@db...` |

### Step 4: Click Deploy
* Vercel will run `npm run build`.
* In ~60 seconds, your portfolio is live with a `*.vercel.app` URL and global CDN caching.

---

## 3. Custom Domain Configuration (e.g. `jayeshnimse.com`)

1. In the Vercel Project Dashboard, navigate to **Settings** ➔ **Domains**.
2. Enter your domain: `jayeshnimse.com` and `www.jayeshnimse.com`.
3. In your DNS Provider (e.g. GoDaddy, Namecheap, Cloudflare, Google Domains), configure these records:

| Type | Name / Host | Target / Value | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` | Auto (or 3600) |
| **CNAME** | `www` | `cname.vercel-dns.com` | Auto (or 3600) |

4. Vercel automatically issues an SSL certificate within 15 minutes of DNS propagation.

---

## 4. Production Database Setup (Optional Cloud Upgrade)

If you wish to attach a cloud relational database to sync with Prisma:

### Option A: Supabase (PostgreSQL)
1. Sign up at [supabase.com](https://supabase.com) and create a project.
2. Navigate to **Project Settings** ➔ **Database** ➔ **Connection String (Node.js)**.
3. In `prisma/schema.prisma`, update provider to `provider = "postgresql"`.
4. In your terminal, deploy schema:
   ```bash
   npx prisma db push
   ```
5. Copy the connection string to Vercel's `DATABASE_URL`.

### Option B: Railway (MySQL)
1. Sign up at [railway.app](https://railway.app) and click **"New"** ➔ **"Database"** ➔ **"Add MySQL"**.
2. Copy the `DATABASE_URL` from the Connect tab.
3. Run `npx prisma db push`.
4. Add `DATABASE_URL` to Vercel.

---

## 5. Backup & Disaster Recovery

1. **Local Data Store Backup:**  
   The file `data-store.json` contains your verified projects, achievements, and visitor comments. Commit this file or download a copy periodically as a static backup.
2. **Instant Rollbacks on Vercel:**  
   If any production issue arises, navigate to **Deployments** in Vercel, select any previous successful deployment, and click **"Instant Rollback"**. The previous version goes live in under 2 seconds.
3. **Database Dumps (If Cloud SQL is attached):**  
   * For PostgreSQL (Supabase/Neon): `pg_dump -d [DATABASE_URL] > backup.sql`
   * For MySQL (Railway): `mysqldump -u root -p [DB_NAME] > backup.sql`
