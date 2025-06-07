import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLayout from './Components/Layout/UserLayout';
import Home from './Pages/Home';
import {Toaster} from 'sonner';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import CollectionPage from './Pages/CollectionPage';
import ProductDetails from './Components/Products/ProductDetails';
import { Checkout } from './Components/Cart/Checkout';
import { OrderConfirmationPage } from './Pages/OrderConfirmationPage';
import OrderDetailsPage from './Pages/OrderDetailsPage';

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position = "top-right"/>
      <Routes>
        <Route path='/' element={<UserLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='collections/:collection' element={<CollectionPage/>}/>
          <Route path='product/:id' element={<ProductDetails/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/order-confirmation' element={<OrderConfirmationPage/>}/>
          <Route path='order/:id' element={<OrderDetailsPage/>}/>
        </Route>
        <Route>{/*Admin Layout */}</Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
