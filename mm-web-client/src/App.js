import React, { Component } from 'react';
import './App.css';

const axios = require('axios').default;
const qs = require('qs');

axios.defaults.withCredentials = true;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(this.state),
      url: 'http://localhost:8080/v1/auth/login'
    };
    axios(options).then(function (response) {
      console.log(response);
      window.location = "/";
    }).catch(function (error) {
      console.log(error);
    }).finally(() => {
      console.log("Done");
    });
  }

  getInfo = () => {
    axios.get('http://localhost:8080/v1/auth/profile').then(function (res) {
      console.log(res);
    }).catch(function (err) {
      console.log(err);
    });
    console.log("hesdfsd");
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.mySubmitHandler}>
          <h1>Login</h1>
          <p>Email:</p>
          <input
            type='text'
            name='email'
            onChange={this.myChangeHandler}
          />
          <p>Password:</p>
          <input
            type='password'
            name='password'
            onChange={this.myChangeHandler}
          />
          <br />
          <br />
          <input type='submit' />
        </form>
        <button onClick={this.getInfo}>get info</button>
      </div>
    );
  }
}

export { App };
