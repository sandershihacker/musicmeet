import React, { Component } from 'react';

const axios = require('axios').default;
const qs = require('qs');

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080/vi/auth"

class Login extends Component {
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
      url: '/login'
    };
    axios(options).then(function (response) {
      console.log(response);
      window.location = "/";
    }).catch(function (error) {
      if (error.response.status === "401") {
        window.alert("Wrong email/password combination.");
      } else {
        console.log(error);
      }
    }).finally(() => {
      console.log("Done");
    });
  }

  getInfo = () => {
    axios.get('/profile').then(function (res) {
      console.log(res);
    }).catch(function (err) {
      console.log(err);
    });
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.mySubmitHandler}>
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

export { Login };
