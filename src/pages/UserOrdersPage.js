import React from 'react'
import UserOrders from '../features/user/components/UserOrders'
import Navbar from '../features/navbar/Navbar'

function UserOrdersPage() {
    return (
        <Navbar>
            <UserOrders></UserOrders>
        </Navbar>
    )
}


export default UserOrdersPage