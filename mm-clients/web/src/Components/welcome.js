import React, { Component } from 'react';
const axios = require('axios').default;

axios.defaults.withCredentials = true;

class Welcome extends Component {
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
            console.log(res);
            self.setState({
                email: res.data.local.email
            })
        }).catch(function (err) {
            console.log(err);
        });
    }

    render() {
        if (this.state.email !== "") {
            window.location = "/profile";
        }
        return (
            <div>
                <h1>Welcome to Musicmeet!</h1>
                <a href="/login">Login</a>
                <a href="/signup">Sign Up</a>
            </div>
        );
    }
}

export { Welcome };