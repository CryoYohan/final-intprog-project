# final-intprog-project
Frontend Features
User Authentication: Email sign-up with verification, login/logout, and profile management.
Role-Based Access: Admin users have access to additional features (e.g., employee management, department management).
Employee Management: View, add, edit, transfer, and delete employees with user and department assignments.
Department Management: Manage dynamic departments as a settings module.
Workflow Management: Create and manage transactional workflows (e.g., onboarding, department changes).
Request Management: Create and manage employee requests with multiple items (e.g., equipment, leave).
Responsive UI: Bootstrap-based tables and forms with validation and error handling.
Fake Backend: Simulates API responses for development without a real backend.

Testing Instructions
Backend
Use Postman to test API endpoints (e.g., POST http://localhost:4000/accounts/register).
Run unit tests: npm test (requires test setup in package.json).
Frontend
Test with fake backend: Ensure FakeBackendInterceptor is in app.module.ts and run ng serve.
Test with real backend: Remove FakeBackendInterceptor, update environment.apiUrl, and run ng serve.
Run unit tests: ng test.
