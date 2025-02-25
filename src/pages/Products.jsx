/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import  {getAllProducts}  from '../Api.js'

function Products({setPageLoading, onAddToCart}) {

    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    const handleSingleProductDetailsRedirection = (productId) => {
        // Redirect to the single product details page
        navigate(`/product/${productId}`)
    }

    useEffect(() => {
        // Fetch all products from the WooCommerce store
        const fetchProducts = async () => {
            setPageLoading(true)
            const data = await getAllProducts()
            setProducts(data)

            console.log(data)

            setPageLoading(false)
        }

        fetchProducts()
    }, [])


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

  return <>
  <div className="container">
    <h1 className="my-4">Products</h1>
    <div className="row">

      {
        products.map((singleproduct, index) => (
<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
        <div className="card product-card">
          <img className="card-img-top" src={singleproduct?.images[0]?.src} alt={singleproduct.name} />
          <div className="card-body">
            <h5 className="card-title" style={{cursor: "pointer"}} onClick={() => handleSingleProductDetailsRedirection(singleproduct.id)}>
            {singleproduct.name}
            </h5>
            <p className="card-text">{renderProductPrice (singleproduct)}</p>
            <p className="card-text" dangerouslySetInnerHTML={{
              __html: singleproduct.short_description
            }}></p>
            <p className="card-text">Category:{singleproduct?.categories.map((category)=> category.name).join(",")}</p>
            <button className="btn btn-primary" onClick={() => onAddToCart(singleproduct)} >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
        ))
      }

    </div>
  </div>
  </>
}

export default Products