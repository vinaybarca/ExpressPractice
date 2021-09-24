Steps to start


1. Open Terminal in the root folder
2. npm install
3. Postgres setup 
-- Commands for psql terminal
    In the same terminal as the root 
    -psql postgres  --(I had to use 'psql postgres postres' so I could use the superuser commands)
    -create new roll -> CREATE ROLE newuser WITH LOGIN PASSWORD '1234';
    - ALTER ROLE test CREATEDB;
    - \q
    - psql -d postgres -U newuser;
    - CREATE DATABASE tester;
    - \c tester
    - CREATE TABLE users (ID SERIAL PRIMARY KEY, firstname VARCHAR(30), lastname VARCHAR(30), username VARCHAR(30) , email VARCHAR(30)); --(in this order for it to work with the queries)
4. start server in package terminal "node server.js"
5. in a new terminal start the application - "npm start"
6. The server should run on the terminal and should log the port number
7. The application should be running on localhost:3000



The files I worked on are 
-App.js
-App.css
-postgresData.js
-server.js 
-package.json

The whole public folder was added by default when I created 
the react project along with 
-index.js
-App.test.js
-logo.svg
-setUptests.js
-reportWebVitals.js
