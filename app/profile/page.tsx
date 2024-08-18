'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {toast} from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import './profile.scss'



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
      <h2 className='text-center pt-3'>{data ==='nothing' ? 'Profile page' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <div className="text-center">{data ==='nothing' ? '' : 'Click on the displayed link id'}</div>
      <div className="profile-btns d-flex justify-content-center align-items-center py-3">
        
        <button onClick={logout} className='btn btn-primary btn-lg me-3'>Login out</button>
        <button onClick={getUserDetails} className='btn btn-secondary btn-lg ms-3'>Get User Details</button>
      </div>
    </div>
  )
}

export default UserProfilepg