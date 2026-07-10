# Student Management System

A full stack CRUD application built with the MERN stack (MongoDB, Express, React, Node.js) for managing student records. Built as a learning project covering core full stack development concepts, from REST API design to React state management.

## Features

- Create, read, update, and delete student records
- Client-side and server-side form validation
- Search students by name, email, or course
- Sort students by any column (ascending/descending)
- Loading and error states throughout the UI
- Delete confirmation prompts
- Clean, responsive UI built with CSS Modules

## Tech Stack

**Frontend**

- React 18 (functional components + hooks)
- React Router v6
- Axios
- CSS Modules
- Vite

**Backend**

- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv, cors

## Project Structure

student-management-system/
├── backend/
│ ├── config/ # Database connection setup
│ ├── controllers/ # Route handler logic
│ ├── middleware/ # Custom Express middleware (error handling)
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express route definitions
│ ├── utils/ # Helper functions (asyncHandler)
│ └── server.js # App entry point
│
├── frontend/
│ └── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route-level page components
│ ├── services/ # Axios API call functions
│ ├── hooks/ # Custom React hooks
│ ├── utils/ # Frontend helper functions
│ ├── App.jsx
│ └── main.jsx

## API Endpoints

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/students`     | Get all students     |
| GET    | `/api/students/:id` | Get a single student |
| POST   | `/api/students`     | Create a new student |
| PUT    | `/api/students/:id` | Update a student     |
| DELETE | `/api/students/:id` | Delete a student     |

### Student Schema

| Field  | Type   | Validation                           |
| ------ | ------ | ------------------------------------ |
| name   | String | Required                             |
| email  | String | Required, unique, valid email format |
| course | String | Required                             |
| age    | Number | Required, must be positive           |
| city   | String | Required                             |

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- A MongoDB database (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd student-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Run the backend server:

```bash
npm run dev
```

The API will run on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

VITE_API_BASE_URL=http://localhost:5000/api

Run the frontend dev server:

```bash
npm run dev
```

The app will run on `http://localhost:5173`.

### 4. Open the app

Visit `http://localhost:5173` in your browser. Make sure both the backend and frontend servers are running simultaneously.

## Testing the API

A Postman collection can be used to test all endpoints directly. Example request body for creating a student:

```json
{
  "name": "Aditi Sharma",
  "email": "aditi@example.com",
  "course": "Computer Science",
  "age": 21,
  "city": "Mumbai"
}
```

## Future Improvements

- Server-side pagination for large datasets
- User authentication and role-based access
- Automated testing (Jest + Supertest for backend, React Testing Library for frontend)
- Deployment (backend on Render/Railway, frontend on Vercel/Netlify)

## Author

Built by Sayan Chatterjee as a full stack development learning project.
