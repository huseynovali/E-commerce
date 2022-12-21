import React from 'react'

export const Product = ({product,AddProductToCart}) => {
  return (
    <div className='shadow-lg p-2 relative pb-16'>
    <div className="product__photo  border-b">
        <img src={product.image.url} alt={product.name} className="h-52 w-full" />
    </div>
    <div className="product__info p-2 ">
       <h2 className='text-lg font-bold py-1'>{product.name}</h2> 
       <p className='' dangerouslySetInnerHTML={{__html:product.description}}></p>
       
    </div>
    <div className="add__btn absolute bottom-2 right-2 p-3">
        <button className='button p-2 bg-blue-500  rounded-md text-white' onClick={()=>AddProductToCart(product.id,1)}>Add Cart</button>
    </div>
    
</div>
  )
}
