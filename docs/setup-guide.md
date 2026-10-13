# ATS Skill Certification — Setup & Deployment Guide

## 1. Quick Overview

**ATS Skill Certification** is an online skill examination and digital certification platform developed for **AmanTech Solutions**.

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Axios, React Router.
- **Backend**: Java 21, Spring Boot 3.3.4, Spring Data MongoDB, Spring Security, JJWT (0.12.6), Google ZXing (QR codes), OpenHTMLtoPDF & Apache PDFBox.
- **Database**: MongoDB Atlas / Local MongoDB.

---

## 2. MongoDB Atlas Configuration

Your connection URI:
```
mongodb+srv://satyamydv8230_db_user:Aman9080@cluster0.eduh5gu.mongodb.net/ats_skill_certification?retryWrites=true&w=majority&appName=Cluster0
```

### Important Network Access Step in MongoDB Atlas:
If you see the error:
`MongoServerSelectionError: ... Please ensure that your Network Access List allows connections from your IP`

Follow these 3 quick steps in your MongoDB Atlas Dashboard:
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and select your cluster (`Cluster0`).
2. In the left sidebar, click **Security > Network Access**.
3. Click **Add IP Address** and choose **"Allow Access From Anywhere" (`0.0.0.0/0`)** (or click **"Add Current IP Address"**). Click **Confirm**.

*Note: While working offline or locally, the application automatically runs with your local MongoDB on `mongodb://localhost:27017/ats_skill_certification`.*

---

## 3. How to Run Locally

### Start Spring Boot Backend:
```bash
cd backend
mvn spring-boot:run
```
The backend starts at `http://localhost:8080`.

### Start React Frontend:
```bash
cd frontend
npm install
npm run dev
```
The frontend starts at `http://localhost:5173`.

---

## 4. Default Login Credentials

### Administrator Credentials:
- **Email**: `admin@atsskill.com`
- **Password**: `Admin@ATS2026`
- **Role**: `ADMIN`
- *Tip: On the `/login` page, you can click **"Fill & Login as Admin"** for 1-click login.*

### Student Registration:
- Students can register on the `/register` page with their full legal name.
- Upon passing any exam with $\ge 60\%$, their verifiable digital certificate is generated automatically.

---

## 5. Curated Course Tracks (Without MCA)

1. **B.Tech**: Core Computer Science & Algorithms
2. **BCA**: Modern Web Architecture & JavaScript
3. **BBA**: Business Analytics & Management Foundations
4. **B.Com**: Financial Accounting & Corporate Compliance
5. **Computer Science & IT**: Cloud Infrastructure & Database Management

---

## 6. Certificate Verification URL

Every issued certificate features an authentic QR code linking to:
```
http://localhost:5173/verify/{certificateNumber}
```
Scanning the QR code or visiting this link validates the student name, score, issue date, and authentic `VALID` badge. Revoked certificates immediately display an `INVALID / REVOKED` warning.
