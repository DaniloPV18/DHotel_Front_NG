# Fase de construcción: Usa una imagen de Node.js para construir la aplicación Angular
FROM node:18.13 as build-step

WORKDIR /app

# Copia los archivos de configuración y instala las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Fase de ejecución: Usa una imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copia la aplicación construida desde la fase de construcción al servidor Nginx
COPY --from=build-step /app/dist/* /usr/share/nginx/html/

# Expon el puerto 4200
EXPOSE 4200

# Inicia Nginx y sirve la aplicación
CMD ["nginx", "-g", "daemon off;"]
