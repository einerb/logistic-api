# API de Gestión de Envíos

📦 API para el gestionamiento de envíos, permitiendo la administración de órdenes de envío, asignación de rutas, transportistas y vehículos.

## 🚀 Instalación y Ejecución

Puedes ejecutar este proyecto de dos formas:

### 1️⃣ Instalación Manual (Sin Docker)

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/einerb/logistic-api.git
   cd logistic-api
   ```

2. **Instalar dependencias:**
   ```bash
   yarn install
   ```

3. **Configurar variables de entorno:**
   - Copiar el archivo de ejemplo:
     ```bash
     cp .env.example .env
     ```
   - Editar `.env` con las configuraciones necesarias (base de datos, API keys, etc.).

4. **Ejecutar migraciones y semillas (si aplica):**
   ```bash
   npm run migrate
   ```

5. **Levantar el servidor:**
   ```bash
   npm run dev
   ```
   La API estará corriendo en `http://localhost:3002`

---

### 2️⃣ Usando Docker 🐳

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/einerb/logistic-api.git
   cd logistic-api
   ```

2. **Levantar los contenedores:**
   ```bash
   docker compose up --build -d
   ```
   Esto levantará la API junto con su base de datos.

3. **Verificar que todo esté corriendo:**
   ```bash
   docker ps
   ```

4. **Acceder a la API en:**
   ```
   http://localhost:3002
   ```

---

## 📖 Documentación Swagger

Puedes acceder a la documentación de la API en:
```
http://localhost:3002/api/docs
```
Aquí encontrarás todos los endpoints disponibles, parámetros y respuestas.

---

## 🛠 Tecnologías Utilizadas

- **Node.js** con **TypeScript**
- **Express.js** como framework backend
- **PostgreSQL** como base de datos
- **Docker** para contenerización
- **Redis** para almacenamiento en caché
- **Swagger** para documentación de API
- **Mapbox** para cálculo de rutas

---

## 🏗 Arquitectura

El proyecto sigue la **Arquitectura Limpia (Clean Architecture)** con la separación en capas:
- **Domain:** Entidades y lógica de negocio.
- **Application:** Casos de uso y servicios.
- **Infrastructure:** Repositorios y conexión con bases de datos.
- **Config:** Configuración de Swagger y otras herramientas.

---

## 📫 Contacto
Si tienes dudas o sugerencias, puedes contactarme en:
📧 [einerbravo@gmail.com](mailto:einerbravo@gmail.com)

