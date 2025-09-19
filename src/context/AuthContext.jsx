// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from 'react-toastify';



// 1️⃣ Create context object
export const AuthContext = createContext();

// function to call toast with custom message and timeout only (styling from ToastContainer)
const notify = (message, time = 1800) =>
    toast(message, {
        autoClose: time,
    });

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
            
            // console.log("Login successful:", user);
            
            
            setLoading(false);
            
            // setCurrentUser(user.email);
            // toast("You are successfully logged in!",{autoClose: 500});
            notify("You are successfully logged in!", 1800);
            navigate("/"); // redirect to TodoApp
            return;
        } catch (error) {
            // toast("Invalid email or password. Please try again.",{autoClose: 500});
            notify("Invalid email or password. Please try again.", 500);
            // console.error("Login error:", error.code, error.message);
            // alert("Invalid email or password. Please try again.");
            setLoading(false);
        }
    };

    // 5️⃣ Define logout method
    const logout = () => {
        signOut(auth)
      .then(() => {
        // alert("Successfully Logged Out")
        // toast("You are successfully logged out!",{autoClose: 500});
        notify("You are successfully logged out!", 500);
        navigate("/login"); // redirect after logout
        setTasks([])
      })
      .catch((error) => {
        notify("Error logging out. Please try again.", 500);
        // console.error("Logout error:", error);
      });

    };
    
    const signup = async (email, password) => {
        try {

            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            console.log("✅ User signed up:", user);
            
            // alert("Signup successful!");
            notify("Signup successful! Please log in.", 500);
            setLoading(false);
            navigate("/login", { replace: true });
        } catch (error) {
            setLoading(false);
            console.error("❌ Signup error:", error.message);
            // alert(error.message); // show Firebase error (e.g., weak password, email already in use)
            notify(error.message, 500);
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
            // alert("User Deleted");
            notify("User Deleted", 500);
            return;
        } else {
            alert("User does not exist");
            notify("User does not exist", 500);
        }
    }

    // 6️⃣ Pass state + actions via context
    return (
        <AuthContext.Provider value={{ isLoggedIn, loading, setLoading, currentUser, signup, login, logout, deleteUser, tasks, setTasks, notify }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

