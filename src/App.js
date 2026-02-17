import  React ,{useState} from 'react';
import './index.css'
import Header from './components/layout/Header';
import Cartcard from './components/Cartcard'
import Navigation from './components/layout/Navigation/';
import Hero from './components/Sections/Hero';
import ProductSection from './components/Sections/ProductSection';
import Footer from './components/layout/Footer';
import Formsesion from './components/formsesion/formsesion'
import Formregist from './components/formregist/formregist'


function App() {
  //const [cartCount, setCartCount] = useState(0);
  const [mostrarForm, setmostrarForm] = useState(false);
  const [tipoForm , settipoForm] = useState('login')
  const [carrito, setcarrito] = useState([]);
  const [carritovisible, setCarritovisible] = useState(false);
  const [pagina , setPagina]= useState('home')

  /*const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };*/

  /*const handleremoveFromCart = () => {
    setCartCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };*/

  const abrirLogin = () => {
    settipoForm('login')
    setmostrarForm(true);
  };
  const abrirRegister = () => {
    settipoForm('register')
    setmostrarForm(true);
  };
  const cerrarform =()=>{
    setmostrarForm(false)
  }

  const toggleCarrito = () => {
    setCarritovisible(!carritovisible);
  };

  const AgregarAlcarrito = (producto) => {
    
    
    const productoexiste = carrito.find(item => item.id === producto.id);
    if (productoexiste) {
      setcarrito(carrito.map(item => item.id === producto.id ? { ...item, quality: item.quality + 2 } : item));
    } else {
      setcarrito([...carrito, { ...producto, quality: 1 }]);
    }
    
    setCarritovisible(true); // 
  };

  
  const removeDelcarrito = (producto) => {
    setcarrito(carrito.filter(item => item.id !== producto.id));
  };

  return (
    <div className="container">
      
      {mostrarForm ? (
        tipoForm === 'login'?(
        <Formsesion cerrarform={cerrarform} onRegisterClick={abrirRegister} />
      ) : (
        <Formregist cerrarform={cerrarform} onLoginClick={abrirLogin} />
      )
       ):( 
       
        <>
         
          <Header cartCount={carrito.length} onLoginClick={abrirLogin} onRegisterClick={abrirRegister} toggleCarrito={toggleCarrito} onAddCart={AgregarAlcarrito}/>
          
          <Cartcard carrito={carrito} cerrarCarrito={toggleCarrito} mostrar={carritovisible} />
          {carritovisible && (<div className='overlay' onClick={toggleCarrito}></div>)}
          
          <Navigation setPagina={setPagina}/>
          
          <main>
          {pagina === 'home'&& <div><Hero/>
          <ProductSection onAddCart={AgregarAlcarrito} onRemoveCart={removeDelcarrito}/>
          </div> }
          {pagina === 'inicio'&& <div><Hero/><h1>******</h1><ProductSection onAddCart={AgregarAlcarrito} onRemoveCart={removeDelcarrito}/></div> }

          {pagina === 'novedades'&& <div><h1>Novedades</h1></div> }
          {pagina === 'promociones'&& <div><h1>Promociones</h1></div> }
          {pagina === 'blog'&& <div><h1>Blog</h1></div> }


          {pagina === 'nosotros'&& <div><h1>Nosotros</h1></div> }

          {pagina === 'nuestra historia'&& <div><h1>Nuestra historia</h1></div> }
          {pagina === 'objetvos'&& <div><h1>Objetivos</h1></div> }
          {pagina === 'valores y filosofia'&& <div><h1>Valores y Filosofia</h1></div> }
          {pagina === 'porque elegirnos'&& <div><h1>Porque Elegirnos</h1></div> }



          {pagina === 'servicios'&& <div><h1>Servicios</h1></div> }

          {pagina === 'reparaciones'&& <div><h1>Reparaciones</h1></div> }
          {pagina === 'mantenimiento'&& <div><h1>Mantenimiento</h1></div> }
          {pagina === 'cambio de piezas'&& <div><h1>Cambio de piezas</h1></div> }
          {pagina === 'instalacion de windows'&& <div><h1>Instalacion de Windows</h1></div> }
          {pagina === 'formateo y respaldo'&& <div><h1>Formateo y Respaldo</h1></div> }

          {pagina === 'productos'&& <div><h1>Productos</h1></div> }

          
          {pagina === 'contacto'&& <div><h1>Contacto</h1></div> }
          {pagina === 'whatssap' && <div><h1>Whatssap</h1></div>}
          
          
          </main>
          <Footer />
        </>
      )}
    </div>
    
  );
}

export default App;

