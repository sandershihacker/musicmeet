import React, { Component } from 'react';
const axios = require('axios').default;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080/v1/auth";

class Logout extends Component {

    constructor() {
        super();
        this.logout();
    }

    logout() {
        axios.get("/logout").then((response) => {
            console.log(response);
        }).catch(function (err) {
            window.alert("Error encountered during logout, please try again.");
        }).finally(() => {
            window.location = "/";
        });
    }

    render() {
        return (
            <div>
                <h1>Logging out...</h1>
            </div>
        );
    }
}

export { Logout };