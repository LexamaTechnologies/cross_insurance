# Cross Insurance Frontend

Aplicación Next.js (App Router + Tailwind CSS) para el sitio público de Cross Insurance. Consume el backend Django/DRF y presenta la información corporativa junto con el formulario de solicitud de cotización conectado al CRM.

## Requisitos

- Node.js 20+
- Archivo `.env.local` basado en [.env.local.example](./.env.local.example)
- Backend en ejecución (por defecto `http://127.0.0.1:8000/api`)

## Scripts principales

```bash
npm install        # Instala dependencias
npm run dev        # Levanta el servidor de desarrollo en http://localhost:3000
npm run build      # Compila para producción
npm run start      # Sirve la build en modo producción
npm run lint       # Ejecuta ESLint
```

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | URL base del backend Django/DRF. |
| `NEXT_PUBLIC_QUOTE_ENDPOINT` | Endpoint que recibe los envíos del formulario de cotización (p.ej. `/api/leads/`). |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número usado para el botón/flotante de WhatsApp. |
| `NEXT_PUBLIC_PHONE_NUMBER` | Teléfono mostrado en el encabezado y footer. |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Email de contacto para el formulario y CTA. |

## Integración con el backend

- El componente `QuoteForm` envía los datos con `FormData` al endpoint definido en `NEXT_PUBLIC_QUOTE_ENDPOINT`. Ajusta en el backend un recurso (por ejemplo `LeadViewSet`) que reciba los campos `name`, `phone`, `email`, `insurance_type`, `notes` y `attachment`.
- Configura CORS en Django para permitir solicitudes desde el dominio donde se despliegue el frontend.
- Para producción recomendamos servir el frontend (Vercel u otra plataforma) y exponer el backend a través de HTTPS.

## Personalización

- `src/app/page.tsx`: Contenido principal con secciones solicitadas (Quiénes somos, Visión/Misión, Productos, Testimonios, Multimedia y formulario de cotización).
- `src/app/login/`: Pantalla para iniciar sesión contra `/api/auth/login/` usando sesiones de Django.
- `src/app/dashboard/`: Dashboard interno que consume `/api/dashboard/metrics/` con credenciales de sesión.
- `src/components/ProfileMenu.tsx`: Menú de perfil en el encabezado que consulta `/api/auth/session/` y muestra las acciones de Login, Dashboard y Logout.
- `src/components/QuoteForm.tsx`: Formulario interactivo con manejo de estados y mensajes de éxito/error.
- `src/lib/config.ts`: Lectura centralizada de variables públicas y contactos.

En desarrollo:

1. Ejecuta el backend y el frontend (`python backend/manage.py runserver` y `npm run dev`).
2. Visita `http://localhost:3000/login`, ingresa tus credenciales de staff (las mismas del admin de Django) y serás redirigido al dashboard.

Este frontend es la base para añadir más páginas (blog, recursos privados) y conectar con futuras APIs (autenticación de clientes, área privada, etc.).
// trigger Vercel
// trigger build
