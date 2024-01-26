// import libraries
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { profileUser, changeProfileUser } from '../../common/userSlice';
// User function
function User () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {profile} = useSelector((state) => state.user);
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            dispatch(profileUser())
            .then((response) => {
                if (!response.payload) {
                    navigate('/signin');
                }
                
            });
        };
        fetchProfile();
        // eslint-disable-next-line
    }, []);

    const handleChange = async (event) => {
        event.preventDefault();

        if (firstName === '') {
            setFirstname(profile.body.firstName);
        }

        if (lastName === '') {
            setLastname(profile.body.lastName);
        }
        dispatch(changeProfileUser({firstName, lastName}))
    }
    
    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back</h1>
                {profile ? 
                <form className='form' onSubmit={handleChange}>
                    <div className='form__container'>
                        <input type='text' placeholder={profile.body.firstName} onChange={(e) => {setFirstname(e.target.value)}} className='form__input' />
                        <input type='text' placeholder={profile.body.lastName} onChange={(e) => {setLastname(e.target.value)}} className='form__input'/>
                    </div>
                    <div  className='form__container'>
                        <button className="edit-button" type='submit'>Save</button>
                        <button className="edit-button" type='reset'>Cancel</button>
                    </div>
                </form>
                    : <></>
                }
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    );
}
// Export to call it up in app.jsx
export default User;