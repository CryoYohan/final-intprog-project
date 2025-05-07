🚀 Final INTPROG Project
A feature-rich Angular application designed for internal employee and department management. This project includes user authentication, role-based access, request handling, and workflow management — all built with a responsive Bootstrap UI and supported by a simulated backend for development.

🌟 Frontend Features
🔐 User Authentication
Email-based sign-up with verification, secure login/logout, and profile management.

🛡️ Role-Based Access Control
Admin users have extended permissions for managing employees and departments.

👥 Employee Management
View, add, edit, transfer, and delete employee records. Assign users to departments seamlessly.

🏢 Department Management
Dynamically manage departments in a centralized settings module.

🔄 Workflow Management
Create and monitor transactional workflows (e.g., onboarding, department transfers).

📝 Request Management
Employees can create and manage requests involving multiple items (e.g., equipment, leave).

💻 Responsive UI
Mobile-friendly, Bootstrap-powered interface with client-side validation and real-time error handling.

🔧 Fake Backend Integration
A simulated API layer allows development and testing without a real backend.

🧪 Testing Instructions
🔙 Backend Testing
API Testing
Use Postman or similar tools:
POST http://localhost:4000/accounts/register

Run Unit Tests

bash
Copy
Edit
npm test
(Ensure test configuration is properly set in package.json)

🎨 Frontend Testing
✅ With Fake Backend
Ensure FakeBackendInterceptor is enabled in app.module.ts.

Run:

bash
Copy
Edit
ng serve
🔄 With Real Backend
Remove FakeBackendInterceptor from app.module.ts.

Update environment.apiUrl with your actual backend URL.

Run:

bash
Copy
Edit
ng serve
🧪 Run Frontend Unit Tests
bash
Copy
Edit
ng test
📂 Project Structure Highlights
src/app/auth: Authentication and user management

src/app/admin: Admin-exclusive modules (employee & department management)

src/app/shared: Reusable components, models, and services

src/app/interceptors: Backend simulation and auth interceptors

📸 Screenshots (optional)
Add some screenshots or screen recordings of key UI features here for visual context.

📌 Notes
This project is designed for learning purposes and may use simplified security models.

Swap out the fake backend with a real one when moving to production.

🛠 Tech Stack
Frontend: Angular 10+, TypeScript, Bootstrap

Testing: Jasmine, Karma, Postman

Backend (Simulated): In-app interceptor-based mock service

📬 Contact
For any questions or feedback, feel free to reach out via issues or pull requests.
