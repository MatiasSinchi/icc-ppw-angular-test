# SinchiLarriva.dev — Portafolio de Servicios

Aplicación web tipo **portafolio profesional multiusuario** desarrollada como **Proyecto Integrador** de la asignatura **Programación y Plataformas Web** (Universidad Politécnica Salesiana, Marzo–Agosto 2026).

Presenta los perfiles, proyectos y servicios de los Software Engineers **Matias Sinchi** y **David Larriva**, y permite a usuarios externos autenticados enviar solicitudes de contacto a un programador específico, quien podrá responderlas desde su panel privado.

---

## 👥 Autores

| Nombre              | Rol                                  | Contacto                                                    |
| ------------------- | ------------------------------------ | ----------------------------------------------------------- |
| **Matias Sinchi**   | Software Engineer · Frontend & Cloud | [matiassinchi88@gmail.com](mailto:matiassinchi88@gmail.com) |
| **David Larriva**   | Software Engineer · Backend & Data   | [david.larriva@example.com](mailto:david.larriva@example.com) |

**Docente guía:** Ing. Pablo Torres

---

## 🏗️ Arquitectura

```
┌───────────────┐       Auth         ┌─────────────────┐
│               │ ─────────────────► │  Firebase Auth  │
│   Angular 21  │                    └─────────────────┘
│   (Frontend)  │   CRUD solicitudes ┌─────────────────┐
│               │ ─────────────────► │ Cloud Firestore │
│               │                    └─────────────────┘
│               │   GET contenido    ┌─────────────────┐
│               │ ─────────────────► │   Strapi CMS    │
└───────────────┘       REST         └─────────────────┘
```

- **Angular 21** (standalone components + signals) — UI del portafolio, consume Strapi y gestiona Firestore.
- **Firebase Authentication** — registro/login email & password + Google (opcional).
- **Cloud Firestore** — colección `contact_requests` con las solicitudes de contacto.
- **Strapi CMS Headless** — contenido dinámico (programadores, proyectos, servicios). Si Strapi no responde, la app cae automáticamente a un **dataset local** equivalente para no romper la demo.

---

## 🧰 Tecnologías

| Capa            | Tecnología                                         |
| --------------- | -------------------------------------------------- |
| Frontend        | Angular 21, TypeScript 5.9, Signals, RxJS          |
| Estilos         | Tailwind CSS v4, DaisyUI v5 (theme `cupcake`)      |
| Autenticación   | Firebase Authentication (AngularFire 20)           |
| Base de datos   | Cloud Firestore                                    |
| CMS             | Strapi v5 (Headless, REST)                         |
| Build / Dev     | Angular CLI 21, Vite, pnpm 11                      |
| Despliegue      | Firebase Hosting / GitHub Pages                    |

---

## 📂 Estructura del proyecto

```
src/
├─ app/
│  ├─ app.config.ts            # Firebase + router providers
│  ├─ app.routes.ts            # Rutas de portafolio + lab interno
│  ├─ components/              # Header y footer compartidos
│  ├─ core/
│  │  └─ services/auth.ts      # AuthService (Firebase Auth)
│  └─ features/
│     └─ portfolio/
│        ├─ models/            # Interfaces TypeScript
│        ├─ data/              # mock-portfolio (fallback local)
│        ├─ services/
│        │  ├─ portfolio.service.ts  # Consume Strapi + fallback
│        │  └─ requests.service.ts   # CRUD Firestore
│        ├─ guards/auth.guard.ts
│        ├─ components/        # developer-card, project-card, service-card
│        └─ pages/             # home, programadores, proyectos, contacto, …
├─ environments/               # strapiUrl configurable
├─ index.html                  # Meta tags SEO + Open Graph
└─ styles.css                  # Tailwind v4 + DaisyUI + utilidades
```

---

## 🚀 Setup local

### Requisitos

- Node.js 20+ y **pnpm 11**.
- Cuenta de Firebase con un proyecto creado (Authentication + Firestore habilitados).
- (Opcional) Strapi v5 corriendo en local o en Strapi Cloud.

### Pasos

```bash
# 1) Instalar dependencias
pnpm install

# 2) Configurar Strapi (opcional; por defecto http://localhost:1337/api)
#    editar src/environments/environment.development.ts y environment.ts

# 3) Levantar el dev server
pnpm start
# abre http://localhost:4200
```

> Si Strapi no responde en 2.5 s, la app servirá automáticamente el dataset mock (`src/app/features/portfolio/data/mock-portfolio.ts`). En la página de inicio, en la parte inferior, se muestra la fuente activa (`strapi` o `mock`).

### Configuración de Firebase

El archivo `src/app/app.config.ts` ya contiene las credenciales del proyecto de demo. Para usar un proyecto propio:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Habilita **Authentication** → métodos `Email/Password` y `Google`.
3. Habilita **Firestore Database** en modo `producción` y aplica estas reglas mínimas:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contact_requests/{id} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
        && request.resource.data.userUid == request.auth.uid;
      allow update: if request.auth != null;
    }
  }
}
```

4. Copia la config web (apiKey, projectId, etc.) a `src/app/app.config.ts`.

---

## 🗂️ Modelos de contenido en Strapi

Crear las siguientes colecciones (los endpoints REST deben ser públicos para lectura):

### `programadores` (Collection Type)

| Campo         | Tipo            | Notas              |
| ------------- | --------------- | ------------------ |
| `slug`        | UID             | Único              |
| `fullName`    | Text            | Nombre completo    |
| `role`        | Text            | Perfil profesional |
| `shortBio`    | Text            | Descripción breve  |
| `fullBio`     | Rich Text       | Descripción larga  |
| `photoUrl`    | Media (single)  | Foto de perfil     |
| `email`       | Email           |                    |
| `github`      | Text            | URL                |
| `linkedin`    | Text            | URL                |
| `website`     | Text            | URL (opcional)     |
| `active`      | Boolean         |                    |

### `proyectos` (Collection Type)

| Campo               | Tipo                              |
| ------------------- | --------------------------------- |
| `slug`              | UID                               |
| `name`              | Text                              |
| `shortDescription`  | Text                              |
| `fullDescription`   | Rich Text                         |
| `imageUrl`          | Media (single)                    |
| `type`              | Enumeration (`academico`, `personal`, `laboral`, `simulado`) |
| `technologies`      | JSON (array de strings)           |
| `repoUrl`           | Text                              |
| `demoUrl`           | Text                              |
| `featured`          | Boolean (campo destacado)         |
| `programadores`     | Relación many-to-many → `programadores` |

### `servicios` (Collection Type)

| Campo         | Tipo |
| ------------- | ---- |
| `title`       | Text |
| `description` | Text |
| `icon`        | Text (emoji o nombre de ícono) |

### Endpoints consumidos

```
GET /api/programadores?populate=*
GET /api/proyectos?populate=*
GET /api/servicios?populate=*
```

> El mapper en `portfolio.service.ts` soporta Strapi v4 (`row.attributes`) y v5 (campos planos), y también nombres de campo en español (`nombre`, `descripcionBreve`, etc.).

---

## 🔐 Roles y vistas

| Vista                | Quién                                                            | Puede                                                                   |
| -------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Visitante**        | Sin login                                                        | Ver Home, programadores, proyectos, servicios                            |
| **Usuario externo**  | Registrado con email/password o Google                            | Lo anterior + enviar solicitudes + ver sus propias solicitudes           |
| **Programador**      | Login con email que exista en la colección `programadores` del CMS | Lo anterior + ver solicitudes recibidas + responder + cambiar estado    |

La detección del rol "programador" es por **coincidencia de email** entre `auth.currentUser().email` y `developer.email` en el CMS. No se requiere un campo de rol adicional.

---

## 🌐 Despliegue

### Firebase Hosting (recomendado)

```bash
# 1) Build de producción
pnpm build

# 2) Inicializar Firebase Hosting (solo una vez)
npx firebase login
npx firebase init hosting
#   - selecciona el proyecto angular-firebase-01-f9b81 (o el tuyo)
#   - public directory: dist/ppw-angular-21/browser
#   - configurar como SPA (rewrites a /index.html): YES

# 3) Desplegar
npx firebase deploy --only hosting
```

### GitHub Pages (alternativa)

```bash
pnpm build --base-href "/repo-name/"
npx angular-cli-ghpages --dir=dist/ppw-angular-21/browser
```

---

## 👤 Guía de usuario

### Visitante / cliente potencial

1. Entra al sitio.
2. Navega Home → Programadores → Proyectos → Servicios.
3. Para enviar una solicitud, haz clic en **Iniciar sesión** o **Registrarse**.

### Usuario externo

1. Registra una cuenta con email + contraseña (o usa Google).
2. Ve a **Contacto** desde el menú o desde el perfil de un programador.
3. Llena el formulario: nombre, correo, descripción del proyecto y programador destinatario.
4. Tu solicitud queda en estado **Pendiente** y la puedes ver en **Mis solicitudes**.
5. Cuando el programador responda, verás su respuesta y el estado pasará a **Respondida**.

### Programador

1. Inicia sesión con el correo registrado como `email` en la colección `programadores` del CMS.
2. En el menú aparecerá la opción **📥 Recibidas**.
3. Verás todas las solicitudes dirigidas a ti, ordenadas por fecha.
4. Haz clic en **Responder** para escribir una respuesta y cambiar el estado.
5. Al guardar, la actualización se persiste en Firestore y el usuario externo la ve en tiempo real.

---

## 📜 Scripts disponibles

```bash
pnpm start       # ng serve → http://localhost:4200
pnpm build       # build de producción
pnpm watch       # build en watch mode (development)
pnpm test        # ng test (vitest)
```

---

## ✅ Cumplimiento de la rúbrica del Proyecto Integrador

| Criterio                             | Cumplimiento                                                                 |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| Contenido dinámico (CMS)             | Strapi v5 con `programadores`, `proyectos`, `servicios` + fallback local      |
| Dominio del tema                     | Documentación técnica completa + video de presentación                       |
| Prototipo y diseño UI                | Responsive con Tailwind v4 + DaisyUI, navegación clara, baja carga cognitiva  |
| Funcionalidades del sistema          | Auth (Email + Google), roles, CRUD solicitudes en Firestore                  |
| Publicación y accesibilidad          | Firebase Hosting + meta tags SEO + Open Graph                                 |
| Calidad de código                    | Standalone components, signals, OnPush, separación por features              |
| Informe y presentación               | README detallado + video adjunto                                              |

---

## 📹 Video de presentación

> [Adjuntar enlace al video de exposición (10 min) explicando arquitectura, roles y decisiones técnicas.]

---

## 📄 Licencia

Proyecto académico — Universidad Politécnica Salesiana — 2026.
