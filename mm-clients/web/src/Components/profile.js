import React, { Component } from 'react';
const axios = require('axios').default;

axios.defaults.withCredentials = true;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
        this.getInfo();
    }

    getInfo = () => {
        var self = this;
        axios.get('http://localhost:8080/v1/auth/profile').then(function (res) {
            self.setState({
                email: res.data.local.email
            })
        }).catch(function (err) {
            console.log(err);
        });
    }

    render() {
        if (this.state.email === "") {
            console.log("hey");
        }
        return (
            <div>
                <h1>Welcome to Musicmeet!</h1>
                <h3>Profile Information:</h3>
                <p>Email: {this.state.email}</p>
                <a href="/logout">Logout</a>
            </div>
        );
    }
}

export { Profile };