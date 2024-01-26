// import libraries
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { logoutUser } from '../common/userSlice';
// import assets
import logo from '../assets/images/argentBankLogo.png';
// import css
import '../assets/style/main.css';

// Header function
function Header () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {profile} = useSelector((state) => state.user);

    const handleSignout = async (event) => {
        event.preventDefault();

        dispatch(logoutUser());
        navigate('/signin');
    };
    
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
                {profile ? 
                <div className='header__user'>
                    <FaUserCircle className='header__user__logo' />
                    {profile.body.firstName}
                    <a href='/' onClick={handleSignout} className='header__user__button'>
                        <FaSignOutAlt className='header__logout' />
                        Sign out
                    </a>
                </div>
                :
                <div>
                    <NavLink className='header__user__button' to='/signin'>
                    <FaUserCircle className='header__user__logo' />
                    Sign In
                    </NavLink>
                </div>
                }
                
            </nav>
        </header>
    );
}
// Export to call it up in app.jsx
export default Header;