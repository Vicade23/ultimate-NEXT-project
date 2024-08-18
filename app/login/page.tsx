'use client';
import React, { useEffect } from 'react';
import './login.scss'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


const LoginPage = () => {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const onLogIn = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log('Login successful', response.data)
            toast.success('Login success')
            router.push('/profile');
            
            Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Wellcome",
            showConfirmButton: false,
            timer: 1500
  })
        } catch (error: any) {
            console.log('Login failed', error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };
    
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 ) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user]);

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
        <div className="form-container container border rounded p-3">
            <form onSubmit={(e) => {e.preventDefault()}}>
                <h1 className='text-center mb-3'>{!loading ? 'Login' : 'Processing...'}</h1>
                <div className="form-input mb-3">
                    <input type="email" className='form-control py-3' placeholder='Email' value={user.email} onChange={(e) => {setUser({...user, email: e.target.value})}} />
                </div>
                <div className="form-input mb-3">
                    <input type="password" className='form-control py-3' placeholder='Password' value={user.password} onChange={(e) => {setUser({...user, password: e.target.value})}} />
                </div>
                <div className="form-input">
                    <button className='form-control py-3 mb-3 btn btn-primary' onClick={onLogIn}>{buttonDisabled ? 'No Login' : 'Login'}</button>
                </div>
                <h6 className='text-center'>Don't have an account? <Link href='/signup'>Sign Up</Link></h6>
            </form>
        </div>
    </div>
  )
}

export default LoginPage;