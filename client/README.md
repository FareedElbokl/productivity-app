Productivity Application

## Project Description

This is a full-stack productivity application built using PostgreSQL, Express.js, React and Node.js. The application allows users to add, delete, and manage tasks with a customizable timer feature for productivity. It includes secure authentication using JSON Web Tokens (JWT).

## Features

- User authentication with JWT
- Add, delete, and manage tasks
- Timer functionality to enhance productivity
- Secure API endpoints
- View history of study sessions

## Technologies Used

- PostgreSQL: Database
- Express.js: Backend framework
- React: Frontend library
- Node.js: Backend runtime environment
- JSON Web Tokens (JWT): Authentication

## Installation

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- PostgreSQL
- Git

### Clone the Repository

```bash
git clone https://github.com/yourusername/pern-todo-app.git
cd pern-todo-app
Setup the Server
Navigate to the server directory:

bash
cd server
Install server dependencies:

bash
npm install
Create a .env file in the server directory with the following content:

env
PORT=5000
PGUSER=your_postgres_user
PGHOST=localhost
PGDATABASE=your_database_name
PGPASSWORD=your_postgres_password
PGPORT=5432
JWTSECRET=your_jwt_secret
Create the PostgreSQL database and tables:

sql
CREATE DATABASE your_database_name;
\c your_database_name;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  task_name VARCHAR(255) NOT NULL,
  task_id SERIAL
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  session_date DATE NOT NULL,
  duration_minutes INTEGER NOT NULL
);
Start the server:

bash
npm start
Setup the Client
Navigate to the client directory:

bash
cd ../client
Install client dependencies:

bash
npm install
Start the client:

bash

npm start
Usage
Open your browser and navigate to http://localhost:3000.
Register a new account or log in with an existing account.
Add, delete, and manage your tasks.
Use the timer feature to enhance productivity.
View your history of study sessions.



```
