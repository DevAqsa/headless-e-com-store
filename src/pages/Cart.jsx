import { useNavigate } from "react-router-dom"

import { useState, useEffect } from "react" 


function Cart({onRemoveProduct, cart}) {
    
  const [cartItems, setCartItems] = useState(cart)
    const navigate = useNavigate();

    

const goToCheckOutPage = () => {
    navigate('/CheckOut')
}

useEffect(() => {
    setCartItems(cart)
    }, [cart])

    //return product price / sale price value
    const renderProductPrice = (product) => {
        
      if(product.sale_price){
        return <>
        <span className='text-muted text-decoration-line-through'>${product.regular_price}</span>
        <span className='text-danger'>{product.sale_price}</span>
        </>
      }

      return <span>${product.regular_price || product.price}</span>
    }

    //calculate the total items price in the cart
    const calculateTotalItemsPrice = () => {
        
       return cartItems.reduce((total,item) => {
          const price = item.price ? parseFloat(item.price) : 0
          return total + (price * item.quantity)
        },0).toFixed(2)
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
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {
            cartItems.map((SingleProduct, index) =>
            <tr key={index}>
            <td><img src={SingleProduct?.images[0].src} alt={SingleProduct} style={{width: '50px'}} /></td>
            <td>{SingleProduct.name}</td>
            <td>{renderProductPrice(SingleProduct)}</td>
            <td>{SingleProduct.quantity}</td>
            <td>
              
              <button className="btn btn-danger" onClick={() => onRemoveProduct(SingleProduct)}>Remove</button>
            </td>
          </tr>
            )
         }

          
         
        </tbody>
      </table>
      <div className="row align-items-center">
        <div className="col">
          <h3>Total: ${ calculateTotalItemsPrice() }</h3>
        </div>
        <div className="col text-end">
          
          <button className="btn btn-success" onClick={goToCheckOutPage}>Checkout</button>
        </div>
      </div>
    </div>
  
    
    <div id="empty-cart-message">
      {
        cartItems.length > 0 ? null : 
        <p>Your cart is empty.</p>
      }
      
    </div>
  </div>
  
  </>
}

export default Cart