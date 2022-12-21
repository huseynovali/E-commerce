import React from 'react'
import { Product } from '../product/Product'

const Products = ({AllProducts,AddProductToCart}) => {
  return (
    <>
    {
      AllProducts ?
         <div className='px-3 min-w-[250px] mt-5'>
        <div className="into grid lg:grid-cols-4 sm:grid-cols-2 gap-5 max-w-[1400px] m-auto  py-3 ">
           {
            AllProducts.map(product=>{
              return(
               <Product product={product} AddProductToCart={AddProductToCart}/>
              )  
            })
           }
        </div>
    </div>
    :
    <p>Loading...</p>
    }
    </>
 
  )
}

export default Products