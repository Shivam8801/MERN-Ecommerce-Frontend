import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { updateUser } from '../userAPI';
import { useForm } from "react-hook-form";


export default function Counter() {
  const dispatch = useDispatch();

  const user = useSelector(selectUserInfo)

  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const handleAddress = (e) => {
    console.log(e.target.value)
    setSelectedAddress(user.addresses[e.target.value])
  }

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1, addressUpdate)
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(-1)
  }

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))
  }

  const handleEditForm = (index) => {
    setSelectedEditIndex(index)
    const address = user.addresses[index]
    setValue('name', address.name)
    setValue('email', address.email)
    setValue('phone', address.phone)
    setValue('street', address.street)
    setValue('city', address.city)
    setValue('state', address.state)
    setValue('postalCode', address.postalCode)
  }

  const handlePayment = (e) => {
    console.log(e.target.value)
    setPaymentMethod(e.target.value)
  }

  const handleAdd = (address) => {
    const newUser = { ...user, addresses: [...user.addresses, address] }
    dispatch(updateUserAsync(newUser))
    setShowAddAddressForm(false)
  }

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


      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
          <div className=" border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-12 font-bold tracking-tight text-gray-900">
              Name: {user.name ? user.name : 'New User'}
            </h1>


            <h3 className="text-xl my-12 font-bold tracking-tight text-gray-900">
              email address: {user.email}
            </h3>

          </div>


          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

            <button
              onClick={e => {
                setShowAddAddressForm(true);
                setSelectedEditIndex(-1)
              }}
              type="submit"
              className="rounded-md bg-green-600 px-3 py-2 my-5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Address
            </button>


            {showAddAddressForm ?
              <form noValidate className='bg-white px-5 py-16' onSubmit={handleSubmit((data) => {
                console.log(data)
                handleAdd(data)
                reset();
              })}
              >
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900">Add Details</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive products.</p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('name', { required: 'Name is required!' })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>


                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register('email', { required: 'Email is required!' })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>



                    <div className="sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone
                      </label>

                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register('phone', { required: 'Phone is required!' })}
                          type="tel"
                          pattern="[0-9]{10}"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>





                    <div className="col-span-full">
                      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('street', { required: 'Street address is required!' })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('city', { required: 'City name is required!' })}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('state', { required: 'State is required!' })}
                          id="region"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('postalCode', { required: 'Postal code is required!' })}
                          id="postalCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">

                  <button
                    onClick={e => setShowAddAddressForm(false)}
                    type="submit"
                    className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </form> : null}

            <p className="mt-0.5 text-sm text-gray-500">Your Addresses:</p>

            {user.addresses.map((address, index) => (

              <div>

                {selectedEditIndex === index ?
                  <form noValidate className='bg-white px-5 mt-12 py-16' onSubmit={handleSubmit((data) => {
                    console.log(data)
                    handleEdit(data, index)
                    reset();
                  })}
                  >
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-4xl font-bold tracking-tight text-gray-900">Address Update</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive products.</p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('name', { required: 'Name is required!' })}
                              id="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>


                        <div className="sm:col-span-4">
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register('email', { required: 'Email is required!' })}
                              type="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>



                        <div className="sm:col-span-3">
                          <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone
                          </label>

                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register('phone', { required: 'Phone is required!' })}
                              type="tel"
                              pattern="[0-9]{10}"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>





                        <div className="col-span-full">
                          <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('street', { required: 'Street address is required!' })}
                              id="street"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('city', { required: 'City name is required!' })}
                              id="city"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('state', { required: 'State is required!' })}
                              id="region"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('postalCode', { required: 'Postal code is required!' })}
                              id="postalCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">

                      <button
                        onClick={e => setSelectedEditIndex(-1)}
                        type="submit"
                        className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                  </form> : null}


                <div className="flex justify-between gap-x-6 px-5 py-5 mt-2 border-solid border-2 border-gray-200">
                  <div className="flex gap-x-4">

                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}&#44; {address.city}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.state}&#44; {address.postalCode}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-gray-900"><span className="text-sm font-semibold leading-6 text-gray-900">Phone:</span> {address.phone}</p>

                  <div className="hidden sm:flex sm:flex-col sm:items-end">

                    <button
                      onClick={(e) => handleEditForm(index)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>


                    <button
                      onClick={e => handleRemove(e, index)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
