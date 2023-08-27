import React, { useEffect, useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux';
import { selectBrands, selectCategories, fetchBrandsAsync, fetchCategoriesAsync, createProductAsync, selectProductByID, fetchSelectedProductAsync, updateProductAsync, clearSelectedProduct } from '../../product/productSlice';
import { useForm } from "react-hook-form";
import { useParams, Link } from 'react-router-dom';
import Modal from '../../common/Modal';
import { useAlert } from 'react-alert';


export default function ProductForm() {

    const dispatch = useDispatch()

    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const [openModal, setOpenModal] = useState(false);
    const alert = useAlert()

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();


    const params = useParams()
    const selectedProduct = useSelector(selectProductByID)

    useEffect(() => {
        if (params.id) {
            dispatch(fetchSelectedProductAsync(params.id))
        }
        else {
            dispatch(clearSelectedProduct())
        }
    }, [params.id, dispatch])

    useEffect(() => {
        if (selectedProduct && params.id) {
            setValue('title', selectedProduct.title)
            setValue('description', selectedProduct.description)
            setValue('price', selectedProduct.price)
            setValue('rating', selectedProduct.rating)
            setValue('discountPercentage', selectedProduct.discountPercentage)
            setValue('stock', selectedProduct.stock)
            setValue('thumbnail', selectedProduct.thumbnail)
            setValue('image1', selectedProduct.images[0])
            setValue('image2', selectedProduct.images[1])
            setValue('image3', selectedProduct.images[2])
            setValue('brand', selectedProduct.brand)
            setValue('category', selectedProduct.category)
        }
    }, [selectedProduct, params.id, setValue])


    const handleDelete = () => {
        const product = { ...selectedProduct }
        product.deleted = true
        dispatch(updateProductAsync(product))
    }

    return (
        <>
            {selectedProduct && <Modal title={`Delete ${selectedProduct?.title}?`} message="Are you sure you want to delete product?" dangerOption="Delete" cancelOption="Cancel" dangerAction={handleDelete} cancelAction={() => setOpenModal(false)} showModal={openModal}></Modal>}

            <form onSubmit={handleSubmit((data) => {
                console.log(data)
                const product = { ...data }
                product.images = [product.image1, product.image2, product.image3, product.thumbnail]
                delete product['image1']
                delete product['image2']
                delete product['image3']
                product.rating = 0
                product.price = +product.price
                product.discountPercentage = +product.discountPercentage
                product.stock = +product.stock
                console.log(product)

                if (params.id) {
                    product.id = params.id
                    product.rating = selectedProduct.rating || 0;
                    dispatch(updateProductAsync(product))
                    alert.success('Product Updated!')

                    reset()
                }

                else {
                    dispatch(createProductAsync(product))
                    alert.success('Product Created!')
                    reset()
                }
            })}>
                <div className="space-y-12 bg-white p-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h1 className="text-4xl my-12 font-bold tracking-tight text-gray-900">{!selectedProduct ? `Add Product` : `Product Details`}</h1>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input

                                            {...register("title", {
                                                required: "title is required!",
                                            })}
                                            type="text"
                                            id="title"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        rows={3}

                                        {...register("description", {
                                            required: "description is required!",
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the product.</p>
                            </div>


                            <div className="col-span-full">
                                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <select {...register("brand", {
                                        required: "brand is required!",
                                    })}>
                                        <option value="">---------choose brand---------</option>
                                        {
                                            brands.map((brand) => (
                                                <option value={brand.value}>{brand.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>


                            <div className="col-span-full">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select {...register("category", {
                                        required: "category is required!",
                                    })}>
                                        <option value="">--------choose category--------</option>
                                        {
                                            categories.map((category) => (
                                                <option value={category.value}>{category.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Price
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="number"
                                            {...register("price", {
                                                required: "price is required!",
                                                min: 1,
                                                max: 10000
                                            })}
                                            id="price"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                    Discount
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="number"
                                            step="0.01"
                                            {...register("discountPercentage", {
                                                required: "discountPercentage is required!",
                                                min: 1,
                                                max: 50,
                                            })}
                                            id="discount"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="sm:col-span-2">
                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                    Stock
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="number"
                                            {...register("stock", {
                                                required: "stock is required!",
                                                min: 0,
                                            })}
                                            id="stock"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                    Thumbnail
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("thumbnail", {
                                                required: "thumbnail is required!",
                                            })}
                                            id="thumbnail"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 1
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("image1", {
                                                required: "image is required!",
                                            })}
                                            id="image1"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="sm:col-span-6">
                                <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 2
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("image2", {
                                                required: "image is required!",
                                            })}
                                            id="image2"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 3
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("image3", {
                                                required: "image is required!",
                                            })}
                                            id="image3"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>


                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">

                    <Link to='/' type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </Link>



                    {selectedProduct && !selectedProduct.deleted && <button
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenModal(true);
                        }}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Delete
                    </button>}


                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save Product
                    </button>
                </div>
            </form>

        </>
    )
}