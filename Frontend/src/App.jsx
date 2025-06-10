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
import MyOrderPage from './Pages/MyOrderPage';
import AdminLayout from './Components/Admin/AdminLayout';
import AdminHomePage from './Pages/AdminHomePage';
import UserManagement from './Components/Admin/UserManagement';
import ProductManagement from './Components/Admin/ProductManagement';
import EditProductPage from './Components/Admin/EditProductPage';
import OrderManagement from './Components/Admin/OrderManagement';

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
          <Route path='/my-orders' element={<MyOrderPage/>}/>
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index element={<AdminHomePage/>}/>
          <Route path='users' element={<UserManagement/>}/>
          <Route path='products' element={<ProductManagement/>}/>
          <Route path='products/:id/edit' element={<EditProductPage/>}/>
          <Route path='orders' element={<OrderManagement/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
