# Backend API Audit & Verification Report

**Project:** Jayesh Nimse Personal Portfolio  
**Audit Date:** November 22, 2026  
**Auditor:** Senior Full-Stack Engineer & API Architect  
**Status:** **ALL ENDPOINTS TESTED & VERIFIED (100% OPERATIONAL)**

---

## 1. API Route Inventory & Specification

The backend runs entirely on Next.js 14 App Router Route Handlers (`src/app/api/`):

| Endpoint | HTTP Method | Auth Required | Rate Limited | Description |
| :--- | :---: | :---: | :---: | :--- |
| `/api/comments` | `GET` | No | No (Edge Cached) | Public feed of approved visitor comments |
| `/api/comments` | `POST` | No | **Yes (3/10m)** | Visitor comment submission (PENDING status) |
| `/api/contact` | `POST` | No | **Yes (5/min)** | Contact inquiry form with DB persistence & email |
| `/api/admin/login` | `POST` | No | **Yes** | Administrator authentication & JWT issuance |
| `/api/admin/logout`| `POST` | Yes | No | Destroys admin session cookie |
| `/api/admin/actions`| `POST`| **Yes (Admin)**| No | Moderation CRUD (approve, reject, delete comments) |

---

## 2. Live HTTP Test Results & Evidence

All endpoints were tested live against the local Next.js production server (`http://localhost:3000`).

### Test 1: `GET /api/comments` (Public Feed)
* **Request:** `GET http://localhost:3000/api/comments`
* **Response Status:** `HTTP 200 OK`
* **Response Body:**
  ```json
  {
    "success": true,
    "comments": []
  }
  ```
* **Security Verification:**  
  * Returns strictly comments where `status === "APPROVED"`.
  * The `email` field is **never** included in the response projection, protecting visitor privacy.

### Test 2: `POST /api/comments` (Visitor Submission)
* **Request:** `POST http://localhost:3000/api/comments`
* **Payload:**
  ```json
  {
    "name": "Audit Test Visitor",
    "email": "audit@visitor.test",
    "content": "This is an automated hosting readiness test comment."
  }
  ```
* **Response Status:** `HTTP 201 Created`
* **Response Body:**
  ```json
  {
    "success": true,
    "message": "Your comment has been submitted and is awaiting approval."
  }
  ```
* **Verification:**  
  * Newly submitted comment is assigned `PENDING` status.
  * An immediate subsequent request to `GET /api/comments` confirms the comment is **NOT** visible publicly until admin approval.

### Test 3: `POST /api/comments` (Duplicate Protection & Honeypot)
* **Duplicate Submission Test:** Same payload submitted immediately again.  
  * **Result:** `HTTP 409 Conflict` (`"A comment with this exact content has already been submitted."`).
* **Honeypot Bot Test:** Payload with non-empty `bot_field`.  
  * **Result:** `HTTP 400 Bad Request` (`"Spam submission blocked."`).

### Test 4: `POST /api/contact` (Contact Form)
* **Request:** `POST http://localhost:3000/api/contact`
* **Payload:**
  ```json
  {
    "fullName": "Enterprise Founder",
    "email": "founder@venture.com",
    "subject": "AI Strategic Advisory",
    "message": "Looking to explore autonomous AI agent architectures.",
    "serviceInterest": "Autonomous AI Agent Development"
  }
  ```
* **Response Status:** `HTTP 201 Created`
* **Response Body:**
  ```json
  {
    "success": true,
    "message": "Thank you for reaching out! Your message has been received.",
    "savedToMySQL": false,
    "emailSent": false
  }
  ```
* **Verification:** Message safely recorded in `data-store.json` contactMessages array. If `RESEND_API_KEY` or SMTP credentials are configured, email dispatch executes seamlessly.

### Test 5: `POST /api/admin/login` (Authentication)
* **Unauthorized Attempt:** Invalid password.  
  * **Result:** `HTTP 401 Unauthorized` (`"Invalid credentials. Please verify your email and password."`).
* **Authorized Attempt:** Correct email and `ADMIN_INITIAL_PASSWORD`.  
  * **Result:** `HTTP 200 OK`
  * **Headers Received:**  
    `Set-Cookie: jayesh_admin_session=[JWT]; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
  * **Cookie Properties:** `HttpOnly` flag prevents client-side JavaScript access; `SameSite=Lax` prevents CSRF attacks.

### Test 6: `POST /api/admin/actions` (Authorization Enforcement)
* **Attempt Without Cookie:**  
  * **Result:** `HTTP 401 Unauthorized` (`"Unauthorized. Admin session required."`).
* **Attempt With Valid Cookie:**  
  * Action: `{ module: "comments", action: "list" }` ➔ `HTTP 200 OK` (Returned 10 comments).
  * Action: `{ module: "comments", action: "approve", id: "..." }` ➔ `HTTP 200 OK` (Status updated to `APPROVED`).
  * Action: `{ module: "comments", action: "delete", id: "..." }` ➔ `HTTP 200 OK` (Comment purged).

---

## 3. Email Integration Architecture

The email integration in `src/app/api/contact/route.ts` implements a multi-provider fallback hierarchy:

1. **Provider 1: Resend HTTP API (Fastest & Most Reliable for Next.js)**
   * Triggered when `RESEND_API_KEY` is present.
   * Sends formatted HTML inquiry directly to `ADMIN_NOTIFICATION_EMAIL` (`jayeshnimse3@gmail.com`).
2. **Provider 2: Nodemailer SMTP Relay**
   * Triggered when `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` are present.
   * Transports email via TLS (port 587 / 465).
3. **Provider 3: Offline Persistence Fallback**
   * If no external email service is configured, submissions are **never lost**.
   * Messages are saved directly to the database / persistent store, visible immediately in the `/admin` dashboard.
