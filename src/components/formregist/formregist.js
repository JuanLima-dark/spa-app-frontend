import { useState } from "react";
import './formregist.css';

function Formregistro({ onLoginClick, cerrarform }) {
  const [formRegis, setFormRegis] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormRegis(prev => ({
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
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formRegis),
      });

      const data = await response.json();

      if (data.sucess) { 
        // ✅ IMPORTANTE: Guardar usuario automáticamente después del registro
        localStorage.setItem('usuario', JSON.stringify({
          nombre: formRegis.name,
          email: formRegis.email,
          id: data.data?.userId || data.data?.user?._id
        }));

        // Guardar token si viene
        if (data.data?.token) {
          localStorage.setItem('token', data.data.token);
        }

        // Cerrar formulario
        cerrarform();

        // Recargar página para actualizar el Header
        window.location.reload();

      } else {
        // Mostrar error del servidor
        setError(data.message || 'Error al registrarse');
      }

    } catch (error) {
      console.error('Error en registro:', error);
      setError('Error al registrarse. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={cerrarform}>
      <form
        onSubmit={handlesubmit}
        className="foregister"
        onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer click en el formulario
      >
        <h2
          type="button"
          onClick={cerrarform}
          className="closebtn"
          aria-label="Cerrar"
        >
          ✕
        </h2>

        <h2 className="ft">¡Únete a nosotros!</h2>
        <p className="subtitle">Crea tu cuenta gratis</p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input
            id="name"
            onChange={handlechange}
            className="btncolor"
            name="name"
            value={formRegis.name}
            type="text"
            placeholder="Tu nombre"
            maxLength={50}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            onChange={handlechange}
            className="btncolor"
            name="email"
            value={formRegis.email}
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
            name="password"
            value={formRegis.password}
            type="password"
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            maxLength={20}
            minLength={6}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        <div className="form-footer">
          <p>¿Ya tienes cuenta?</p>
          <a
            href="#iniciar-sesion"
            onClick={(e) => {
              e.preventDefault();
              onLoginClick();
            }}
          >
            Inicia sesión aquí
          </a>
        </div>
      </form>
    </div>
  );
}

export default Formregistro;