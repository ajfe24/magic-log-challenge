# Utilizar la imagen oficial de Node.js
FROM node:16

# Crear el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos del proyecto al contenedor
COPY package.json package-lock.json ./
COPY app.js ./
COPY api/ ./api/

# Instalar las dependencias del proyecto
RUN npm install

# Exponer el puerto en el que se ejecuta la API
EXPOSE 8099

# Comando para iniciar la aplicación dentro del contenedor
CMD ["node", "app.js"]
