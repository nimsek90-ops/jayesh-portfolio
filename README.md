# JAYESH NIMSE — OFFICIAL 3D PERSONAL PORTFOLIO & DIGITAL IDENTITY

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-https%3A%2F%2Fjayesh--portfolio--vert.vercel.app-rose?style=for-the-badge&logo=vercel)](https://jayesh-portfolio-vert.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-nimsek90--ops-181717?style=for-the-badge&logo=github)](https://github.com/nimsek90-ops)

> **Official Portfolio Website**: [https://jayesh-portfolio-vert.vercel.app](https://jayesh-portfolio-vert.vercel.app)  
> **"Building intelligent solutions at the intersection of AI, Technology and Business."**  
> *Founder & CEO of ScaleRise MediaTech | AI & Technology Builder | Full-Stack Developer*

---

## 🌟 Executive Overview

This repository houses the complete, production-grade 3D personal portfolio and enterprise administration platform for **Jayesh Nimse**. 

Engineered with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **Three.js / React Three Fiber**, **Framer Motion**, and **MySQL with Prisma ORM**, this platform establishes full credibility with recruiters, venture capitalists, startup founders, business owners, and engineering collaborators.

---

## 🎨 Visual Identity & Hero Architecture

Recreated faithfully from the primary UI/UX reference design:
- **Central Focal Point**: Real high-resolution transparent cutout of **Jayesh Nimse**, preserving facial features, spectacles, hairstyle, posture, and natural proportions with zero synthetic AI alterations.
- **Layering Context**: Oversized bold background headline (`INNOVATOR ✦`) situated strictly **behind** Jayesh's photograph, with interactive mouse-responsive parallax depth.
- **Atmospheric Palette**: Smooth pastel radial ambient flow of peach (`#ffe7dc`), blush pink (`#fed4dc`), soft lavender (`#e4e9fc`), and subtle sky lighting.
- **3D WebGL Canvas**: Subtle floating interactive orbs and geometric prisms with dynamic lighting and camera parallax using Three.js & React Three Fiber.
- **Left Info Pill**: Minimalist AI tech doodle, authentic bio statement, and interactive social icons for LinkedIn, GitHub, and Instagram.
- **Right Credibility Card**: Rating score, authentic identity badges (AI Engineering, Business Strategy, ScaleRise Founder), and verified 3-point capability checklist.
- **Bottom CTA Capsule**: Floating dark capsule banner featuring a spinning holographic conic-gradient interaction with glow, hover scaling, and an arrow trigger.

---

## 📂 Architecture & Directory Structure

```
jayesh-portfolio/
├── prisma/
│   ├── schema.prisma         # Relational MySQL Prisma schema (17 models, indexes & constraints)
│   └── seed.ts               # Production database seed script
├── public/
│   └── images/
│       ├── jayesh_hero_mid_thigh.png  # High-res cutout for hero composition
│       ├── jayesh_full_clean.png      # Full-body cutout
│       ├── jayesh_hero_portrait.png   # Portrait crop
│       └── reference_design.jpg       # Design reference
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/page.tsx # Secure admin login gateway
│   │   │   └── page.tsx       # Protected 15-module admin management dashboard
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── actions/   # Real CRUD handler for projects, skills, blogs, etc.
│   │   │   │   ├── login/     # Password verification & JWT cookie issuance
│   │   │   │   └── logout/    # Session invalidation
│   │   │   └── contact/       # Contact form endpoint with Zod validation & spam protection
│   │   ├── globals.css        # Tailwind styles, glassmorphism, conic holographic gradients
│   │   ├── layout.tsx         # Root layout, fonts, and OpenGraph SEO metadata
│   │   └── page.tsx           # Dynamic homepage rendering all 16 portfolio sections
│   ├── components/
│   │   ├── admin/             # Complete Admin Dashboard UI
│   │   ├── hero/              # HeroSection and Three.js 3D WebGL canvas
│   │   ├── icons/             # Custom SVG brand icons (LinkedIn, GitHub, Instagram)
│   │   ├── navigation/        # Navbar & full-screen overlay menu
│   │   └── portfolio/         # About, Journey, Skills, Projects, Experience, Honors, Services, Blog, Resume, Contact, Footer
│   └── lib/
│       ├── auth.ts            # Bcrypt hashing, JWT session signing, cookie handling
│       ├── data-defaults.ts   # Authentic portfolio content
│       └── db.ts              # Resilient unified data access layer (MySQL Prisma + Local Store)
├── tests/
│   ├── auth.test.ts           # Authentication & security test suite
│   ├── database.test.ts       # Database persistence & analytics test suite
│   └── portfolio.test.ts      # Portfolio integrity & data accuracy checks
├── .env.example               # Environment variables template
└── vitest.config.ts           # Test runner configuration
```

---

## 🚀 Quick Start & Local Development

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+ (tested on Node v24)
- **npm** or **pnpm**
- **MySQL** (optional for local standalone preview; built-in resilient fallback layer allows full instant development even before MySQL daemon is running)

### 2. Installation
```bash
git clone https://github.com/jayeshnimse/jayesh-portfolio.git
cd jayesh-portfolio
npm install
```

### 3. Environment Configuration
Copy the template environment file:
```bash
cp .env.example .env
```
Fill in your credentials:
```env
DATABASE_URL="mysql://jayesh_user:your_password@localhost:3306/jayesh_portfolio"
JWT_SECRET="your-32-character-random-secret-key"
ADMIN_INITIAL_PASSWORD="JayeshAdmin2026!Secure"
ADMIN_NOTIFICATION_EMAIL="contact@jayeshnimse.com"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ MySQL Database Setup & Prisma Migrations

### 1. Database Creation
Create a new MySQL database on your server:
```sql
CREATE DATABASE jayesh_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'jayesh_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON jayesh_portfolio.* TO 'jayesh_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Generate Prisma Client & Run Migrations
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 3. Seed Database with Initial Content
```bash
npx tsx prisma/seed.ts
```
The seed script populates:
- Default Admin User: `admin@jayeshnimse.com` (password: `JayeshAdmin2026!Secure`)
- The 4 core projects: **ScaleRise MediaTech**, **MedNova Smart Hospital**, **AI Agents & Autonomous Workflows**, and **KIT AI Video Production System**.
- 5 Skill disciplines with editable level descriptors (**Python**, **C**, **C++**, **LLMs**, **APIs**, etc.).
- Verified achievements: **Karate Black Belt**, **National Silver Medal**, **NDA Written Examination Qualification**.
- Experience, services, testimonials, and blog articles.

---

## 🛡️ Admin Dashboard Modules (`/admin`)

Access the management dashboard at `/admin/login`:
- **Default Login**: `admin@jayeshnimse.com`
- **Initial Password**: Configured via `ADMIN_INITIAL_PASSWORD` in `.env`

### Supported Modules:
1. **Dashboard Overview**: Key metrics, system status, recent inquiries.
2. **Website Analytics**: Real page views, unique visitors, enquiry counts.
3. **Projects Management**: Create, edit, delete, search, filter, and publish projects.
4. **Skills Management**: Modify verified skill levels (`Proficient`, `Advanced`, `Expert`) without fabricated percentages.
5. **Experience Management**: Venture leadership and internship milestones.
6. **Education & Academics**: University degrees, disciplines, and academic distinctions.
7. **Achievements & Honors**: Martial arts black belt, national medals, defense exam qualifications.
8. **Certifications Management**: Technical credentials and verification links.
9. **Services Offerings**: Client engagement packages and deliverables.
10. **Testimonials Management**: Peer reviews and verified endorsements.
11. **Blog & Insights**: Technical writing editor and publishing system.
12. **Contact Inquiries**: Real-time incoming enquiry viewer with mark-read and deletion actions.
13. **Resume Management**: File download counter and version management.
14. **Social Media Management**: Configurable links for LinkedIn, GitHub, Instagram.
15. **Website Settings**: Brand title, positioning statement, and system settings.

---

## 📬 Contact Form & Email Notification

When an inquiry is submitted via the public contact form:
1. Inputs are validated with **Zod**.
2. **Honeypot protection** silently catches automated spam bots.
3. The message is immediately committed to the database so that **no inquiry is ever lost**.
4. If SMTP credentials (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`) are configured, an immediate HTML notification is dispatched to the administrator.
5. Inquiries appear instantly in the **Admin Console** under the **Contact Inquiries** tab.

---

## 🧪 Automated Testing Suite

Run the automated test suite with Vitest:
```bash
npm test
# or
npx vitest run
```
Test coverage includes:
- **Authentication**: Password hashing with salt factor 12, JWT token signing, verification, and tamper rejection.
- **Database Persistence**: Message saving, project retrieval, achievement verification.
- **Data Integrity**: Guaranteeing authentic projects, skill categories, and honors with zero fabricated statistics.

---

## ☁️ Production Deployment Guide

### Recommended Stack (Free / Low Cost Tier):
1. **Frontend / Application**: [Vercel](https://vercel.com) (Hobby Free Tier)
   - Connect your GitHub repository.
   - Set framework preset to **Next.js**.
   - Add environment variables from `.env.example`.
2. **Managed MySQL Database**:
   - [TiDB Serverless](https://tidbcloud.com) (Free 25GB storage, 100% MySQL compatible)
   - [Railway](https://railway.app) or [PlanetScale](https://planetscale.com)
   - [Aiven](https://aiven.io) Free Tier MySQL
3. **Email Notification Service**:
   - [Resend](https://resend.com) (Free 3,000 emails/month)
   - [Brevo / Sendinblue](https://brevo.com) (Free 300 emails/day)
   - Standard Google Workspace / Gmail SMTP with App Passwords

### Provider Limits & Considerations:
- **Vercel Free Tier**: 100GB bandwidth per month, 10-second serverless execution timeout.
- **TiDB Cloud / Aiven**: Ample for portfolio traffic with zero cold starts.
- **Argon2 / Native C++ Bindings**: The codebase utilizes pure-JS bcrypt algorithms to ensure 100% seamless deployment across all serverless platforms without requiring native compilation toolchains.

---

## 🔄 Backup & Recovery Procedures

### 1. Database Backup (mysqldump)
```bash
mysqldump -u jayesh_user -p jayesh_portfolio > backup_$(date +%F).sql
```

### 2. Database Restoration
```bash
mysql -u jayesh_user -p jayesh_portfolio < backup_2026-11-18.sql
```

### 3. File Store Backup
The unified fallback store is automatically preserved at `data-store.json`. Back up this file periodically to retain all offline modifications.

---

## 📜 License & Credits

Designed and developed for **Jayesh Nimse**.  
All rights reserved © 2024–Present.
