// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// 1️⃣ Create context object
export const AuthContext = createContext();

// 2️⃣ Create provider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    // // 3️⃣ Load auth state from localStorage (on refresh)
    // useEffect(() => {
    //     // const currentUser = localStorage.getItem("currentUser");
    //     const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    //     if (isLoggedIn) {
    //         // setCurrentUser(JSON.parse(storedUser));
    //         setIsLoggedIn(true);
    //     }
    // }, []);

    // 4️⃣ Define login method
    const login = async (email, password) => {
        try {

            setLoading(true);
            
            // Firebase login
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const user = userCredential.user;
            
            console.log("Login successful:", user);
            
            
            setLoading(false);
            
            // setCurrentUser(user.email);
            
            navigate("/"); // redirect to TodoApp
        } catch (error) {
            console.error("Login error:", error.code, error.message);
            alert("Invalid email or password. Please try again.");
            setLoading(false);
        }
    };

    // 5️⃣ Define logout method
    const logout = () => {
        signOut(auth)
      .then(() => {
        alert("Successfully Logged Out")
        navigate("/login"); // redirect after logout
        setTasks([])
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });

    };
    
    const signup = async (email, password) => {
        try {

            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            console.log("✅ User signed up:", user);
            
            alert("Signup successful!");
            setLoading(false);
            navigate("/login", { replace: true });
        } catch (error) {
            setLoading(false);
            console.error("❌ Signup error:", error.message);
            alert(error.message); // show Firebase error (e.g., weak password, email already in use)
        }
    };
   
    const deleteUser = (email) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const validUser = users.find(
            (u) => u.email === email
        );

        if (validUser) {
            const updatedusers = users.filter((user) => user.email !== validUser.email)
            localStorage.setItem("users", JSON.stringify(updatedusers));
            alert("User Deleted");
            return;
        } else {
            alert("User does not exist");
        }
    }

    // 6️⃣ Pass state + actions via context
    return (
        <AuthContext.Provider value={{ isLoggedIn, loading, setLoading, currentUser, signup, login, logout, deleteUser, tasks, setTasks }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

