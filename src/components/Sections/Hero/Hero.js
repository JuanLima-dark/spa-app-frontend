import React from 'react';
import './Hero.css';

function Hero() {
  const handleExploreClick = () => {
    const productosSection = document.getElementById('productos');
    if (productosSection) {
      productosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <h1>Bienvenido a XIRUSTORE</h1>
      <p>
        Descubre los mejores productos con la calidad que mereces. 
        Ofertas exclusivas y envío gratis en compras mayores a $50.
      </p>
      <button className="btn-primary" onClick={handleExploreClick}>
        Explorar Productos
      </button>
    </section>
  );
}

export default Hero;