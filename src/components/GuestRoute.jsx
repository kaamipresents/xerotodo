import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const GuestRoute = ({ children }) => {

    
    const { isLoggedIn } = useContext(AuthContext)

    if (isLoggedIn) {
        // alert("You are already logged in");
        return <Navigate to='/'/>
    }

    return children
}

export default GuestRoute