import { useNavigate } from "react-router-dom"
import SingleProduct from "./SingleProduct"
import { useState, useEffect } from "react" 


function Cart() {
    const [products, setProdcurts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {

        setProdcurts([
            {
                image: "public/washing-machine-2.jpg",
                title: "Product 1",
                price: 10.99,
                quantity: 2
            },
            {
                image: "public/washing-machine-2.jpg",
                title: "Product 2",
                price: 20.99,
                quantity: 1
            },
            {
                image: "public/washing-machine-2.jpg",
                title: "Product 3",
                price: 30.99,
                quantity: 3
            }
        ])

    }, [])

const goToCheckOutPage = () => {
    navigate('/CheckOut')
}

  return <>
  <div className="container">
    <h1 className="my-4">Cart</h1>
   
    <div id="cart-items">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {
            products.map((SingleProduct, index) =>
            <tr key={index}>
            <td><img src={SingleProduct.image} alt="Product Name" style={{width: '50px'}} /></td>
            <td>{SingleProduct.title}</td>
            <td>{SingleProduct.price}</td>
            <td>{SingleProduct.quantity}</td>
            <td>
              
              <button className="btn btn-danger">Remove</button>
            </td>
          </tr>
            )
         }

          
         
        </tbody>
      </table>
      <div className="row align-items-center">
        <div className="col">
          <h3>Total: $50.00</h3>
        </div>
        <div className="col text-end">
          
          <button className="btn btn-success" onClick={goToCheckOutPage}>Checkout</button>
        </div>
      </div>
    </div>
  
    
    <div id="empty-cart-message">
      <p>Your cart is empty.</p>
    </div>
  </div>
  
  </>
}

export default Cart