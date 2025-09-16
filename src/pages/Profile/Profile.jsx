import React, { useEffect, useState } from "react";
import "./Profile.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Header from "../../components/Header/Header";
import { AnimatePresence, motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div className="profile-container">Loading profile...</div>;
  }

  return (
    <div className="profilemain">

    <Header/>

    <AnimatePresence>
      <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>

      <div className="profile-card">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>User ID:</strong> {user.uid}
        </p>
        <p>
          <strong>Password:</strong> ******** (hidden for security)
        </p>
      </div>

      <button
        className="profile-btn"
        onClick={() => alert("Password cannot be shown. Use reset instead.")}
      >
        Show Password
      </button>
    </div>
              </motion.div>
    </AnimatePresence>
    </div>
  );
};

export default Profile;
