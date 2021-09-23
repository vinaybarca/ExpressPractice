const express = require('express'); //Line 1
const app = express(); //Line 2
const bodyParser = require('body-parser')
const db = require('./postgresData')
const port = 5000;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// create a GET route

/*
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR  BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11



app.get('/menu', (req, res) => {
    const {context} = req;
    let results = [];
    
        results = recipes
   
    res.send({express: recipes
    });
    
})**/

app.get('/users',db.getUsers); 
app.get('/users/:id', db.getUserById); 
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);