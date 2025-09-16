import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { ClipLoader } from "react-spinners";


const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) return <ClipLoader
        color="orange"
        loading={loading}
        // cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export default ProtectedRoute;
