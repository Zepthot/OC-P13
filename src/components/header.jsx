// import libraries
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
// import assets
import logo from '../assets/images/argentBankLogo.png';
// import css
import '../assets/style/main.css';
// Header function
function Header () {
    
    return (
        <header>
            <nav className="main-nav">
                <NavLink className="main-nav-logo" to="/">
                    <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                <div>
                    <NavLink className="main-nav-item" to='/signin'>
                    <FaUserCircle />
                    Sign In
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}
// Export to call it up in app.jsx
export default Header;