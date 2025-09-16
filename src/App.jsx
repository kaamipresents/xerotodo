import React, { useEffect } from 'react'
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

const App = () => {

  const { defaultTheme } = useContext(ThemeContext)

  //  localStorage.clear();

  useEffect(() => {
    defaultTheme();
  }, [])


  return (
    <>
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
  )
}

export default App