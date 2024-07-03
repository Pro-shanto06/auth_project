# Node.js Authentication Project

This project is a Node.js application for user authentication using Express, MongoDB, and JWT (JSON Web Tokens).

## Features

- User registration with validation
- User login with JWT authentication
- Profile page accessible only with a valid JWT token
- Logout functionality
- Error handling and validation messages

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (JSON Web Tokens)
- bcryptjs for password hashing
- EJS for server-side rendering


## Installation

To run the Pizza Town Pizza Restaurant locally on your machine, follow these steps:
1. **Clone the repository:**
  ```bash
  git clone https://github.com/Pro-shanto06/auth_project
   ```
2. **Install Server Dependencies**:

```bash
npm install
```

3. **Create Environment Variables File**:
Create a `.env` file in the server directory and add the following environment variables:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/auth_project
JWT_SECRET=your_jwt_secret

4. **Start the Server**:
```bash
node server.js
```
