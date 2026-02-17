
import React from 'react';
import './Cardcart.css';

function Cartcard({ carrito = [], cerrarCarrito, mostrar }) {
  
  
  // Calcular el total
  const total = carrito.reduce(
    (acc, item) => {
      const subtotal = (item.price || 0) * (item.quantity || 1);
      
      return acc + subtotal;
    },
    0
  );

  

  const handleComprar = () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    alert(`¡Compra realizada por $${total}!`)
    cerrarCarrito();
  };

  return (
    <aside className={`carrito-panel ${mostrar ? 'mostrar' : ''}`}>
      <div className="carrito-header">
        <h2>Tu carrito</h2>
        <button className="btn-cerrar-header" onClick={cerrarCarrito}>
          ✕
        </button>
      </div>

      <div className="carrito-contenido">
        {carrito.length === 0 ? (
          <p className="carrito-vacio">Carrito vacío</p>
        ) : (
          carrito.map((item) => (
            <div key={item.id} className="carrito-item">
              <img src={item.image} alt={item.name} width="80" />
              <div className="item-info">
                <p className="item-nombre"><strong>{item.name}</strong></p>
                <p className="item-precio">Precio: ${item.price}</p>
                <p className="item-cantidad">Cantidad: {item.quantity}</p>
                <p className="item-subtotal">
                  <strong>Subtotal: ${(item.price * item.quantity).toFixed(2)}</strong>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="carrito-footer">
        <h3>Total: ${total.toFixed(2)}</h3>
        <div className="botones-footer">
          {carrito.length > 0 ? (
            <>
              <button className="btn-comprar" onClick={handleComprar}>
                Comprar
              </button>
              <button className="btn-seguir" onClick={cerrarCarrito}>
                Seguir Comprando
              </button>
            </>
          ) : (
            <button className="btn-cerrar" onClick={cerrarCarrito}>
              Cerrar
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Cartcard;