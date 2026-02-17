import { useState, useEffect, useRef } from "react";
import './Header.css';
import produData from '../../data/products';

function Header({ cartCount, onLoginClick, toggleCarrito, onRegisterClick }) {
  const [VerConfiguracionMenu, setVerConfiguracionMenu] = useState(false);
  const [VerMenuUsuario, setVerMenuUsuario] = useState(false);
  const [usuario, setUsuario] = useState(null); 
  const menuRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleConfiguracionMenu = () => {
    setVerConfiguracionMenu(!VerConfiguracionMenu);
    setVerMenuUsuario(false);
  };

  const toggleVerMenuUsuario = () => {
    setVerMenuUsuario(!VerMenuUsuario);
    setVerConfiguracionMenu(false);
  };

  const handlesearchSubmit = (e) => {
    e.preventDefault();
  };

  
  useEffect(() => {
    if (searchTerm.length < 3) {
      const productoEncontrado = produData.filter(p => {
        return p.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
      });
      setProducts(productoEncontrado);
      setShowResults(true);
      setLoading(false);
      return; 
    }

    const searchTimeout = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/search?q=${encodeURIComponent(searchTerm)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();

        if (data.sucess) { 
          if (data.data && data.data.products) {
            setProducts(data.data.products);
            setShowResults(true);
          } else {
            setProducts([]);
            setShowResults(true);
          }
        }
      } catch (error) {
        console.error('Error en búsqueda:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // useEffect para verificar usuario guardado
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error('Error al parsear usuario:', error);
      }
    }
  }, []);

  // useEffect para cerrar menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setVerMenuUsuario(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    setUsuario(null);
    setVerMenuUsuario(false); 
    window.location.reload(); 
  };

  const getInicial = () => {
    if (usuario && usuario.nombre) { 
      return usuario.nombre.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <header>
      <div className="logo" onClick={() => window.location.reload()} style={{ cursor: "pointer" }}>
        XIRUSTORE
      </div>

      <div className="header-actions">
        <div className="search-box search-container">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <form onSubmit={handlesearchSubmit}>
            <input
              type="text"
              placeholder="Buscar productos..."
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </form>

          {showResults && (
            <section className="search-results-section">
              <div className="search-results-header">
                <h2>Resultados para: "{searchTerm}"</h2>
                <button
                  className="close-search"
                  onClick={() => {
                    setSearchTerm('');
                    setShowResults(false);
                    setProducts([]);
                  }}
                >
                  X Cerrar
                </button>
              </div>

              {loading && <p className="loading">Buscando...</p>}

              {!loading && products?.length > 0 && (
                <div>
                  {products.map((product, index) => (
                    <div
                      key={product._id || index}
                      className="result-card"
                      onClick={() => {
                        setShowResults(false);
                      }}
                    >
                      <img src={product.image || '/placeholder.jpg'} alt={product.name} />
                      <div style={{ flex: 1 }}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <div className="price">{product.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && products.length === 0 && searchTerm.length >= 3 && (
                <p className="no-results">No se encontraron productos</p>
              )}
            </section>
          )}
        </div>

        {/* Settings Button */}
        <button
          className="icon-btn"
          title="Configuración"
          onClick={toggleConfiguracionMenu}
        >
          <svg className="settings-icon" viewBox="0 0 24 24">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {VerConfiguracionMenu && (
            <ul className="submenu active">
              <li><a href="#ajustes">Ajustes</a></li>
              
            </ul>
          )}
        </button>

        {/* Cart Button */}
        <button onClick={toggleCarrito} className="icon-btn" title="Carrito" style={{ position: 'relative' }}>
          <svg className="cart-icon" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span id="caradd" style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#ff4444',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px'
          }}>
            {cartCount}
          </span>
        </button>

        {/* User Avatar */}
        <div
          className="user-avatar"
          title="Perfil"
          onClick={toggleVerMenuUsuario}
          ref={menuRef}
        >
          {/* Mostrar inicial del usuario o 'U' */}
          <span style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            textTransform: 'uppercase'
          }}>
            {getInicial()}
          </span>

          {VerMenuUsuario && (
            <ul className="submenu active">
              {usuario ? (
                // Menú cuando está logueado
                <>
                  <li style={{
                    padding: '15px 20px',
                    fontWeight: 'bold',
                    color: '#667eea',
                    borderBottom: '2px solid #f0f0f0',
                    cursor: 'default'
                  }}>
                    {usuario.nombre}
                  </li>
                  <li><a href="/perfil">Mi Perfil</a></li>
                  <li><a href="/pedidos">Mis Pedidos</a></li>
                  <li><a href="/favoritos">Favoritos</a></li>
                  <li>
                    <a
                      href="#cerrar"
                      onClick={(e) => {
                        e.preventDefault();
                        cerrarSesion();
                      }}
                    >
                      Cerrar sesión
                    </a>
                  </li>
                </>
              ) : (
                // Menú cuando NO está logueado
                <>
                  <li style={{
                    padding: '15px 20px',
                    fontWeight: 'bold',
                    color: '#667eea',
                    borderBottom: '2px solid #f0f0f0',
                    cursor: 'default'
                  }}>
                    Usuario
                  </li>
                  <li>
                    <a
                      href="#registrate"
                      onClick={(e) => {
                        e.preventDefault();
                        setVerMenuUsuario(false);
                        onRegisterClick();
                      }}
                    >
                      Regístrate
                    </a>
                  </li>
                  <li>
                    <a
                      href="#iniciar"
                      onClick={(e) => {
                        e.preventDefault();
                        setVerMenuUsuario(false);
                        onLoginClick();
                      }}
                    >
                      Iniciar sesión
                    </a>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;