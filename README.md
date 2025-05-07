# 🚀 Final INTPROG Project

A feature-rich Angular application designed for internal employee and department management. This project includes user authentication, role-based access, request handling, and workflow management — all built with a responsive Bootstrap UI and supported by a simulated backend for development.

---

## 🌟 Frontend Features

### 🔐 User Authentication  
- Email-based sign-up with verification  
- Secure login/logout  
- Profile management  

### 🛡️ Role-Based Access Control  
- Admin users have extended permissions  
- Manage employees and departments based on roles  

### 👥 Employee Management  
- View, add, edit, transfer, and delete employee records  
- Assign users to departments  

### 🏢 Department Management  
- Dynamically create and update departments  
- Managed via a centralized settings module  

### 🔄 Workflow Management  
- Define and monitor transactional workflows  
- Examples: onboarding, department transfers  

### 📝 Request Management  
- Employees can submit requests with multiple items (equipment, leave, etc.)  
- Admins can review and manage submitted requests  

### 💻 Responsive UI  
- Built with Bootstrap  
- Mobile-friendly layout  
- Form validation and real-time error feedback  

### 🔧 Fake Backend Integration  
- Simulates real API responses  
- Allows development without a real backend  

---

## 🧪 Testing Instructions

### 🔙 Backend Testing

**API Testing using Postman**  
```http
POST http://localhost:4000/accounts/register
```
Run Unit Tests

```bash
npm test
```
Ensure package.json is properly configured for testing

🎨 Frontend Testing
✅ Using Fake Backend
Ensure FakeBackendInterceptor is enabled in app.module.ts

Run the development server:

```bash
ng serve
```
🔄 Using Real Backend
Remove FakeBackendInterceptor from app.module.ts

Update environment.apiUrl with your actual backend URL

Run the development server:

```bash
ng serve
```
🧪 Run Frontend Unit Tests
```bash
ng test
```
📂 Project Structure Overview
```bash
src/
├── app/
│   ├── auth/           # Authentication and user-related features
│   ├── admin/          # Admin-only modules: employee & department management
│   ├── shared/         # Reusable components, models, services
│   └── interceptors/   # Auth & fake backend interceptors
```
📸 Screenshots
Replace the square brackets below with actual screenshots.

Login Page: [login-page-screenshot]

Dashboard: [dashboard-screenshot]

Employee Management: [employee-management-screenshot]

Request Form: [request-form-screenshot]

📌 Notes
Intended for educational use and may use simplified security/auth flows

Swap the fake backend for a real API for production use

🛠 Tech Stack
Frontend: Angular 10+, TypeScript, Bootstrap

Testing: Jasmine, Karma, Postman

Backend: Simulated in-app interceptor service

📬 Contact
Feel free to open an issue or submit a pull request for questions, improvements, or contributions.
Thanks for checking it out! 🎉


