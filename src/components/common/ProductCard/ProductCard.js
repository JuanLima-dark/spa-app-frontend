import React, { useState , } from 'react';
import './ProductCard.css';



function ProductCard({ product, onAddCart,onRemoveCart }) {
  const[isAdded, setisAdded] =useState(false)
  
   


   const handleToggleCart = (e) => {
    e.preventDefault();
    if (isAdded) {
      onRemoveCart(product); // 🔽 resta
      setisAdded(false)
    } else {
      onAddCart(product); // 🔼 suma
      setisAdded(true)
    
    }
  };

  return (
    
    <div className="product-card">
      <div className="product-image">
        <img src={`${product.image}`} alt={product.name} />
      </div>
      <div className="product-name">{product.name}</div>
      
      <div className="product-price">${product.price}</div>
      <div className="product-description">{product.description}</div>
      <button 
        className="btnc" 
        onClick={handleToggleCart}
        style={isAdded ? { backgroundColor: 'rgba(28, 221, 35, 0.66)' } : {}}
      >
        {isAdded ? '✓ Agregado' : 'Agregar al Carrito'}
      </button>
    </div>
  );
}

export default ProductCard;
