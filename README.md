# Job Platform - Full Stack Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Resumen del Proyecto

Job Platform es una aplicación web full-stack diseñada para conectar a estudiantes y recién graduados con oportunidades laborales (prácticas, primer empleo) ofrecidas por empresas. La plataforma permite a las empresas publicar ofertas, a los estudiantes buscar y postular, y a los administradores gestionar el contenido.

Este repositorio contiene tanto el backend (API RESTful) como el frontend (aplicación de usuario).

## Tecnologías Principales

Este proyecto utiliza un stack moderno de tecnologías:

*   **Backend:**
    *   **Framework:** [NestJS](https://nestjs.com/) (Node.js)
    *   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
    *   **ORM:** [Prisma](https://www.prisma.io/)
    *   **Base de Datos:** [PostgreSQL](https://www.postgresql.org/)
    *   **Autenticación:** JWT (JSON Web Tokens)
    *   **Validación:** `class-validator`, `class-transformer`
    *   **Documentación API:** Swagger (OpenAPI)
*   **Frontend:**
    *   **Framework/Librería:** [React](https://reactjs.org/)
    *   **Bundler/Tooling:** [Vite](https://vitejs.dev/)
    *   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
    *   **Gestión de Estado/Cache de Servidor:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
    *   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
    *   **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/) (construido sobre Radix UI y Tailwind CSS)
    *   **Routing:** [React Router DOM](https://reactrouter.com/)
    *   **Peticiones HTTP:** [Axios](https://axios-http.com/)
    *   **Notificaciones:** [Sonner](https://sonner.emilkowal.ski/)
    *   **Validación de Formularios:** (Considerar `react-hook-form` si se usa)
    *   **Linting/Formatting:** ESLint, Prettier

## Estructura del Repositorio

*   `/backend`: Contiene el código fuente de la API RESTful de NestJS.
*   `/frontend`: Contiene el código fuente de la aplicación React.

## Inicio Rápido

Para poner en marcha el proyecto completo, necesitarás configurar y ejecutar tanto el backend como el frontend.

1.  **Configura y ejecuta el Backend:** Sigue las instrucciones detalladas en el [`backend/README.md`](./backend/README.md).
2.  **Configura y ejecuta el Frontend:** Sigue las instrucciones detalladas en el [`frontend/README.md`](./frontend/README.md).

Asegúrate de que el backend esté corriendo antes de iniciar el frontend, ya que este último depende de la API.
