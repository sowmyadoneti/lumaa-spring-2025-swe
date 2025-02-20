#  Task Management App

A full-stack **Task Management Application** built with:
- **Backend**: Node.js + Express + PostgreSQL
- **Frontend**: React + TypeScript
- **Authentication**: JWT (JSON Web Token)
- **Security**: Bcrypt password hashing

 **Live Demo Video**:  

---

## ** Features**
 User Registration & Login (JWT Authentication)  
 Create, Read, Update, Delete (CRUD) Tasks  
 Secure API Routes (Only logged-in users can access)  
 PostgreSQL Database with Migrations  

---

## ** Steps for Running the Application**

### **1️ Database (PostgreSQL)**
- **Install PostgreSQL** on your local machine 


    ```

- **Create the Database & Tables**
  - Open **PostgreSQL CLI (`psql`)**:
    ```sh
    psql -U postgres
    ```
  - Run the following SQL commands:
    ```sql
    -- Create database
    CREATE DATABASE task_management;

    -- Switch to task_management database
    \c task_management;

    -- Create users table
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    -- Create tasks table
    CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        is_complete BOOLEAN DEFAULT FALSE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    );
    ```

---

## **2️ Backend Setup (Node.js + Express)**
### ** Navigate to the Backend Directory**
```sh
cd backend

   ```
   - **Installation of the dependencies :**
   ```
   npm install

   ```
   - **Create .env file using the following :**
   ```
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/task_management
   JWT_SECRET=your_jwt_secret_key

   ```
- **Create a config.js file to read environment variables :**
   ```
   require('dotenv').config();

   module.exports = {
       port: process.env.PORT || 5000,
       dbUrl: process.env.DATABASE_URL,
       jwtSecret: process.env.JWT_SECRET
   };
   ```
   - **Run the server :**
   ```
   npm run dev
   ```
   - **Backend runs on http://localhost:5000**
      ```
## **3 Frontend (React + Typescript)**
### **Navigate to the frontend directory using the following command :**
```sh
cd /frontend

   ```
   - **Installation of the dependencies :**
   ```
   npm install
   ```
   - **Create .env file using the following :**
   ```
  REACT_APP_API_URL=http://localhost:5000
   ```
   - **Starting the server :**
   ```
   npm start
   ```
   - **Frontend runs on http://localhost:3000**
  
**Salary Expectation :**
**$20/hr**
   
