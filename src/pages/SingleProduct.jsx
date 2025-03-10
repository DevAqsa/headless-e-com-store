/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom'

import { useState, useEffect } from 'react'
import { getSingleProductData } from '../Api'

function SingleProduct({setPageLoading, onAddToCart}) {
    const { id } = useParams()

    const [singleProduct, setSingleProduct] = useState({})

    useEffect(() => {
        // Fetch single product details from the WooCommerce store
        const fetchSingleProduct = async () => {
          setPageLoading(true)
            const data = await getSingleProductData(id)
            setSingleProduct(data)

            setPageLoading(false)
        }
       
        fetchSingleProduct()
    }, [id])

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
  <div className="container my-5">
    <div className="row">
      {/* <!-- Product Image Section --> */}
      <div className="col-md-6">
        <div className="card">
          <img className="card-img-top" src={singleProduct?.images?.[0]?.src} alt="Product Name" />
        </div>
      </div>
      {/* <!-- Product Details Section --> */}
      <div className="col-md-6">
        <h1 className="my-4">{singleProduct.name}</h1>
        <div className="mb-4" dangerouslySetInnerHTML={{
          __html: singleProduct.description
        }}>
         
        </div>
        <div className="mb-4">
          <h5>Price:</h5>
         {renderProductPrice(singleProduct)}
        </div>
        <div className="mb-4">
          <h5>Category: {singleProduct?.categories?.map((singleCategory) => singleCategory.name).join(",")}</h5>
        </div>
        <button className="btn btn-primary mt-4" onClick={() => onAddToCart(singleProduct)}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  </>
}

export default SingleProduct