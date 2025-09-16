import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";
import { AuthContext } from "../../context/AuthContext";

function SignupForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // CALLING THE STATES AND METHOD from CONTEXTAPI
    const {signup } = useContext(AuthContext);

    const handleSignup = (e) => {
      e.preventDefault();
      signup(email,password);
    }

  return (
    <form className="signup-form" onSubmit={handleSignup}>
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
      <button type="submit">Signup</button>
    </form>
  );
}

export default SignupForm;
