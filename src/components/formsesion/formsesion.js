import { useState } from "react";
import './fromsesion.css';

function Formsesion({ onRegisterClick, cerrarform }) {
  const [formsesi, setformsesi] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformsesi(prev => ({
      ...prev,
      [name]: value.trim()
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch("https://mi-app-backend-1-lfrs.onrender.com", {
        method: 'POST',
        headers: {
         
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify(formsesi),
      });

      const data = await response.json();

      if (data.sucess === true) { 
        // Guardar token
        localStorage.setItem('token', data.data.token);
        
        //  IMPORTANTE: Guardar usuario con el formato correcto para el Header
        localStorage.setItem('usuario', JSON.stringify({
          nombre: data.data.user.name || data.data.user.nombre,
          email: data.data.user.email,
          id: data.data.user._id || data.data.user.id
        }));

        // Cerrar formulario
        cerrarform();
        
        // Recargar página para actualizar el Header
        window.location.reload();
        
      } else {
        // Mostrar error del servidor
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={cerrarform}>
      <form 
        onSubmit={handlesubmit} 
        className="forlogin"
        onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer click en el formulario
      >
        <h2
          type="button"
          className="closebtn" 
          onClick={cerrarform}
          aria-label="Cerrar"
        >
          ✕
        </h2>

        <h2 className="ft">¡Bienvenido de nuevo!</h2>
        <p className="subtitle">Accede a tu cuenta</p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Gmail</label>
          <input
            id="email"
            onChange={handlechange}
            className="btncolor"
            value={formsesi.email}
            name="email"
            type="email"
            placeholder="tu@email.com"
            autoComplete="email"
            maxLength={50}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            onChange={handlechange}
            className="btncolor"
            value={formsesi.password}
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Tu contraseña"
            maxLength={12}
            required
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="btn-submit"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>

        <div className="form-footer">
          <p>¿No tienes cuenta?</p>
          <a 
            href="#registrate" 
            onClick={(e) => {
              e.preventDefault();
              onRegisterClick();
            }}
          >
            Regístrate aquí
          </a>
        </div>
      </form>
    </div>
  );
}

export default Formsesion;