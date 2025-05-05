# Job Platform - Backend (API)

[![NestJS](https://img.shields.io/badge/Framework-NestJS-red.svg)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-blue.svg)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)

## Resumen

Este directorio contiene el backend de la aplicación Job Platform. Es una API RESTful construida con NestJS que maneja la lógica de negocio, la interacción con la base de datos y la autenticación/autorización.

## Tecnologías Utilizadas

*   **Framework:** [NestJS](https://nestjs.com/)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
*   **ORM:** [Prisma](https://www.prisma.io/) (con PostgreSQL)
*   **Base de Datos:** [PostgreSQL](https://www.postgresql.org/)
*   **Autenticación:** JWT (JSON Web Token) (usando `@nestjs/jwt`)
*   **Validación:** `class-validator`, `class-transformer`
*   **Manejo de Contraseñas:** `bcryptjs`
*   **Documentación API:** Swagger (`@nestjs/swagger`)
*   **Gestor de Paquetes:** npm o yarn

## Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el backend localmente:

1.  **Clonar el Repositorio (si aún no lo has hecho):**
    ```bash
    git clone https://github.com/jorgechvz/job-platform.git
    cd job-platform/backend
    ```

2.  **Instalar Dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Configurar Base de Datos:**
    *   Asegúrate de tener PostgreSQL instalado y corriendo.
    *   Crea una base de datos para el proyecto (ej: `job_platform_db`).

4.  **Configurar Variables de Entorno:**
    *   Crea un archivo `.env` en el directorio `backend`.
    *   Copia el contenido de un posible `.env.example` (si existe) o añade las siguientes variables:
        ```env
        # Base de Datos (Ajusta según tu configuración)
        DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database_name>?schema=public"

        # JWT Secret (Usa una cadena segura y larga)
        JWT_SECRET="TU_SUPER_SECRETO_JWT"
        JWT_EXPIRATION_TIME="3600s" # Ejemplo: 1 hora

        # Puerto de la aplicación (Opcional, por defecto 3000)
        # PORT=3000
        ```
    *   Reemplaza los placeholders `<...>` con tus credenciales y configuración.

5.  **Aplicar Migraciones de Prisma:**
    *   Esto creará las tablas en tu base de datos según el esquema definido.
    ```bash
    npx prisma migrate dev --name init # O el nombre de tu migración inicial
    ```
    *   (Opcional) Generar el cliente Prisma (usualmente `migrate dev` lo hace):
    ```bash
    npx prisma generate
    ```

6.  **Iniciar la Aplicación:**
    *   **Modo Desarrollo (con hot-reload):**
        ```bash
        npm run start:dev
        # o
        yarn start:dev
        ```
    *   **Modo Producción:**
        ```bash
        npm run build
        npm run start:prod
        # o
        yarn build
        yarn start:prod
        ```

La API debería estar corriendo en `http://localhost:3000` (o el puerto que hayas configurado). Puedes acceder a la documentación de Swagger en `http://localhost:3000/api` (o la ruta configurada en `main.ts`).

## Módulos Principales y Endpoints

*   **Auth (`/auth`):**
    *   `POST /register`: Registro de nuevos usuarios.
    *   `POST /login`: Inicio de sesión y obtención de token JWT.
    *   `GET /me`: Obtener perfil del usuario autenticado.
*   **Companies (`/companies`):**
    *   `POST /`: Crear una nueva empresa (Admin/Recruiter).
    *   `GET /`: Obtener lista de empresas (público, con filtros).
    *   `GET /:id`: Obtener detalles de una empresa específica (público).
    *   `PATCH /:id`: Actualizar una empresa (Admin/Recruiter asociado).
    *   `DELETE /:id`: Eliminar una empresa (Admin/Recruiter asociado).
*   **Job Offers (`/job-offers`):**
    *   `POST /`: Crear una nueva oferta de trabajo (Admin/Recruiter).
    *   `GET /`: Obtener lista de ofertas (público, con filtros).
    *   `GET /my-offers`: Obtener ofertas creadas por el recruiter autenticado.
    *   `GET /admin/all`: Obtener todas las ofertas (Admin).
    *   `GET /:id`: Obtener detalles de una oferta específica (público).
    *   `PATCH /:id`: Actualizar una oferta (Admin/Recruiter propietario).
    *   `DELETE /:id`: Eliminar una oferta (Admin/Recruiter propietario).
*   **(Otros módulos como Students, Applications, etc.)**

Consulta la documentación de Swagger (`/api-docs`) para ver detalles completos de los endpoints, parámetros y respuestas.

## Scripts Útiles

*   `npm run lint`: Ejecutar ESLint.
*   `npm run format`: Ejecutar Prettier.
*   `npm run test`: Ejecutar pruebas unitarias/integración.
*   `npm run test:e2e`: Ejecutar pruebas end-to-end.
*   `npx prisma studio`: Abrir interfaz gráfica para explorar la base de datos.