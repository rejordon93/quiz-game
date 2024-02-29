DROP DATABASE IF EXISTS quiz_game_test;

CREATE DATABASE quiz_game_test;

\c quiz_game_test;

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