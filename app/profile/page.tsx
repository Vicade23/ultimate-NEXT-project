'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {toast} from 'react-hot-toast';
import { useRouter } from 'next/navigation';



const UserProfilepg = () => {
  const router = useRouter();
  const [data, useData] = useState('nothing')

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message); 

      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    useData(res.data.data._id)
  }

  return (
    <div>
      Profilepg
      <h2>{data ==='nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button onClick={logout} className='btn btn-primary btn-lg'>Login out</button>
      <button onClick={getUserDetails} className='btn btn-secondary btn-lg'>Get User Details</button>
    </div>
  )
}

export default UserProfilepg