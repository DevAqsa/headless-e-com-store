import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/style.css'
import Navbar from "./layouts/Navbar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import MyAccount from "./pages/MyAccount"
import MyOrders from "./pages/Myorders"
import Auth from './pages/Auth'
import CheckOut from './pages/CheckOut'
import SingleProduct from './pages/SingleProduct'
import './API.JS'


function App() {
  return (
    <>
    <Router>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/CheckOut" element={<CheckOut />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/product/:id" element={<SingleProduct />} />
     </Routes>
     </Router>
    </>
  )
}

export default App
