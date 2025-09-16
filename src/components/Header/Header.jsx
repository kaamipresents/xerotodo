import { useContext, useEffect, useState } from 'react';
import './Header.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
// import { ReactComponent as Logo } from "../../assets/signout-icon.svg"

const Header = () => {

    const {logout } = useContext(AuthContext);
    const {toggleTheme, theme,setTheme } = useContext(ThemeContext);
    const location = useLocation();

    const handleColor = () => {
        toggleTheme();
    }

    useEffect(() => {
        const updatedTheme = JSON.parse(localStorage.getItem('theme'))
        setTheme(updatedTheme)
        document.documentElement.setAttribute("data-theme", updatedTheme)
    }, []);

    return (
        <div className='header'>
            <div className="logo">
                <span>XERO</span>
                <span>TODO</span>
            </div>

            <div className="icons">

                <Link to={`${location.pathname==="/profile"?"/":"/profile"}`}><button onClick={()=>{console.log(location)}}>{location.pathname==="/profile"?"Home":"Profile"}</button></Link>
                <button onClick={handleColor}>{theme === 'light' ? "Light Mode" : "Dark Mode"}</button>
                <div onClick={logout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#cdbda4"><path fill="transparent" stroke="#cdbda4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 12h9m0 0l-3.333-4M22 12l-3.333 4M14 7V5.174a2 2 0 0 0-2.166-1.993l-8 .666A2 2 0 0 0 2 5.84v12.32a2 2 0 0 0 1.834 1.993l8 .667A2 2 0 0 0 14 18.826V17" /></svg>
                </div>
            </div>
        </div>
    )
}

export default Header