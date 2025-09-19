import React, { useEffect, useState } from 'react'
import './App.css'
import '../src/styles/theme.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import { ThemeContext } from './context/ThemeContext'
import { useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Profile from './pages/Profile/Profile'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const { defaultTheme } = useContext(ThemeContext);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    defaultTheme();
    const timer = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <div style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-bg)',
          color: 'var(--color-primary)',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          left: 0
        }}>
          XeroTodo
        </div>
      ) : (
        <>
          <ToastContainer
            position="bottom-right"
            autoClose={1800}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            // theme="colored"
            toastStyle={{ background: "var(--color-primary)", color: "var(--color-text)" }}
          />
          <AnimatePresence mode='wait'>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path='/login'
                element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                }
              />
              <Route path='/signup' element={
                <GuestRoute>
                  <Signup />
                </GuestRoute>
              } />
              <Route path='/profile' element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default App