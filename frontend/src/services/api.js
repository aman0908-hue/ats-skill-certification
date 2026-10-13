import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ats_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for automatic 401 handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('ats_refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
          if (res.data?.data?.token) {
            localStorage.setItem('ats_token', res.data.data.token);
            originalRequest.headers.Authorization = `Bearer ${res.data.data.token}`;
            return api(originalRequest);
          }
        } catch {
          localStorage.removeItem('ats_token');
          localStorage.removeItem('ats_refresh_token');
          localStorage.removeItem('ats_user');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

export const coursesApi = {
  getAll: (category) => api.get('/courses', { params: { category: category !== 'ALL' ? category : undefined } }),
  getByIdOrSlug: (idOrSlug) => api.get(`/courses/${idOrSlug}`),
  checkEligibility: (courseId) => api.get(`/courses/${courseId}/eligibility`),
};

export const quizApi = {
  startAttempt: (courseId) => api.post(`/courses/${courseId}/attempts`),
  getAttempt: (attemptId) => api.get(`/attempts/${attemptId}`),
  submitAttempt: (attemptId, answers) => api.post(`/attempts/${attemptId}/submit`, { answers }),
  getResult: (attemptId) => api.get(`/attempts/${attemptId}/result`),
};

export const certificatesApi = {
  getMyCertificates: () => api.get('/certificates/my'),
  getById: (id) => api.get(`/certificates/${id}`),
  downloadPdf: (id) => api.get(`/certificates/${id}/download`, { responseType: 'blob' }),
  verifyPublic: (token) => api.get(`/public/certificates/verify/${token}`),
};

export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  getCourses: (page = 0, size = 20) => api.get('/admin/courses', { params: { page, size } }),
  createCourse: (data) => api.post('/admin/courses', data),
  updateCourse: (id, data) => api.put(`/admin/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/admin/courses/${id}`),
  getCourseQuestions: (courseId) => api.get(`/admin/courses/${courseId}/questions`),
  createQuestion: (courseId, data) => api.post(`/admin/courses/${courseId}/questions`, data),
  updateQuestion: (id, data) => api.put(`/admin/questions/${id}`, data),
  deleteQuestion: (id) => api.delete(`/admin/questions/${id}`),
  getStudents: (page = 0, size = 20) => api.get('/admin/students', { params: { page, size } }),
  getAttempts: (page = 0, size = 20) => api.get('/admin/attempts', { params: { page, size } }),
  getCertificates: (search = '', page = 0, size = 20) => api.get('/admin/certificates', { params: { search, page, size } }),
  revokeCertificate: (id, reason) => api.post(`/admin/certificates/${id}/revoke`, { reason }),
  getActiveTemplate: () => api.get('/admin/certificate-templates/active'),
  updateActiveTemplate: (data) => api.put('/admin/certificate-templates/active', data),
  bulkCreateQuestions: (courseId, requests) => api.post(`/admin/courses/${courseId}/questions/bulk`, requests),
  uploadCertificateTemplate: (formData) => api.post('/admin/certificate-templates/upload-background', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  previewTemplate: (data) => api.post('/admin/certificate-templates/preview', data, { responseType: 'blob' }),
};

export default api;
