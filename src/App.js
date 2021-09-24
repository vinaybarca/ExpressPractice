import React, { Component, useState } from 'react';

import './App.css';




var events = require('events');
var eventEmitter = new events.EventEmitter();



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [], //will store emails to display current email before the user updates
      
      users: [],
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      updateindex: '',
      change: true,

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  componentDidMount() {
    this.callAPI()
      .then((res2) => {
        
        var emailHolder = [];
        res2.map((emails) => {
          emailHolder.push(emails.email)
        })
        this.setState({ users: res2, data: emailHolder })
      }
      )
      .catch(error => console.log(error));
  }

  componentDidUpdate() {
    this.callAPI()
      .then((res2) => {
          
          if (this.state.change == true) {
            var emailHolder = []; //stores the current email incase of change
            res2.map((emails) => {
              emailHolder.push(emails.email)
            })
            this.setState({ users: res2, data: emailHolder })
          }
        


      })
      .catch(error => console.log(error));
  }

  callAPI = async () => {
    const response2 = await fetch('/users');
    const body2 = await response2.json();
    if (response2.status !== 200) {

      throw Error(body2.message)
    }

    return body2;
  };

  handleChange(event, type) {
//handles change for email updates
//takes in the event along with the user index that is being changed
 if (typeof type == 'number') {

      var update = [...this.state.users];

      var item = { ...update[type] };

      item.email = event.target.value;
      update[type].email = item.email;
        
      this.setState({ users: update, change: false })
        //the change state variable makes sure that componentWillupdate does not change the user email till submit is called
    }

  }

  handleSubmit = (event) => {
    event.preventDefault();
    const firstname2 = this.state.firstname;
    const lastname2 = this.state.lastname;
    const username2 = this.state.username;
    const email2 = this.state.email;
    const newUser = {
      "firstname": firstname2,
      "lastname": lastname2,
      "username": username2,
      "email": email2
    };
    this.setState({

      firstname: '',
      lastname: '',
      email: '',
      username: '',
      change: true

    })
    this.createUser(newUser).then((res) => {

    }).catch(err => alert(err));


  }

  createUser = async (data) => {
    const config = {  //config for server to make correct function call
      "method": 'POST',
      "headers": {
        "host": 'localhost:5000',
        'user-agent': 'curl/7.55.1',
        "accept": '*/*',
        'content-length': '30',
        'content-type': 'application/x-www-form-urlencoded'
      },
      "body": 'firstname=' + data.firstname + '&lastname=' + data.lastname + '&username=' + data.username + '&email=' + data.email
    }
    try {
      const fetchResponse = await fetch(`/users`, config);
      const data = await fetchResponse.json();
      return data;
    }
    catch (e) {
    }
  }

  handleDelete = (event) => { //Takes in an id of user to make a call for user deletion

    this.deleteUser(event).then(async () => {
      this.setState({ change: true })
    }).catch(err => alert(err));


  }


  deleteUser = async (data) => {
    const del = '/users/' + data;

    const config = {
      "method": 'DELETE',
      "headers": {
        "host": 'localhost:5000',
        'user-agent': 'curl/7.55.1',
        "accept": '*/*'
      },

    }
    try {
      const fetchResponse = await fetch(del, config);
      const data = await fetchResponse.json();
      return data;
    } catch (e) {

    }
  }


  handleUpdate = (event, index) => { //handles update email calls

    let uparr = { ...this.state.users }
    this.updateUser(uparr, index).then(async () => {


      this.setState({
        change: true

      });
      

    }).catch(err => alert(err));


  }

  updateUser = async (data, index) => {

    const upD = '/users/' + data[index].id;


    const config = {
      "method": 'PUT',
      "headers": {
        "host": 'localhost:5000',
        'user-agent': 'curl/7.55.1',
        "accept": '*/*',
        'content-length': '24',
        'content-type': 'application/x-www-form-urlencoded'
      },
      "body": "email=" + data[index].email

    }
    try {

      const fetchResponse = await fetch(upD, config);
      const data2 = await fetchResponse.json();
          return data2;
    } catch (e) {
    }
  }








  render() {
    
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">User database </h1>

        </header>
        <div className="creategrid">
          <div className="newUser">
            <form>
              <h1>Add new account </h1>
              <label>
                First Name:
                <input value={this.state.firstname} onChange={(e) => this.setState({firstname: e.target.value})} />
              </label>
              <label>
                Last Name:
                <input value={this.state.lastname} onChange={(e) => this.setState({lastname: e.target.value})} />
              </label>
              <label>
                Username:
                <input value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
              </label>
              <label>
                email:
                <input value={this.state.email}  onChange={(e) => this.setState({email: e.target.value})} />
              </label>
              
              <button onClick={this.handleSubmit}>CREATE </button>

            </form>
          </div>


          
          {(this.state.users.length === 0 &&  
          <table>
    <thead>
        <tr>
            <th colspan="2">Empty Database</th>
        </tr>
    </thead>
    <tbody>
        <p className="paragraph">Create a new User to Populate database</p>
    </tbody>
</table> ) ||
          <table>
            
            <colgroup span="5" ></colgroup>

            <tr>
              <th >Name</th>
              <th  >Email</th>
              <th  >Username</th>
              <th  >Update Emails</th>
              <th  >Delete</th>

            </tr>

            {

              this.state.users.map((item, i) =>



                <tr>

                  <td>{item.firstname} {item.lastname}</td>
                  <td>{this.state.data[this.state.users.indexOf(item)]}</td>
                  <td>{item.username}</td>


                  <td >


                    <form >

                      <input
                        placeholder={item.email}
                        value={this.state.users[this.state.users.indexOf(item)].email}
                        onChange={(value, type) => this.handleChange(value, this.state.users.indexOf(item))}
                      />

                      <button onClick={(event, index) => this.handleUpdate(event, this.state.users.indexOf(item))}>UPDATE</button>

                    </form>
                  
                  </td>
                          
                  <td>
                    <button onClick={(value) => this.handleDelete(item.id)}>Delete user</button>
                  </td>
                </tr>






              )

            }
          </table>
  }

        </div>
      </div>
    );
  }
}

export default App;