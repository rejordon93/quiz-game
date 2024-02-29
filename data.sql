DROP DATABASE IF EXISTS quiz_game;

CREATE DATABASE quiz_game;

\c quiz_game;


DROP TABLE IF EXISTS quizzes;

DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,   
    username text NOT NULL UNIQUE,
    email text NOT NULL, 
    password text NOT NULL
);

CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    category text NOT NULL,
    score INT NOT NULL,
    user_id INT REFERENCES users(id)
);