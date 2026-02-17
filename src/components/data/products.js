import laptop from './../../assets/imagenes/laptop.jpg'
import airpords from './../../assets/imagenes/airpords.webp'
import smartphone from './../../assets/imagenes/Snapdragon-8-gen3.webp'
import playstation5 from './../../assets/imagenes/playstation5.webp'
import camera from './../../assets/imagenes/camera.webp'
import monitor from './../../assets/imagenes/monitor.webp'
import reloj from './../../assets/imagenes/smartwacht.webp'
import gafas from './../../assets/imagenes/gafas-apple.webp'




export const productsData = [
  {
    id:1,
    name: 'Smartphone Pro',
    price: 599.99,
    description: 'Última generación con cámara de 48MP y batería de larga duración.',
    image: smartphone
  },
  {
    id:2,
    name: 'Laptop Ultra',
    price: 1299.99,
    description: 'Procesador de última generación, 16GB RAM, ideal para trabajo y gaming.',
    image: laptop
  },
  {
    id:3,
    name: 'Airpods 2 generacion',
    price: 149.99,
    description: 'Cancelación de ruido activa y sonido premium de alta fidelidad.',
    image: airpords
  },
  {
    id:4,
    name: 'Smartwatch Fit',
    price: 249.99,
    description: 'Monitor de salud 24/7, GPS integrado y resistente al agua.',
    image: reloj
  },
  {
    id:5,
    name: 'Cámara parasonic-lumix',
    price: 899.99,
    description: 'Sensor de 24MP, grabación 4K y estabilización profesional.',
    image: camera
  },
  {
    id:6,
    name: 'Playstation 5',
    price: 399.99,
    description: 'Nueva generación con gráficos 4K y carga ultrarrápida.',
    image: playstation5
  },
  {
    id:7,
    name: 'Monitor Gamers',
    price: 499.99,
    description: 'Imagina un monitor diseñado para sumergirte por completo en tus partidas: una pantalla de 27 pulgadas con resolución QHD (2560x1440) que ofrece imágenes nítidas y colores vibrantes gracias a su panel IPS. Su tasa de refresco de 165 Hz y tiempo de respuesta de 1 ms garantizan movimientos fluidos y sin desenfoques, ideal para juegos competitivos.',
    image: monitor
  },

  {
    id:8,
    name: 'Gafas de realidad virtual',
    price: 699.99,
    description: ' "Las gafas de realidad virtual te sumergen en mundos digitales con una experiencia inmersiva y envolvente.',
    image: gafas
  }
];

export default productsData