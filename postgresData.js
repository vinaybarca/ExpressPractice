const Pool = require('pg').Pool
const pool = new Pool({
  user: 'newuser',
  host: 'localhost',
  database: 'tester',
  password: '1234',
  port: 5432,
})


  module.exports = {
    getUsers : function (request, response) {
      
      pool.query('SELECT * FROM users ORDER BY id DESC', (error, results) => {
        if (error) {
         
          throw error
        }
        let allProducts = [];
            results.rows.map(r => {
                allProducts.push(r);
                
            })
          
            response.status(200).send(allProducts);
        
      })
    },
  
     createUser : function (request, response)  {
      const { firstname,lastname,username, email } = request.body
      
      pool.query('INSERT INTO users (firstname,lastname,username, email) VALUES ($1, $2, $3, $4)', 
      [firstname,lastname,username, email], (error, results) => {
        if (error) {
          throw error
        }
        this.getUsers
      })
    },
  
     updateUser : function (request, response)  {
      const id =request.params.id
      const { email } = request.body
     
      pool.query(
        'UPDATE users SET email = $1 WHERE id='+id,
        [email],
        (error, results) => {
          if (error) {
            throw error
          }
          
          response.status(200).send(`ID: ${id}`)

         
        }
      )
    },
  
     deleteUser : function (request, response)  {
      
      
      const id = request.params.id

      pool.query('DELETE FROM users WHERE id =' + id,  (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`deleted ID: ${id}`)
      })

      
    },
    
  }