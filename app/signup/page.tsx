'use client';
import React, { useEffect } from 'react';
import './signup.scss'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';


const SignUpPage = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        username: ''
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log('signup successful', response.data)
            router.push('/login');
        } catch (error: any) {
            console.log('Signup failed', error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user]);

  return (
    // <div>Sign Up</div>
    <div className="signup-page d-flex justify-content-center align-items-center">
        <div className="form-container container border rounded p-3">
            <form onSubmit={(e) => {e.preventDefault()}}>
                <h1 className='text-center mb-3'>{!loading ? 'Sign up' : 'Processing...'}</h1>
                <div className="form-input mb-3">
                    <input type="email" className='form-control' placeholder='Email' value={user.email} onChange={(e) => {setUser({...user, email: e.target.value})}} />
                </div>
                <div className="form-input mb-3">
                    <input type="text" className='form-control' placeholder='Username' value={user.username} onChange={(e) => {setUser({...user, username: e.target.value})}} />
                </div>
                <div className="form-input mb-3">
                    <input type="password" className='form-control' placeholder='Password' value={user.password} onChange={(e) => {setUser({...user, password: e.target.value})}} />
                </div>
                <div className="form-input">
                    <button className='form-control mb-3 btn btn-primary' onClick={onSignUp}>{buttonDisabled ? 'No signup' : 'Signup'}</button>
                </div>
                <h6 className='text-center'>Already have an account? <Link href='/login'>Login</Link></h6>
            </form>
        </div>
    </div>
  )
}

export default SignUpPage;