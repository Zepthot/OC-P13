// import libraries
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { profileUser, changeProfileUser } from '../../common/userSlice';
import axios from 'axios';
// User function
function User () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {profile} = useSelector((state) => state.user);
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            dispatch(profileUser())
            .then(async (response) => {
                if (response.error?.message === 'Request failed with status code 401') {
                    try {
                        const refresh = await axios.get (
                            'http://localhost:3001/api/v1/refreshAccess',
                            {headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}`}}
                        )
                        localStorage.setItem('token', refresh.data.token);
                        localStorage.setItem('refreshToken', refresh.data.refreshToken);
                    } catch (error) {
                        console.error('redirect failed: ', error)
                    }
                    dispatch(profileUser())
                        .then((resp) => {
                            if (!resp.payload) {
                                navigate('/signin');
                            } else {
                                setFirstname(resp.payload.body.firstName);
                                setLastname(resp.payload.body.lastName);
                            }
                        })

                } else if (!response.payload) {
                    navigate('/signin');
                } else {
                    setFirstname(response.payload.body.firstName);
                    setLastname(response.payload.body.lastName);
                }
            });
        };
        fetchProfile();
        // eslint-disable-next-line
    }, []);

    const handleChange = async (event) => {
        event.preventDefault();

        dispatch(changeProfileUser({firstName, lastName}))
        .then(async (response) => {
            if (response.error?.message === 'Request failed with status code 401') {
                try {
                    const refresh = await axios.get (
                        'http://localhost:3001/api/v1/refreshAccess',
                        {headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}`}}
                    )
                    localStorage.setItem('token', refresh.data.token);
                    localStorage.setItem('refreshToken', refresh.data.refreshToken);
                } catch (error) {
                    console.error('redirect failed: ', error)
                }
                dispatch(changeProfileUser({firstName, lastName}))
            }
        })
        setIsEdit(false);
    };
    
    return (
        <main className="main bg-dark">
            <div className="header">
                {profile ? 
                <h1>Welcome back<br />{profile.firstName} {profile.lastName}</h1>
                    :
                <h1>Welcome back</h1>
                }
                {isEdit ?
                <form className='form' onSubmit={handleChange}>
                    <div className='form__container'>
                        <input type='text' placeholder={profile.firstName} onChange={(e) => {setFirstname(e.target.value)}} className='form__input' />
                        <input type='text' placeholder={profile.lastName} onChange={(e) => {setLastname(e.target.value)}} className='form__input'/>
                    </div>
                    <div  className='form__container'>
                        <button className="edit-button" type='submit'>Save</button>
                        <button className="edit-button" type='reset' onClick={() => setIsEdit(false)}>Cancel</button>
                    </div>
                </form>
                    : 
                <button className="edit-button" onClick={() => setIsEdit(true)}>
                    Edit Name
                </button>
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