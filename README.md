Training Center Management System
A full stack web app to manage a training center (students, instructors, courses, and enrollments).
Built with:
Backend: ASP.NET Core Web API + Entity Framework Core + PostgreSQL
Frontend: Angular (Standalone Components)
Auth: JWT
What it does
Manage Students, Instructors, and Courses (add, edit, delete, search, filter)
Enroll students in courses (with checks: no duplicate enrollment, no enrolling in a full course)
Register / Login with JWT authentication
Public users can view data, but only logged in users can create/edit/delete
How to run it
1. Backend (TrainingCenter.Api)
You need:
.NET 10 SDK
PostgreSQL installed and running
Steps:
Go to the TrainingCenter.Api folder
Copy appsettings-example.json and rename the copy to appsettings.json
Open appsettings.json and put your own PostgreSQL connection info and a JWT key (any random long string works, at least 32 characters)
Run the migrations to create the database:
Code
Run the API:
Code
The API should run on http://localhost:5000 (check the terminal output to confirm the port).
2. Frontend (training-center-client)
You need:
Node.js installed
Steps:
Go to the training-center-client folder
Install packages:
Code
Run the app:
Code
Open the browser on http://localhost:4200
Notes
appsettings.json is not included in this repo for security reasons (it has the real database password and JWT key). Use appsettings-example.json as a template.
A simple QA report with some Postman test screenshots is included in QA-report.pdf.