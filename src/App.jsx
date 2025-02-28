import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/style.css'
import './assets/loader.css'
import Navbar from "./layouts/Navbar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import MyAccount from "./pages/MyAccount"
import MyOrders from "./pages/Myorders"
import Auth from './pages/Auth'
import CheckOut from './pages/CheckOut'
import SingleProduct from './pages/SingleProduct'
import './Api.js'
import Footer from './layouts/Footer.jsx'
import Loader from './layouts/Loader.jsx'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'


function App() {
  const [loader, setLoader] = useState(false)
  const [cart, setCart] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loggedInUserData, setLoggedInUserData] = useState({})

useEffect(() => {
  const token = localStorage.getItem('token')
  if(token){
    setUserLoggedInStatus(true)
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || []
  setCart(cart)


  const userData = (localStorage.getItem('user_data'))
  setLoggedInUserData(userData)
  
}, [])


  const setPageLoading =(status) => {
    setLoader(status)
  }

  // Add products to cart function
  const addProductsToCart = (product) => {

    const cart = JSON.parse(localStorage.getItem("cart")) || []


    const existingProduct = cart.find(item => item.id === product.id)

    if(existingProduct){
      existingProduct.quantity += 1
      
    
    }else {
      product.quantity = 1
      cart.push(product)
    }

    setCart([...cart])
    localStorage.setItem('cart', JSON.stringify(cart))
   
    toast.success('Product added to cart!')
    console.log(product)
  }

  //remove item from cart
  const removeItemFromCart = (product) => {

    if(window.confirm('Do you want to remove this item?')){

      const updateCart = cart.filter(item => item.id !== product.id)
      setCart(updateCart)
      localStorage.setItem('cart', JSON.stringify(updateCart))
      toast.error('Product removed from cart!')
  }
  }

  //set user authentication status after login
  const setUserLoggedInStatus = (status) => {
    setIsAuthenticated(status)
  }

  //logout user
  const setUserLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    setUserLoggedInStatus(false)
    toast.success('User logged out successfully!')
  }

  //remove cart items
  const clearCartItems = () => {
    localStorage.removeItem('cart')
    setCart([])
    // toast.success('Cart items removed!')
  }



  return (
    <>
    <Router>
     <Navbar setUserLogout={setUserLogout} isAuthenticated={isAuthenticated} cartItems={cart} />
     <div className='container'>

      <ToastContainer/>
      {loader && <Loader/> }
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products onAddToCart={addProductsToCart} setPageLoading={setPageLoading} />} />
      <Route path="/cart" element={<Cart onRemoveProduct={removeItemFromCart} cart={cart} />} />
      <Route path="/CheckOut" element={<CheckOut loggedInUserData={loggedInUserData} clearCartItems={clearCartItems} />} />
      <Route path="/my-orders" element={<MyOrders loggedInUserData={loggedInUserData} setPageLoading={setPageLoading}/>} />
      <Route path="/my-account" element={<MyAccount loggedInUserData={loggedInUserData}/>} />
      <Route path="/login" element={<Auth setLoggedInUserData={setLoggedInUserData} isAuthenticated={setUserLoggedInStatus} setPageLoading={setPageLoading} />} />
      <Route path="/product/:id" element={<SingleProduct onAddToCart={addProductsToCart} setPageLoading={setPageLoading}/>} />
     </Routes>
     </div>
     
      <Footer/>
     </Router>
    </>
  )
}

export default App
