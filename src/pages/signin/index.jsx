// import libraries
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../common/userSlice';
// Signin function
function Signin () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {loading, error} = useSelector((state) => state.user)

    const onSubmitLogin = async (event) => {
        event.preventDefault();
        
        dispatch(loginUser({email, password}))
            .then((result) => {
                if (result.payload) {
                    setEmail('');
                    setPassword('');
                    navigate('/user');
                }
        })
    };
    
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={onSubmitLogin}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Username</label>
                        <input type="text" id="email" onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type='submit' className="sign-in-button">
                        {loading ? 'Loading...': 'Sign In'}
                    </button>
                    {error && (
                        <div className='error'>{error}</div>
                    )}
                </form>
            </section>
        </main>
    );
}
// Export to call it up in app.jsx
export default Signin;