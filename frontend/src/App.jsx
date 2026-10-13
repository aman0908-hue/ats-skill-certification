import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import CoursesPage from './pages/public/CoursesPage';
import CourseDetailPage from './pages/public/CourseDetailPage';
import VerificationPage from './pages/public/VerificationPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import QuizArenaPage from './pages/student/QuizArenaPage';
import QuizResultPage from './pages/student/QuizResultPage';
import MyCertificatesPage from './pages/student/MyCertificatesPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminCoursesPage from './pages/admin/AdminCoursesPage';
import AdminQuestionsPage from './pages/admin/AdminQuestionsPage';
import AdminCertificatesPage from './pages/admin/AdminCertificatesPage';
import AdminTemplateStudioPage from './pages/admin/AdminTemplateStudioPage';

// Layout wrapper to hide Navbar and Footer during full-screen exams
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isExamRoute = location.pathname.startsWith('/quiz/');

  return (
    <div className="flex flex-col min-h-screen">
      {!isExamRoute && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isExamRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:idOrSlug"
              element={
                <ProtectedRoute>
                  <CourseDetailPage />
                </ProtectedRoute>
              }
            />
            <Route path="/verify" element={<VerificationPage />} />
            <Route path="/verify/:token" element={<VerificationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Student Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:courseId"
              element={
                <ProtectedRoute>
                  <QuizArenaPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/result/:attemptId"
              element={
                <ProtectedRoute>
                  <QuizResultPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-certificates"
              element={
                <ProtectedRoute>
                  <MyCertificatesPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/courses"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminCoursesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/questions"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminQuestionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/certificates"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminCertificatesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/template"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminTemplateStudioPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
