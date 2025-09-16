import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import "../../styles/theme.css";
import { AuthContext } from "../../context/AuthContext";
import { ClipLoader } from "react-spinners";

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  // CALLING THE STATES AND METHOD from CONTEXTAPI
  const {login} = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email,password);
    // navigate('/');
    setEmail('');
    setPassword('');
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
