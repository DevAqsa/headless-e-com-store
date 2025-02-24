import { useNavigate } from 'react-router-dom'
import washMachine from '../../public/washing-machine-2.jpg'
function Products() {
    const navigate = useNavigate()
    const handleSingleProductDetailsRedirection = (productId) => {
        // Redirect to the single product details page
        navigate(`/product/${productId}`)
    }
  return <>
  <div className="container">
    <h1 className="my-4">Products</h1>
    <div className="row">
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card product-card">
          <img className="card-img-top" src={washMachine} alt="Product Name" />
          <div className="card-body">
            <h5 className="card-title" style={{cursor: "pointer"}} onClick={() => handleSingleProductDetailsRedirection(100)}>
              Product Name
            </h5>
            <p className="card-text">$99.99</p>
            <p className="card-text">This is a short description of the product.</p>
            <p className="card-text">Category: Category 1, Category 2</p>
            <button className="btn btn-primary" >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card product-card">
          <img className="card-img-top" src={washMachine} alt="Product Name" />
          <div className="card-body">
            <h5 className="card-title" style={{cursor: "pointer"}} onClick={() => handleSingleProductDetailsRedirection(101)}>
              Product Name
            </h5>
            <p className="card-text">$99.99</p>
            <p className="card-text">This is a short description of the product.</p>
            <p className="card-text">Category: Category 1, Category 2</p>
            <button className="btn btn-primary" >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      

    </div>
  </div>
  </>
}

export default Products