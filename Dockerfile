############################
# Etapa 1: Build
############################
FROM node:18-alpine AS builder

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir versión optimizada
RUN npm run build



############################
# Etapa 2: Producción (Nginx)
############################
FROM nginx:alpine

# Copiar archivos build al servidor nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Nginx ya trae el comando por defecto
CMD ["nginx", "-g", "daemon off;"]