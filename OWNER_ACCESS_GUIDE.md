# Portfolio Owner Access & Infrastructure Handover Guide

**Owner:** Jayesh Nimse  
**Official Email:** jayeshnimse3@gmail.com  
**Primary Brand Identity:** AI + Technology + Business  
**Venture:** ScaleRise MediaTech (Founder & CEO)  
**Academic Rigor:** KIT's College of Engineering Kolhapur (CSBS)  
**Athletic Achievement:** Certified Shito-Ryu 1st Dan Black Belt, National Silver Medalist  
**Date of Handover:** November 22, 2026  

---

## 1. Account Ownership & Infrastructure Matrix

The table below clarifies which accounts are directly in your personal control and which cloud platforms require your 1-time setup or linking:

| Service / Infrastructure | Provider | Status | Dashboard / Access URL | Owner / Action Required |
| :--- | :--- | :---: | :--- | :--- |
| **Personal Identity & Inbox** | Google / Gmail | **ACTIVE** | `https://mail.google.com` | `jayeshnimse3@gmail.com` (Your account) |
| **Source Code Repository** | GitHub | **ACTIVE** | `https://github.com/nimsek90-ops` | Owned by Jayesh (`nimsek90-ops`) |
| **Frontend Hosting** | Vercel | **READY** | `https://vercel.com/dashboard` | Sign in with your GitHub account |
| **Admin Moderation Portal** | Internal | **ACTIVE** | `http://localhost:3000/admin/login` (or `https://yourdomain.com/admin/login`) | Built-in (Your email + `ADMIN_INITIAL_PASSWORD`) |
| **Email Dispatch Engine** | Resend | **CONFIGURABLE** | `https://resend.com/overview` | Sign up with `jayeshnimse3@gmail.com` to get API key |
| **Cloud SQL Database** | Supabase / Railway | **OPTIONAL** | `https://supabase.com/dashboard` | Free tier ready whenever you want cloud SQL |
| **LinkedIn Profile** | LinkedIn | **ACTIVE** | `https://www.linkedin.com/in/jayesh-nimse-5578b526b` | Linked on website |
| **Instagram Profile** | Instagram | **ACTIVE** | `https://www.instagram.com/jayesh_v_nimse` | Linked on website |
| **MedNova Live Project** | Vercel | **ACTIVE** | `https://mednova-jvn-vercel-snowy.vercel.app/` | Showcase link live |

---

## 2. Administrator Access & Moderation Instructions

Your website includes a secure, private moderation dashboard.

### How to Access the Admin Dashboard:
1. Navigate to: `http://localhost:3000/admin/login` (in local testing) or `https://yourdomain.com/admin/login` (in production).  
   *(Visiting `/login` will automatically redirect you to `/admin/login`)*.
2. Enter your credentials:
   * **Admin Email:** `jayeshnimse3@gmail.com`
   * **Password:** The password defined in your `.env` file under `ADMIN_INITIAL_PASSWORD`.
3. Click **"Authenticate as Admin"**.
4. You will be redirected to `/admin` where you can:
   * Review all visitor comments currently in `PENDING` status.
   * Click **"Approve"** to publish a comment to the live public website.
   * Click **"Reject"** or **"Delete"** to discard spam or unwanted comments.
   * View all incoming contact form inquiries, sender details, and service interests.
   * Manage projects, case studies, skills, and achievements.

---

## 3. Contact Form & Transactional Email Setup

When a visitor fills out the contact form:
1. The message is **immediately stored in your database/store** so it is never lost.
2. If you want an instant email alert forwarded directly to `jayeshnimse3@gmail.com`:
   * Go to [resend.com](https://resend.com) and create a free account with `jayeshnimse3@gmail.com`.
   * Create an API Key (starts with `re_...`).
   * Add `RESEND_API_KEY="re_..."` to your `.env` file or Vercel environment variables.
   * Every incoming inquiry will automatically deliver an email directly to your inbox.

---

## 4. Local Development Workflow

To run and maintain the project on your local machine:

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.
3. **Execute Test Suite:**
   ```bash
   npm run test
   ```
4. **Compile Production Build:**
   ```bash
   npm run build
   ```
5. **Run Production Server Locally:**
   ```bash
   npm run start -- -p 3000
   ```

---

## 5. Master Portfolio Readiness Checklist

| Requirement / Module | Verification Test | Status | Evidence |
| :--- | :--- | :---: | :--- |
| **Zero Fake Reviews / Fabrications** | Codebase & DB scan | **PASS** | `TestimonialsSection` removed; zero dummy reviews exist |
| **Visitor Comment System** | POST /api/comments | **PASS** | Comments submit as `PENDING`; emails hidden from public feed |
| **Admin Moderation Dashboard** | POST /api/admin/actions | **PASS** | Only authenticated admins can approve, reject, or delete |
| **Authentication & Password Security**| tests/auth.test.ts | **PASS** | Bcrypt hash + signed JWT; insecure `"admin123"` removed |
| **Direct Contact Form** | POST /api/contact | **PASS** | Submissions persist safely; targets `jayeshnimse3@gmail.com` |
| **Resilient Unified Database** | tests/database.test.ts | **PASS** | 0ms local fallback when MySQL is off; Prisma-ready schema |
| **Security Headers & CSP** | verify_e2e.mjs | **PASS** | CSP, X-Frame-Options: DENY, nosniff present on all routes |
| **Search Engine Optimization (SEO)** | HTTP 200 checks | **PASS** | Dynamic `sitemap.xml`, `robots.txt`, JSON-LD schemas active |
| **Answer Engine Optimization (AEO)** | HTTP 200 checks | **PASS** | Structured FAQ knowledge base matching visible content |
| **Generative Engine Optimization (GEO)**| Public route check | **PASS** | `llms.txt` and `llms-full.txt` live for AI crawlers |
| **Matrix of Innovation UI** | Component verification | **PASS** | Sleek cyan/blue cosmic vortex, digital code rain, 5 pills |
| **Photo-Canvas Theme Cohesion** | CSS & Layout review | **PASS** | Signature warm ivory (`#faf7f4`), peach/blush gradients |
| **Smooth Scrolling Momentum** | SmoothScrollProvider | **PASS** | Lenis provider active; circular mouse cursor removed |
| **TypeScript Strictness** | npx tsc --noEmit | **PASS** | 0 type errors across all files |
| **ESLint Standards** | npm run lint | **PASS** | 0 errors, 0 warnings |
| **Automated Test Suite** | npm run test | **PASS** | 20 of 20 unit & integration tests passing |
| **External Cloud Relational SQL** | Local socket test | **NOT CONFIGURED** | Runs on persistent local store; instructions provided |
| **Resend API Key** | Environment check | **NOT CONFIGURED** | Optional for instant email dispatch; instructions provided |
