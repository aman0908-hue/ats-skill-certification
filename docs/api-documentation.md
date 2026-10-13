# ATS Skill Certification — REST API Documentation

All endpoints are versioned under `/api/v1`.

## 1. Authentication Endpoints

### `POST /api/v1/auth/register`
Registers a student account.
- **Request Body**:
  ```json
  {
    "fullName": "Aman Kumar Yadav",
    "email": "student@example.com",
    "password": "Password@123",
    "confirmPassword": "Password@123"
  }
  ```
- **Response**: JWT access token, refresh token, and user profile.

### `POST /api/v1/auth/login`
Authenticates a user (Student or Admin).
- **Request Body**:
  ```json
  {
    "email": "admin@atsskill.com",
    "password": "Admin@ATS2026"
  }
  ```

### `GET /api/v1/auth/me`
Retrieves currently authenticated user profile. (Requires `Authorization: Bearer <token>`).

---

## 2. Course Catalog Endpoints

### `GET /api/v1/courses`
Lists all published courses.
- **Query Params**: `category` (optional, e.g. `B.Tech`, `BCA`, `BBA`, `B.Com`).

### `GET /api/v1/courses/{idOrSlug}`
Fetches course details by MongoDB ID or slug.

### `GET /api/v1/courses/{courseId}/eligibility`
Checks if authenticated student is eligible to start the quiz.

---

## 3. Quiz & Examination Engine

### `POST /api/v1/courses/{courseId}/attempts`
Starts an examination session under a server deadline. Returns randomized MCQs without correct answers.

### `GET /api/v1/attempts/{attemptId}`
Retrieves existing attempt state.

### `POST /api/v1/attempts/{attemptId}/submit`
Submits student answers, executes server-side grading, evaluates pass/fail status, and auto-issues a digital certificate if passed.
- **Request Body**:
  ```json
  {
    "answers": {
      "questionId_1": ["opt1"],
      "questionId_2": ["opt3"]
    }
  }
  ```

### `GET /api/v1/attempts/{attemptId}/result`
Fetches exam result summary and certificate reference.

---

## 4. Certificates & Verification

### `GET /api/v1/certificates/my`
Retrieves all certificates earned by the authenticated student.

### `GET /api/v1/certificates/{id}/download`
Downloads the official certificate as a binary PDF file (`application/pdf`).

### `GET /api/v1/public/certificates/verify/{token}`
**Public endpoint**: Validates certificate authenticity via verification token or certificate number without exposing private emails or internal database identifiers.

---

## 5. Admin Portal Endpoints (`ROLE_ADMIN` Required)

- `GET /api/v1/admin/dashboard`: Aggregate platform statistics (students, courses, attempts, pass rate).
- `GET /api/v1/admin/courses`: Paginated courses list.
- `POST /api/v1/admin/courses`: Create course.
- `PUT /api/v1/admin/courses/{id}`: Update course.
- `DELETE /api/v1/admin/courses/{id}`: Delete course.
- `GET /api/v1/admin/courses/{courseId}/questions`: List MCQs with correct answers & explanations.
- `POST /api/v1/admin/courses/{courseId}/questions`: Add question to course.
- `PUT /api/v1/admin/questions/{id}`: Update question.
- `DELETE /api/v1/admin/questions/{id}`: Delete question.
- `GET /api/v1/admin/certificates`: Search and review all issued certificates.
- `POST /api/v1/admin/certificates/{id}/revoke`: Revoke certificate with mandatory audit reason.
- `GET /api/v1/admin/certificate-templates/active`: Get active certificate template coordinates.
- `PUT /api/v1/admin/certificate-templates/active`: Update coordinate placement.
- `POST /api/v1/admin/certificate-templates/preview`: Generate instant PDF preview with sample data.
