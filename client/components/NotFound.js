import React from 'react';
import { Navigate } from 'react-router-dom';

function NotFound() {

    // just navigate back to homepage 
    return (
        <Navigate to="/"/>
    );

}

export default NotFound;