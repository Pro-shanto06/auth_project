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

To run it locally on your machine, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Pro-shanto06/auth_project
    cd auth_project
    ```

2. **Install Server Dependencies:**
    ```bash
    npm install
    ```

3. **Create Environment Variables File:**
    Create a `.env` file in the server directory and add the following environment variables:
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/auth_project
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the Server:**
    ```bash
    node server.js
    ```

## API Endpoints

### 1. **User Registration**

- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "Password123!"
    }
    ```
- **Responses:**
    - **Success (201 Created):**
        ```json
        {
            "message": "User registered successfully."
        }
        ```
    - **Error (400 Bad Request):**
        ```json
        {
            "errors": [
                "Username is required",
                "Email is required",
                "Password is required",
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
            ]
        }
        ```

### 2. **User Login**

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "email": "testuser@example.com",
        "password": "Password123!"
    }
    ```
- **Responses:**
    - **Success (200 OK):**
        ```json
        {
            "message": "Login successful.",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhZmE0ZDI1MDU1ZGJhOGFhYmUyMTM4In0sImlhdCI6MTcyMjc4ODQ5NywiZXhwIjoxNzIyNzkyMDk3fQ.SSEh6UMMRoeTRHTo6U3xwn0INgznFGeu3Qu70MsspXQ"
        }
        ```
    - **Error (401 Unauthorized):**
        ```json
        {
            "errorMessage": "Invalid credentials"
        }
        ```

### 3. **Profile Page**

- **Endpoint:** `/auth/profile`
- **Method:** `GET`
- **Headers:**
    ```json
    {
        "Cookie": "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhZmE0ZDI1MDU1ZGJhOGFhYmUyMTM4In0sImlhdCI6MTcyMjc4ODQ5NywiZXhwIjoxNzIyNzkyMDk3fQ.SSEh6UMMRoeTRHTo6U3xwn0INgznFGeu3Qu70MsspXQ"
    }
    ```
- **Responses:**
    - **Success (200 OK):**
        ```json
        {
            "user": {
                "_id": "66af952b7c9cbc8eeccadf1a",
                "username": "testuser",
                "email": "testuser@example.com"
            }
        }
        ```
    - **Error (401 Unauthorized):**
        ```json
        {
            "message": "Unauthorized access. Please login."
        }
        ```

### 4. **Logout**

- **Endpoint:** `/auth/logout`
- **Method:** `GET`
- **Responses:**
    - **Success (200 OK):**
        ```json
        {
            "message": "You have been logged out successfully."
        }
        ```
    - **Error (500 Internal Server Error):**
        ```json
        {
            "message": "Server error. Please try again later."
        }
        ```

## Error Handling

All errors are handled and displayed with appropriate messages based on the situation, including validation errors and server errors.
