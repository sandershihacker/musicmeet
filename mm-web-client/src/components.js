import React, { Component } from 'react';
const axios = require('axios').default;

axios.defaults.withCredentials = true;

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
        this.getInfo();
    }

    // componentWillMount() {
    //     this.getInfo();
    // }

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
        console.log("hesdfsd");
    }

    render() {
        return (
            <div>Haha {this.state.email}</div>
        );
    }
}

const Dog = () => {
    return "My dog Thundric is great.";
};

const Cat = () => {
    return "I love cats.";
};

const NotFound = () => {
    return "Page not found.";
};

export { Homepage, Dog, Cat, NotFound };