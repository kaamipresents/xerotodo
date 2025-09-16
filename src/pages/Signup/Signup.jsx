import { Link } from "react-router-dom";
import "./Signup.css";
import SignupForm from "../../components/SignupForm/SignupForm";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ClipLoader } from "react-spinners";

function Signup() {

  const { loading } = useContext(AuthContext)

  return (
    <div className="signup-page">
      {(loading)? <ClipLoader
        color="orange"
        loading={loading}
        // cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />:
      <div className="signup-container">
        <h2 className="signup-title">Signup</h2>
        <SignupForm />
        <p>
          Already have an account?{" "}
          <Link to="/login" className="toggle-btn">
            Login
          </Link>
        </p>
      </div>}
    </div>
  );
}

export default Signup;
