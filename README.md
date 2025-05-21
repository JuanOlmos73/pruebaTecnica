
🛠️ Sistema de Administración de Inventario
Este proyecto es una aplicación full stack para gestionar el inventario de un almacén. Está compuesto por un frontend en Angular 18, un backend en Java con Spring Boot 3.4.5, y una base de datos PostgreSQL 17.

🧰 Tecnologías utilizadas
Herramienta	Versión
💻 IDE	Visual Studio Code
🌐 Framework Frontend	Angular 18
☕ Lenguaje Backend	Java 17
🔧 Framework Backend	Spring Boot 3.4.5
🐘 Base de Datos	PostgreSQL 17
📦 Gestor de dependencias	Maven

📦 Estructura del Proyecto
inventario-app/
│
├── frontend/              # Proyecto Angular
│   └── ...
│
├── backend/               # Proyecto Spring Boot
│   └── ...
│
└── README.md
🚀 Pasos para correr la aplicación
🧾 Requisitos Previos
Tener instalado:
Node.js (v18+)
Angular CLI
Java JDK 17
Apache Maven
PostgreSQL 17
(Opcional) pgAdmin para gestionar la base de datos.

1. 📁 Clonar el repositorio
bash
Copiar
Editar
git clone https://github.com/tu-usuario/inventario-app.git
cd inventario-app
2. 🐘 Configurar la base de datos
Crear una base de datos en PostgreSQL:

sql
Copiar
Editar
CREATE DATABASE inventario;
Crear las tablas necesarias. (Puedes ejecutar los scripts proporcionados).

Configura tu usuario y contraseña en application.properties del backend:
properties
Copiar
Editar
spring.datasource.url=jdbc:postgresql://localhost:5432/inventario
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
3. ⚙️ Ejecutar el backend (Spring Boot)
bash
Copiar
Editar
cd backend
mvn clean install
mvn spring-boot:run
El backend arrancará en: http://localhost:8080

4. 🖥️ Ejecutar el frontend (Angular)
bash
Copiar
Editar
cd frontend
npm install
ng serve
El frontend arrancará en: http://localhost:4200

🔐 Acceso a la aplicación
El sistema cuenta con autenticación JWT.
Puedes registrar usuarios en la base de datos manualmente.

🧑‍💻 Autor
Desarrollado por [Juan Luis Olmos Silva]
✉️ Contacto: [olmos.silva18@gmail.com]
