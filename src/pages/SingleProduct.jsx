import { useParams } from 'react-router-dom'
import productImage from '../../public/washing-machine-2.jpg'
function SingleProduct() {
    const { id } = useParams()
  return <>
  <div className="container my-5">
    <div className="row">
      {/* <!-- Product Image Section --> */}
      <div className="col-md-6">
        <div className="card">
          <img className="card-img-top" src={productImage} alt="Product Name" />
        </div>
      </div>
      {/* <!-- Product Details Section --> */}
      <div className="col-md-6">
        <h1 className="my-4">Product Name- {id}</h1>
        <div className="mb-4">
          <p>This is a detailed description of the product. It might include features, specifications, and other important information.</p>
        </div>
        <div className="mb-4">
          <h5>Price:</h5>
          $99.99
        </div>
        <div className="mb-4">
          <h5>Category: Category 1, Category 2</h5>
        </div>
        <button className="btn btn-primary mt-4" >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  </>
}

export default SingleProduct