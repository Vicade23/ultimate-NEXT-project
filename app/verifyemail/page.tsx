'use client';

import axios
 from "axios";
 import Link from "next/link";
 import React, { useEffect, useState} from "react";

 export default function VerifyEmailPage() {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
       try { 
        await axios.post('/api/users/verifyemail', {token});
        setVerified(true)

       } catch (error: any) {
        setError(true);
        console.log(error.response.data)
       } 
    }
    
    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken || '');
    })
    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token])


    return (
        <div className="m-auto ">
            <h1>Verify Email</h1>
            <h2>{token ? `${token}` : 'no token'}</h2>
            {verified && (
                <>
                    <h2 className="bg-danger">Email Verified</h2>
                    <Link href='/login'>Login</Link>
                </>
            )}

            {error && (
                <>
                    <h2 className="bg-danger">Error</h2>
                </>
            )}
        </div>
    )

 }