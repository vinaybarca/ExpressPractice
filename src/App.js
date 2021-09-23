import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, NavItem } from 'react-bootstrap';



var events = require('events');
var eventEmitter = new events.EventEmitter();


var temp2 = '';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isActive: false,
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


    /*
     this.callBackendAPI()
      .then(res => 
        this.setState({ data: res.express })
        
      )
      .catch(err => console.log(err));
      **/

    this.callAPI()
      .then((res2) => {
        if(res2.length == 0){
              res2.push({"firstname":'Database Empty, create a user',
              "lastname":' ',
              "username":' ',
              "email":' '})
              var emailHolder = [];
        res2.map((emails) => {
          emailHolder.push(emails.email)
        })
        this.setState({ users: res2, data: emailHolder })
        } else{
          var emailHolder = [];
          res2.map((emails) => {
            emailHolder.push(emails.email)
          })
          this.setState({ users: res2, data: emailHolder })
        }
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
        if(res2.length == 0){
          res2.push({'firstname':'Database Empty, create a user',
          'lastname':' ',
          'username':' ',
          'email':' '})
          var emailHolder = [];
    res2.map((emails) => {
      emailHolder.push(emails.email)
    })
    this.setState({ users: res2, data: emailHolder })
    } else{
      if (this.state.change == true) {
        var emailHolder = [];
        res2.map((emails) => {
          emailHolder.push(emails.email)
        })
        this.setState({ users: res2, data: emailHolder })
      } 
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

    if (type == 'firstname') {
      this.setState({ firstname: event.target.value });

    } else if (type == 'lastname') {
      this.setState({ lastname: event.target.value });
    }
    else if (type === 'username') {
      this.setState({ username: event.target.value });
    }
    else if (type === 'email') {
      this.setState({ email: event.target.value });
    }
    else if (typeof type == 'number') {

      var update = [...this.state.users];

      var item = { ...update[type] };

      item.email = event.target.value;
      update[type].email = item.email;

      this.setState({ users: update, change: false })

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
    const config = {
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

  handleDelete = (event) => {

    this.deleteUser(event).then(() => {
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


  handleUpdate = (event, index) => {

    let uparr = { ...this.state.users }
    this.updateUser(uparr, index).then(() => {

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


    } catch (e) {
      return e;
    }
  }


  //<p className="App-intro">{this.state.data.map(data => <div>{data.id + ':' + data.name}</div>)}
  //</p>

  setIsActive = (active) => {
    this.setState({ isActive: active })
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">User database </h1>

        </header>
        <div className="creategrid">
          <div className="newUser">
            <form onSubmit={this.handleSubmit}>
              <label>Add new account </label>
              <label>
                First Name:
                <textarea value={this.state.firstname} onChange={(value, type) => this.handleChange(value, 'firstname')} />
              </label>
              <label>
                Last Name:
                <textarea value={this.state.lastname} onChange={(value, type) => this.handleChange(value, 'lastname')} />
              </label>
              <label>
                Username:
                <textarea value={this.state.username} onChange={(value, type) => this.handleChange(value, 'username')} />
              </label>
              <label>
                email:
                <textarea value={this.state.email} onChange={(value, type) => this.handleChange(value, 'email')} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div className="infogrid">

            {
              this.state.users.map((item, i) =>


                <div className="App-database">
                  <div className="App-database-item">
                    <div className="database-title">
                      <div className="App-database-content">
                        <h1 className="App-menu-header"> {item.firstname} {item.lastname} </h1>
                        
                       
                        {this.state.users[0].lastname !== ' ' && 
                        
                        <div className="App-database-update">
                          <li  >
                          Username = {item.username} </li>
                        <li>Email = {this.state.data[this.state.users.indexOf(item)]}</li>
                        <form onSubmit={(event, index) => this.handleUpdate(event, this.state.users.indexOf(item))}>

                          <label> Update Email for a  User</label>
                          <textarea
                            placeholder={item.email}
                            value={this.state.users[this.state.users.indexOf(item)].email}
                            onChange={(value, type) => this.handleChange(value, this.state.users.indexOf(item))}
                          />

                          <input type="submit" value="Submit" />
                        </form>
                        <button onClick={(value) => this.handleDelete(item.id)}>Delete user</button>

                      </div>
                        
                        }
                      
                      
                      </div>
                    </div>


                  </div>
                </div>
              )
            }
          </div>

        </div>
      </div>
    );
  }
}

export default App;