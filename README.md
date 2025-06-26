# 🦷 Clínica Dental - Frontend

![Angular](https://img.shields.io/badge/Angular-17.1.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-7.8.0-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Day.js](https://img.shields.io/badge/day.js-1.11.13-FFCA28?style=for-the-badge&logo=javascript&logoColor=black)
![JWT Decode](https://img.shields.io/badge/jwt--decode-4.0.0-000000?style=for-the-badge)
![FontAwesome](https://img.shields.io/badge/FontAwesome-6.7.2-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)
![Material](https://img.shields.io/badge/Angular%20Material-17.3.10-1976D2?style=for-the-badge&logo=angular&logoColor=white)
![Zone.js](https://img.shields.io/badge/Zone.js-0.14.3-8E44AD?style=for-the-badge)
![Angular CLI](https://img.shields.io/badge/Angular_CLI-17.1.2-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Jasmine](https://img.shields.io/badge/Jasmine-5.1-8A4182?style=for-the-badge&logo=jasmine&logoColor=white)
![Karma](https://img.shields.io/badge/Karma-6.4.0-28A745?style=for-the-badge&logo=karma&logoColor=white)
![NestJS Backend](https://img.shields.io/badge/Backend-NestJS-E0234E?logo=nestjs&logoColor=white)
![CSS](https://img.shields.io/badge/Styles-CSS3-264de4?logo=css3&logoColor=white)
![LocalStorage](https://img.shields.io/badge/Storage-localStorage-orange)
![Status](https://img.shields.io/badge/Project-Frontend-blueviolet)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

Este es el frontend del sistema de gestión de una clínica dental. Desarrollado con **Angular 17**, se conecta a un backend NestJS para ofrecer funcionalidades como gestión de citas, pacientes, profesionales, disponibilidades y autenticación con JWT.

---

## 📚 Índice

1. [🚀 Tecnologías principales](#-tecnologías-principales)
2. [🧪 Herramientas de desarrollo](#-herramientas-de-desarrollo)
3. [⚙️ Requisitos del sistema](#️-requisitos-del-sistema)
4. [▶️ Instalación y ejecución](#️-instalación-y-ejecución)
5. [📁 Estructura de carpetas](#-estructura-de-carpetas)
6. [🔐 Autenticación](#-autenticación)
7. [🌐 Comunicación con Backend](#-comunicación-con-backend)
8. [🎨 Estilos](#-estilos)
9. [🧩 Componentes clave](#-componentes-clave)
10. [📝 Esquema de Roles y Flujo](#-esquema-de-roles-y-flujo)
11. [🖼️ Capturas de Pantalla](#️-capturas-de-pantalla)

---

## 🚀 Tecnologías principales

- [Angular 17](https://angular.io/) (core, router, animations, forms)
- [Angular Material 17](https://material.angular.io/)
- [RxJS 7.8](https://rxjs.dev/)
- [TypeScript 5.3](https://www.typescriptlang.org/)
- [Day.js](https://day.js.org/) para manejo de fechas
- [JWT Decode](https://github.com/auth0/jwt-decode) para decodificar tokens y control de roles
- [FontAwesome 6](https://fontawesome.com/) para iconos
- [Zone.js](https://github.com/angular/zone.js) para gestión de zonas de ejecución en Angular
- CSS nativo para estilos personalizados
- `localStorage` para persistencia de sesión

---

## 🧪 Herramientas de desarrollo

- [Angular CLI](https://angular.io/cli) para scaffolding y build
- [TypeScript](https://www.typescriptlang.org/) como lenguaje principal
- [Jasmine](https://jasmine.github.io/) + [Karma](https://karma-runner.github.io/) para testing


---

## ⚙️ Requisitos del sistema

- Node.js: `v20.11.0`
- npm: `10.2.4`
- Angular CLI: `17.3.17`

---

## ▶️ Instalación y ejecución

```bash
git clone https://github.com/fran-eliot/dental-front.git
cd dental-front
npm install
ng serve -o
```

La aplicación se abrirá automáticamente en:
📍 http://localhost:4200

---

## 📁 Estructura de carpetas

```plaintext
src/
├── app/
│   ├── appointments/
│   │   ├── historical-appointments/
│   │   └── new-appointments/
│   ├── dentistas/
│   │   ├── consulta-disponibilidades-dentista/
│   │   ├── dentista-dashboard/
│   │   ├── dentista-agenda-diaria/
│   │   ├── dentista-agenda-semanal/
│   │   ├── dentista-layout/
│   │   ├── historial-citas-dentista/
│   │   ├── historial-citas-paciente/
│   │   └── historial-citas-paciente-modal/
│   ├── disponibilidades/
│   │   ├── consulta-disponibilidades/
│   │   ├── consulta-preview/
│   │   ├── disponibilidades-mensuales/
│   │   ├── generador-disponibilidades/
│   │   ├── limpieza-disponibilidades/
│   │   ├── lista-disponibilidades/
│   │   ├── selector-disponibilidades/
│   │   ├── slots-libres/
│   │   └── slots-libres-preview/
│   ├── login/
│   ├── patients/
│   ├── professionals/
│   ├── register-user/
│   ├── treatments/
│   ├── unauthorized/
│   └── users/
```

---

## 🔐 Autenticación

- La autenticación se gestiona mediante JWT:

- Al iniciar sesión correctamente, el token se guarda en localStorage.

- El token se incluye automáticamente en los headers de las peticiones HTTP mediante interceptores.

```http
    Authorization: Bearer <jwt_token>
```

- El sistema protege rutas según roles: admin, dentista (futura mejora: paciente).


---

## 🌐 Comunicación con Backend

- El frontend se comunica con el backend NestJS a través de servicios Angular personalizados.

- Todos los endpoints utilizan peticiones HTTP estándar (GET, POST, PATCH, DELETE) y consumen las rutas expuestas en el backend.

- El repositorio del backend está disponible aquí:
    👉 [Clínica Dental - Backend (NestJS)](https://github.com/fran-eliot/dental-back)

- Los endpoints están documentados vía Swagger en el backend:
    📌 http://localhost:3000/api

---

## 🎨 Estilos

- Se utiliza CSS nativo (no SCSS, Tailwind ni Bootstrap).

- Existe una hoja de estilo base compartida (custom-theme.scss) para mantener consistencia visual entre componentes:

    - Fondo semitransparente

    - Bordes redondeados y sombras suaves

    - Colores definidos por variables :root

- Estética moderna, limpia y orientada a usabilidad para personal clínico y administrativo.

---

# 🧩 Componentes clave

## 📅 Appointments

- historical-appointments

- new-appointments

## 🧑‍⚕️ Dentistas

- consulta-disponibilidades-dentista

- dentista-dashboard

- dentista-agenda-diaria

- dentista-agenda-semanal

- dentista-layout

- historial-citas-dentista

- historial-citas-paciente

- historial-citas-paciente-modal

## 📆 Disponibilidades

- consulta-disponibilidades

- consulta-preview

- disponibilidades-mensuales

- generador-disponibilidades

- limpieza-disponibilidades

- lista-disponibilidades

- selector-disponibilidades

- slots-libres

- slots-libres-preview

## 👤 Usuarios y otros

- login

- patients

- professionals

- register-user

- treatments

- unauthorized

- users

---

# 📝 Esquema de Roles y Flujo

A continuación se muestra un esquema simplificado con el flujo de navegación y acciones permitidas para los dos roles principales de la aplicación (Secretaria/Admin y Profesional/Dentista):

![Esquema de flujo](./docs/screenshots/flujo-roles.png)

# 🖼️ Capturas de Pantalla

## 🧭 Vistas Comunes

| Pantalla                                              | Descripción                                 |
|-------------------------------------------------------|---------------------------------------------|
| ![Pantalla de Inicio](./docs/screenshots/inicio.png)  | Pantalla principal tras el login            |
| ![Login](./docs/screenshots/login.png)                | Pantalla de acceso al sistema               |
| ![Servicios](./docs/screenshots/servicios.png)        | Listado general de servicios  ofrecidos     |

## 👩‍💼 Vistas de Secretaria / Administrador

| Pantalla                                                               | Descripción                                           |
|------------------------------------------------------------------------|-------------------------------------------------------|
| ![Nuevo Paciente](./docs/screenshots/nuevo-paciente.png)              | Formulario para registrar un nuevo paciente           |
| ![Datos Paciente](./docs/screenshots/datos-paciente.png)              | Ficha con información del paciente                    |
| ![Listado de Reservas](./docs/screenshots/listado-reservas.png)       | Vista general de todas las citas agendadas            |
| ![Nueva Reserva](./docs/screenshots/nueva-reserva.png)                | Creación de una nueva cita                            |
| ![Gestión de Disponibilidades](./docs/screenshots/gestion-disponibilidades.png) | Administración de disponibilidades semanales         |
| ![Generar Disponibilidades](./docs/screenshots/generar-disponibilidades.png)     | Generación mensual automática de disponibilidades     |
| ![Limpiar Disponibilidades](./docs/screenshots/limpieza-disponibilidades.png)    | Eliminación de disponibilidades antiguas              |
| ![Nuevo Tratamiento](./docs/screenshots/nuevo-tratamiento.png)        | Formulario para crear un tratamiento                  |
| ![Gestión de Tratamientos](./docs/screenshots/gestion-tratamientos.png) | Lista de tratamientos disponibles                    |
| ![Modificar Dentista](./docs/screenshots/modificar-dentista.png)      | Edición de datos de un profesional                    |
        

---

## 🦷 Vistas de Profesional / Dentista

| Pantalla                                                                  | Descripción                                           |
|---------------------------------------------------------------------------|-------------------------------------------------------|
| ![Agenda Diaria](./docs/screenshots/agenda-diaria.png)                   | Citas asignadas al dentista para el día actual       |
| ![Agenda Semanal](./docs/screenshots/agenda-semanal.png)                 | Vista semanal de la agenda del dentista              |
| ![Disponibilidades del Dentista](./docs/screenshots/gestion-disponibilidades-dentista.png) | Consulta de slots libres desde el panel del dentista |
| ![Historial de Citas del Dentista](./docs/screenshots/historial-citas-dentista.png) | Historial de pacientes atendidos por el profesional  |
| ![Historial del Paciente](./docs/screenshots/historial-paciente.png)           | Citas anteriores de un paciente  
      |

---

# 📄 Presentación en PDF

Puedes consultar la presentación general de la aplicación (incluye contexto, objetivos, estructura y funcionalidades principales) en el siguiente documento:

📘 [Ver presentación en PDF](./docs/clinica_dental_smyle.pdf)

---

# 🔮 Mejoras Futuras

- Rol "Paciente" con login propio
- Notificaciones por email
- Filtrado avanzado por tipo de tratamiento
- Internacionalización (i18n)

---

# 🧑‍💻 Autores

Este proyecto ha sido desarrollado como parte de un sistema completo de gestión de una clínica dental, para el curso "Desarrollo Frontend con Angular" de Fundación Adecco.

Los autores del proyecto son:
- [Ainhoa Alonso](https://github.com/AinhoaAlonso)
- [Fran Ramírez](https://github.com/fran-eliot)
- [Asusalin Abou](https://github.com/asusalin)
