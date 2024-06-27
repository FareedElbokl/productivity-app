CREATE DATABASE studytool;

--users table
CREATE TABLE Users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--study sessions table
CREATE TABLE Sessions (
    session_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    session_date TIMESTAMP NOT NULL,
    duration_minutes INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--todo tasks table
CREATE TABLE Todos (
    todo_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    task VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


