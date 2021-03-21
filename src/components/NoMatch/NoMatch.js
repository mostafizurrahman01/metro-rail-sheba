import React from 'react';
import "./NoMatch.css"
const NoMatch = () => {
    return (
        <div className="error-container">
            <h1>ERORR 404 !</h1>
            <p>You entered in an unavailable route.Please try again!</p>
        </div>
    );
};

export default NoMatch;