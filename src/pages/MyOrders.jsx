/* eslint-disable react/prop-types */
import { useState } from "react"
import { getOrdersByUserId } from "../Api"
import { useEffect } from "react"

function Myorders({LoggedInUserData}) {

const [showDetailModal, setShowDetailModal] = useState(false)
const [orderItems, setOrderItems] = useState([])

const fetchAllOrders = async() => {

  try{

    const userdata = JSON.parse(localStorage.getItem(LoggedInUserData))

    const response = await getOrdersByUserId(userdata.id)
    console.log(response)
    setOrderItems(response)
    

    // localStorage.setItem("orderItems", JSON.stringify(response))
  } catch(error){

    console.log(error)
  } 
}

useEffect( () => {

  fetchAllOrders()

}, [])

  return <>
  <div className="container">
    <h1>My Orders</h1>
    <button className="btn btn-primary mb-3 float-end">
      Refresh Orders
    </button>
    <div id="orders-container">
      <p>No orders found.</p> 
  
     
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date(M/D/Y)</th>
            <th>Status</th>
            <th>Total</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="orders-list">

          {
            orderItems.map((singleOrder) => (
              <tr key={singleOrder.id}>
            <td>{ singleOrder.id }</td>
            <td> {new Date(singleOrder.date_created).toLocaleDateString() }</td>
            <td>{ singleOrder.status.charAt(0).toUpperCase() + singleOrder.status.slice(1) }</td>
            <td>{ singleOrder.currency_symbol } { singleOrder.total }</td>
            <td>
              <ul>
              {
                  singleOrder.line_items.map( (item) => ( <li key={ item.id }>{item.name} ({item.quantity})</li> ) )
                }
                
              </ul>
            </td>
            <td>
              <button className="btn btn-info me-2" onClick={() => setShowDetailModal(true)}>View</button>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
       
            ))
          }
          
        </tbody>
      </table>
    </div>
  
  
  {
    showDetailModal && (
        <div id="order-details-modal" className="modal show d-block" style={{display: "none"}} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Details</h5>
              <button type="button" className="btn-close" ></button>
            </div>
            <div className="modal-body">
              <p><strong>Order ID:</strong> 12345</p>
              <p><strong>Date:</strong> 12/30/2024</p>
              <p><strong>Status:</strong> Completed</p>
              <p><strong>Total:</strong> $50.00</p>
              <p><strong>Items:</strong></p>
              <ul>
                <li>Item 1 (x2)</li>
                <li>Item 2 (x1)</li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

   
  </div>
  </>
}

export default Myorders