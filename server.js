const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser')
const db = require('./postgresData')
const port = 5000;
const router = express.Router();
app.listen(port, () => console.log(` ${port}`)); 


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


//server calls that route to the database functions
app.get('/users',db.getUsers);  //route that lists all the users (http://localhost:5000/users to see the raw array of users) 
app.get('/users/:id', db.getUserById); 
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);