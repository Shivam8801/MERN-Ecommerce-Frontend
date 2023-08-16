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



const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected>
      <Home></Home>
    </Protected>),
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

]);

function App() {

  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
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