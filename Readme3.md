# Frontend - Mi Aplicación

SPA (Single Page Application) desarrollada con React.

Este frontend consume una API REST construida con Node.js, Express y MongoDB.  
Implementa autenticación basada en tokens (JWT).

---

##  Tecnologías

- React
- Vite (o Create React App)
- JavaScript
- CSS
- Fetch / Axios

---

##  Conexión con Backend

El frontend se comunica con el backend mediante peticiones HTTP.

La autenticación se maneja mediante JSON Web Token (JWT).

Después de iniciar sesión:
- El backend genera un token.
- El frontend almacena el token.
- El token se envía en las solicitudes protegidas.

Ejemplo de petición autenticada:

fetch("https://tu-backend.onrender.com/endpoint", {
  headers: {
    Authorization: `Bearer TOKEN`
  }
})

---

## ⚠ Características del proyecto

Este es un modelo simplificado que:

- Permite autenticación de usuarios
- Permite visualizar productos
- Permite realizar compras básicas
- No incluye sistema avanzado de roles
- No incluye pasarela de pago real

---

##  Instalación

Clonar el repositorio:

git clone URL_DEL_REPOSITORIO

Entrar a la carpeta del proyecto:

cd nombre-del-frontend

Instalar dependencias:

npm install

---

##  Ejecutar en desarrollo

npm run dev

(o npm start si usas Create React App)

---

##  Construcción para producción

npm run build

---

##  Estructura del proyecto

src/
 ├── components/
 ├── pages/
 ├── services/
 ├── App.jsx
 └── main.jsx