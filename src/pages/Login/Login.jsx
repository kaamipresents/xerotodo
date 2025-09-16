import React, { useContext, useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Link, Navigate, useLocation } from "react-router-dom";
import "./Login.css";
import "../../styles/theme.css";
import { AuthContext } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

function Login() {

  const [email, setEmail] = useState("");

  const { deleteUser, loading } = useContext(AuthContext)

  const handleDelete = (e) => {
    e.preventDefault();
    deleteUser(email);
    setEmail("");
  };

  return (
    <>
      <div className="login-page">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >

        {(loading)? <ClipLoader
        color="orange"
        loading={loading}
        // cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />: 
      
          <div className="login-container">
            <h2 className="login-title">Login</h2>
            <AnimatePresence mode="wait">
              <LoginForm />
            </AnimatePresence>
            <p>
              Don’t have an account? <span></span>
              <Link to="/signup" className="toggle-btn">
                Signup
              </Link>
            </p>
            <form onSubmit={handleDelete} className="deleteForm">
              <input
                value={email}
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
                />
              <button type="submit" className="toggle-act-btn">
                Delete
              </button>
            </form>
          </div>
              }
        </motion.div>
      </div>
    </>
  );
}

export default Login;
