Steps to start
1. npm install
2. if you don't have "pg" installed -> npm install pg
3. Postgres setup 
-- Commands for psql terminal
    -create new roll -> CREATE ROLE newuser WITH LOGIN PASSWORD '1234';
    - ALTER ROLE test CREATEDB;
    - \q
    - psql -d postgres -U newuser
    - CREATE DATABASE tester
    - \c tester
    - CREATE TABLE users (ID SERIAL PRIMARY KEY, firstname VARCHAR(30), lastname VARCHAR(30), username VARCHAR(30) , email VARCHAR(30));
4. start server "node server.js"
5. in a new terminal start the application - "npm start"
