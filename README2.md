# 🦷 Frontend - Clínica Dental

Este es el frontend del sistema de gestión de una clínica dental. Desarrollado con **Angular 17**, se conecta con el backend NestJS para ofrecer funcionalidades como gestión de citas, pacientes, profesionales, disponibilidades y autenticación con JWT.

---

## 🚀 Tecnologías principales

- [Angular 17](https://angular.io/)
- [RxJS](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS nativo para estilos
- JWT para autenticación
- localStorage para persistencia de sesión

---

## ⚙️ Requisitos del sistema

- Node.js: `v20.11.0`
- npm: `10.2.4`
- Angular CLI: `17.3.17`

---

## ▶️ Instalación y ejecución

```bash
git clone https://github.com/tu-usuario/clinica-dental-frontend.git
cd clinica-dental-frontend
npm install
ng serve -o
```

La aplicación se abrirá automáticamente en:
📍 http://localhost:4200

---

## 📁 Estructura de carpetas

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


---

## 🔐 Autenticación

La autenticación se gestiona mediante JWT:

Al iniciar sesión correctamente, el token se guarda en localStorage.

El token se incluye automáticamente en los headers de las peticiones HTTP mediante interceptores.

El sistema incluye control de rutas protegidas por roles.

Authorization: Bearer <jwt_token>

---

## 🌐 Comunicación con Backend

El frontend se comunica con el backend NestJS a través de servicios Angular personalizados.
Todos los endpoints utilizan peticiones HTTP estándar (GET, POST, PATCH, DELETE) y consumen las rutas expuestas en el backend.

---

## 🎨 Estilos

Se utiliza CSS nativo (no SCSS, Tailwind ni Bootstrap).

Existe una hoja de estilo base compartida para mantener consistencia visual entre componentes.

Estilo moderno, limpio, con enfoque en usabilidad para secretarias y dentistas.

---

## 🧩 Componentes clave

# 📅 Appointments
historical-appointments

new-appointments

# 🧑‍⚕️ Dentistas
consulta-disponibilidades-dentista

dentista-dashboard

dentista-agenda-diaria

dentista-agenda-semanal

dentista-layout

historial-citas-dentista

historial-citas-paciente

historial-citas-paciente-modal

# 📆 Disponibilidades

consulta-disponibilidades

consulta-preview

disponibilidades-mensuales

generador-disponibilidades

limpieza-disponibilidades

lista-disponibilidades

selector-disponibilidades

slots-libres

slots-libres-preview

# 👤 Usuarios y otros

login

patients

professionals

register-user

treatments

unauthorized

users

---

## ✅ Estado del proyecto

✅ Funciona correctamente en local

🔐 Autenticación con JWT y control de roles

🔄 Comunicación fluida con backend NestJS

🌍 Aún no desplegado en producción

---

## 🧑‍💻 Autor

Este proyecto ha sido desarrollado como interfaz de usuario para el sistema completo de gestión de una clínica dental.
