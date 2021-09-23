const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})


  module.exports = {
    getUsers : function (request, response) {
      
      pool.query('SELECT * FROM newusers ORDER BY id DESC', (error, results) => {
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
      console.log(request.body )
      const { firstname,lastname,username, email } = request.body
      
      pool.query('INSERT INTO newusers (firstname,lastname,username, email) VALUES ($1, $2, $3, $4)', 
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
     
      console.log(request.body)
      pool.query(
        'UPDATE newusers SET email = $1 WHERE id='+id,
        [email],
        (error, results) => {
          if (error) {
            throw error
          }
          
          response.status(200).send(`User modified with ID: ${id}`)

         
        }
      )
    },
  
     deleteUser : function (request, response)  {
      
      console.log(request.params.id)
      
      const id = request.params.id

      pool.query('DELETE FROM newusers WHERE id =' + id,  (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`User deleted with ID: ${id}`)
      })

      
    },
     getUserById : function (request, response)  {
      const id = parseInt(request.params.id)
        console.log(id);
      pool.query('SELECT * FROM newusers WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }
    
  }