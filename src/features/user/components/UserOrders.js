import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from '../userSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import { Link } from 'react-router-dom';


function UserOrders() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo)
    const orders = useSelector(selectUserOrders)

    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync(user.id))
    }, [])


    return (
        <div>


            <div className="mt-8 flex justify-center text-center text-sm text-gray-500">
                <p>
                    <Link to="/">
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </Link>
                </p>
            </div>


            {orders.map((order) =>
            (
                <div>
                    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
                        <div className=" border-gray-200 px-4 py-6 sm:px-6">
                            <h1 className="text-4xl my-12 font-bold tracking-tight text-gray-900">
                                Order #{order.id}
                            </h1>


                            <h3 className="text-xl my-12 font-bold tracking-tight text-gray-900">
                                Order Status: <span className='text-red-800'>{order.status}</span>
                            </h3>

                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {order.items.map((item) => (
                                        <li key={item.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <a href={item.href}>{item.title}</a>
                                                        </h3>
                                                        <p className="ml-4">${item.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="text-gray-500">

                                                        <label htmlFor="quantity" className="inline mr-4 text-sm font-medium leading-6 text-gray-900">
                                                            Qty : {item.quantity}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>


                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>${order.totalAmount}</p>
                            </div>

                            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                <p>Total Items Ordered</p>
                                <p>{order.totalItems} items</p>
                            </div>
                        </div>

                        <p className="mt-0.5 text-sm text-gray-500">Shipping Address:</p>

                        <div className="flex justify-between gap-x-6 px-5 py-5 mt-2 border-solid border-2 border-gray-200">
                            <div className="flex gap-x-4">

                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress.name}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.street}&#44; {order.selectedAddress.city}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.state}&#44; {order.selectedAddress.postalCode}</p>
                                </div>
                            </div>


                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900"><span className="text-sm font-semibold leading-6 text-gray-900">Phone:</span> {order.selectedAddress.phone}</p>
                            </div>
                        </div>

                    </div>
                </div>

            ))}
        </div>
    );
}


export default UserOrders