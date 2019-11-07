import React, { Component } from 'react';

class PageNotFound extends Component {
    render() {
        return (
            <div>
                <h1>404 Error</h1>
                <p>The page requested is not found.</p>
            </div>
        );
    }
}

export { PageNotFound };