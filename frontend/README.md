# Job Platform - Frontend (React App)

[![React](https://img.shields.io/badge/Library-React-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Build%20Tool-Vite-purple.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind-cyan.svg)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/UI-shadcn/ui-black.svg)](https://ui.shadcn.com/)

## Resumen

Este directorio contiene el frontend de la aplicación Job Platform. Es una Single Page Application (SPA) construida con React y Vite, que interactúa con la API del backend para mostrar información y permitir a los usuarios (estudiantes, reclutadores, administradores) interactuar con la plataforma.

## Tecnologías Utilizadas

*   **Framework/Librería:** [React](https://reactjs.org/)
*   **Bundler/Tooling:** [Vite](https://vitejs.dev/)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
*   **Gestión de Estado/Cache de Servidor:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
*   **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
*   **Routing:** [React Router DOM](https://reactrouter.com/)
*   **Peticiones HTTP:** [Axios](https://axios-http.com/)
*   **Notificaciones:** [Sonner](https://sonner.emilkowal.ski/)
*   **(Opcional) Validación de Formularios:** (ej: `react-hook-form`)
*   **(Opcional) Gestión de Estado Global:** (ej: Zustand, Context API)
*   **Linting/Formatting:** ESLint, Prettier
*   **Gestor de Paquetes:** npm o yarn

## Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el frontend localmente:

1.  **Clonar el Repositorio (si aún no lo has hecho):**
    ```bash
    git clone https://github.com/jorgechvz/job-platform.git
    cd job-platform/frontend
    ```

2.  **Instalar Dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```
    *Nota: Si usas `shadcn/ui`, puede que necesites ejecutar `npx shadcn-ui@latest init` si es la primera vez que configuras el proyecto, aunque las dependencias principales deberían instalarse con `npm install`.*

3.  **Configurar Variables de Entorno:**
    *   Crea un archivo `.env` en el directorio `frontend`.
    *   Añade la URL de la API del backend:
        ```env
        # URL donde está corriendo tu API backend
        VITE_API_URL=http://localhost:3000
        ```
    *   Ajusta la URL si tu backend corre en un puerto o dirección diferente.

4.  **Iniciar la Aplicación de Desarrollo:**
    ```bash
    npm run dev
    # o
    yarn dev
    ```

La aplicación debería estar corriendo en `http://localhost:5173` (o el puerto que Vite asigne). Asegúrate de que el **backend esté corriendo** en la dirección especificada en `VITE_API_URL`.

## Características Principales

*   **Autenticación:** Registro e inicio de sesión de usuarios. Rutas protegidas según el rol.
*   **Dashboard (Admin):**
    *   Gestión de Empresas (CRUD).
    *   Gestión de Ofertas de Trabajo (CRUD, aprobación, etc.).
    *   (Posible) Gestión de Usuarios.
*   **Dashboard (Recruiter):**
    *   Gestión de Ofertas de Trabajo de su empresa.
    *   Visualización y gestión de postulaciones.
*   **Portal (Student):**
    *   Búsqueda y filtrado de ofertas de trabajo.
    *   Visualización de detalles de ofertas.
    *   Postulación a ofertas.
    *   Gestión de perfil de estudiante (CV, habilidades, etc.).

## Scripts Útiles

*   `npm run build`: Compilar la aplicación para producción.
*   `npm run lint`: Ejecutar ESLint.
*   `npm run preview`: Previsualizar la build de producción localmente.