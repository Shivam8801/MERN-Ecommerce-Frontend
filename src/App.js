import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailsPage from './pages/ProductDetailsPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Protected from './features/auth/components/Protected';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/orderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';





const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected>
      <Home></Home>
    </Protected>),
  },

  {
    path: "/admin",
    element: (<ProtectedAdmin>
      <AdminHome></AdminHome>
    </ProtectedAdmin>),
  },

  {
    path: "/login",
    element: (<LoginPage></LoginPage>),
  },
  {
    path: "/signup",
    element: (<SignupPage></SignupPage>),
  },

  {
    path: "/cart",
    element: (<Protected>
      <CartPage></CartPage>
    </Protected>),
  },

  {
    path: "/checkout",
    element: (<Protected>
      <Checkout></Checkout>
    </Protected>),
  },

  {
    path: "/product-details/:id",
    element: (<Protected>
      <ProductDetailsPage></ProductDetailsPage>
    </Protected>),
  },

  {
    path: "/admin/product-details/:id",
    element: (<ProtectedAdmin>
      <AdminProductDetailsPage></AdminProductDetailsPage>
    </ProtectedAdmin>),
  },

  {
    path: "/admin/product-form",
    element: (<ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>),
  },

  {
    path: "/admin/orders",
    element: (<ProtectedAdmin>
      <AdminOrdersPage></AdminOrdersPage>
    </ProtectedAdmin>),
  },

  {
    path: "/admin/product-form/edit/:id",
    element: (<ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>),
  },


  {
    path: "/order-success/:id",
    element: (<OrderSuccessPage></OrderSuccessPage>),
  },


  {
    path: "*",
    element: (<PageNotFound></PageNotFound>),
  },


  {
    path: "/orders",
    element: (<UserOrdersPage></UserOrdersPage>),
  },

  {
    path: "/profile",
    element: (<UserProfilePage></UserProfilePage>),
  },


  {
    path: "/logout",
    element: (<Logout></Logout>),
  },

  {
    path: "/forgot-password",
    element: (<ForgotPasswordPage></ForgotPasswordPage>),
  },

]);

function App() {

  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user])

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>

  );
}

export default App;