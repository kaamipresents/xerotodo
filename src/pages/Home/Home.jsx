import React, { useContext } from 'react'
import TodoApp from '../../components/TodoApp/TodoApp'
import Header from '../../components/Header/Header'
import '../../styles/theme.css'
import './Home.css';
import { AnimatePresence, motion } from 'framer-motion';

const Home = () => {
    // const {loading, setLoading} = useContext(AuthContext)
    return (
        <div className='homemain'>
            <Header />
            <AnimatePresence mode='wait'>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
            <TodoApp />
              </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default Home