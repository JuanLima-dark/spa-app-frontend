import React from 'react';
import './ProductSection.css';
import ProductCard from '../../common/ProductCard';
import { productsData } from '../../data/products';

function ProductSection({ onAddCart,onRemoveCart, carrito }) {

  return (
    <section className="products-section" id="productos">
      <h2 className="section-title">Productos Destacados</h2>
      <div className="products-grid">
        {productsData.map((product, index) => (
          <ProductCard 
            key={index}
            product={product}
            onAddCart={onAddCart}
            onRemoveCart={onRemoveCart}
            carrito={carrito}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
