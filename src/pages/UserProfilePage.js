import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/components/UserProfile'

export default function UserProfilePage() {
  return (
    <Navbar>
    <div className="text-3xl font-bold tracking-tight text-gray-900 text-center">My Profile</div>
        <UserProfile></UserProfile>
    </Navbar>
  )
}
