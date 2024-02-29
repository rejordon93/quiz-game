
# Description

Quizz app is a simple traditional trivia game that features playing in different categories, online playing competitions with friends and tracking highest scores in played catagories.

The app includes user authentication to access all the features. 

Challenges anticipated with this project include data privacy, accuracy of story generation, adapting the AI responses to varied user inputs, and efficiently handling real-time interactions.


# Connection to the DB

Config data is handled through an .env file

create a .env file in the top level directory with the following data

SECRET_KEY="yoursecretkeyhere"
DATABASE_URL=postgres://<database_user>:<database_password>@127.0.0.1:5432/quiz_game
TEST_DATABASE_URL=postgres://y<database_user>:<database_password>@127.0.0.1:5432/quiz_game_test

to set up the database run the <data.sql> in postgres 

# API key for quiz data

For now it is hardcoded

# starting the APP

The application has two parts, the front-end and the back-end

To start the back-end:

1. Ensure correct .env setup
2. Yarn or NPM install in the HOME directory
3. Run Yarn or NPM start in the HOME directory

To start the front-end

1. CD into FRONTEND directory
2. Yarn or NPM install in the FRONTEND directory
3. Run Yarn or NPM start in the FRONTEND directory

