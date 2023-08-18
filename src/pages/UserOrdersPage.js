import React from 'react'
import UserOrders from '../features/user/components/UserOrders'
import Navbar from '../features/navbar/Navbar'

function UserOrdersPage() {
    return (
        <Navbar>
            <div className="text-3xl font-bold tracking-tight text-gray-900 text-center">My Orders</div>
            <UserOrders></UserOrders>
        </Navbar>
    )
}


export default UserOrdersPage