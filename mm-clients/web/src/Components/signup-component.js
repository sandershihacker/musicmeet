import React, { Component } from 'react';

const axios = require('axios').default;
const qs = require('qs');

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080/v1/auth"

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        let options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(this.state),
            url: '/signup'
        };
        axios(options).catch(function (error) {
            console.log(error);
        }).finally(() => {
            console.log("Done");
            options.url = '/login';
            axios(options).then(function (response) {
            }).catch(function (err) {
                console.log(err);
            }).finally(() => {
                window.location = "/";
            });
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
                <h1>Sign-up</h1>
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
            </div>
        );
    }
}

export { Signup };
