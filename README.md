# Cross Insurance Platform

Repositorio monorepo que reúne el backend (Django + DRF) y el frontend público (Next.js) para la solución integral de Cross Insurance. El backend administra clientes, pólizas, renovaciones, documentos y facturación; el frontend expone la oferta comercial y captura leads conectados al CRM.

## Project Structure

- `backend/` – Django project containing the CRM domain models and REST API.
  - `core/` – Project settings and global URL routing.
  - `crm/` – App with business models, serializers, viewsets, and admin configuration.
  - `requirements.txt` – Python dependencies for the backend.
- `frontend/` – Next.js 15 app (App Router + Tailwind) for the public-facing site and quote form.
  - `src/app/page.tsx` – Marketing landing page with sections (Quiénes somos, Visión/Misión, Productos, Testimonios, Multimedia, Formulario).
  - `src/app/dashboard/page.tsx` – Dashboard simple para métricas internas basado en `/api/dashboard/metrics/`.
  - `src/components/QuoteForm.tsx` – Formulario que envía solicitudes al backend.
  - `.env.local.example` – Variables públicas para consumo del API y datos de contacto.
- `.venv/` – (optional) Local virtual environment folder created during development.

## Backend Setup

1. Create a backend environment file:
   ```bash
   cp backend/.env.example backend/.env
   ```
   Update the values (secret key, debug flag, allowed hosts, database URL, CORS origins) according to your environment.
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Install backend dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
4. Run database migrations:
   ```bash
   python backend/manage.py migrate
   ```
5. (Optional) create a superuser for the Django admin:
   ```bash
   python backend/manage.py createsuperuser
   ```
6. Start the development server:
   ```bash
   python backend/manage.py runserver
   ```

The API will be available at `http://127.0.0.1:8000/api/` and the admin at `http://127.0.0.1:8000/admin/`.

## Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Copia `.env.local.example` a `.env.local` y ajusta los valores (URLs del backend y datos de contacto).
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

El sitio estará disponible en `http://localhost:3000`.

Para acceder al área interna:
1. Crea una cuenta staff en Django (`python backend/manage.py createsuperuser`).
2. Inicia sesión desde `http://localhost:3000/login` (o directamente en `/admin/`).
3. Abre `http://localhost:3000/dashboard` para ver las métricas.

## API Resources disponibles

El router por defecto del backend expone:

- `GET/POST /api/clients/`
- `GET/POST /api/products/`
- `GET/POST /api/policies/`
- `GET/POST /api/renewals/`
- `GET/POST /api/invoices/`
- `GET/POST /api/documents/`
- `GET/POST /api/leads/`
- `GET /api/dashboard/metrics/`
- `POST /api/auth/login/`
- `POST /api/auth/logout/`
- `GET /api/auth/session/`

Cada endpoint soporta operaciones REST (`list`, `retrieve`, `create`, `update`, `delete`). Las rutas de detalle para pólizas utilizan `policy_number` como identificador (ej. `/api/policies/POL-12345/`).

`/api/dashboard/metrics/` entrega un resumen listo para el dashboard (totales de clientes/pólizas, renovaciones próximas, facturas pendientes, leads recientes) junto con alertas concretas para renovaciones, facturas e ingresos de leads. El acceso está restringido a usuarios autenticados de staff (sesión de Django).

`/api/auth/session/` devuelve el estado de sesión actual (autenticado, usuario, flag `is_staff`) y es usado por el frontend para mostrar u ocultar las acciones de Dashboard/Logout en el menú de perfil.

> Para ver el dashboard desde el frontend: inicia sesión en `http://127.0.0.1:8000/admin/` (u otro host de backend) con un usuario marcado como *staff* y, sin cerrar la pestaña, abre `http://localhost:3000/dashboard`. El navegador reutiliza la misma cookie de sesión para consultar el API.

Los endpoints `/api/auth/login/` y `/api/auth/logout/` permiten iniciar/cerrar sesión desde el frontend (envían y destruyen la cookie de sesión de Django).

### Backend environment variables

| Variable | Descripción | Default |
| --- | --- | --- |
| `DJANGO_SECRET_KEY` | Clave secreta de Django. | `unsafe-secret-key` (solo dev, cambia en producción) |
| `DJANGO_DEBUG` | Activa modo debug (`True`/`False`). | `True` |
| `DJANGO_ALLOWED_HOSTS` | Lista separada por comas de hosts permitidos. | `127.0.0.1,localhost` |
| `DATABASE_URL` | Cadena de conexión (soporta PostgreSQL, etc.). | `sqlite:///db.sqlite3` |
| `CORS_ALLOWED_ORIGINS` | Orígenes autorizados para consumir el API. | `http://localhost:3000,http://127.0.0.1:3000` |
| `CORS_ALLOW_CREDENTIALS` | (interno) habilitado para que los navegadores envíen la cookie de sesión al API. | `True` |
| `SESSION_COOKIE_SAMESITE` | Política `SameSite` para la cookie de sesión (`Lax`, `None`, etc.). | `Lax` |
| `SESSION_COOKIE_SECURE` | Si `True`, la cookie de sesión solo viaja por HTTPS (requerido si `SameSite=None`). | `False` |

## Next Steps

- Backend: añadir autenticación/autorización (JWT, roles de usuarios) y un endpoint dedicado a leads (`/api/leads/`) que gestione el formulario del frontend.
- Frontend: incorporar blog/recursos dinámicos apoyados en el API, añadir validaciones adicionales y tracking de conversiones.
- Infraestructura: migrar a PostgreSQL, configurar almacenamiento para documentos y definir pipeline de CI/CD con despliegues diferenciados para backend y frontend.

Esta base permite iterar rápidamente sobre funcionalidades del CRM y el sitio público, manteniendo un stack moderno y escalable.

## Despliegue en Render (backend)

1. **Crear servicio web**: en Render, elige "Web Service" → conecta este repo → directorio `backend/` → lenguaje Python.
2. **Build Command**: `pip install -r requirements.txt`
3. **Start Command**: `gunicorn core.wsgi:application --log-file -` (Render leerá `backend/Procfile` de referencia).
4. **Variables de entorno**:
   - `DJANGO_SECRET_KEY` (valor seguro)
   - `DJANGO_DEBUG=False`
   - `DJANGO_ALLOWED_HOSTS=<tu-dominio,tu-servicio.onrender.com>`
   - `DATABASE_URL` (Render Postgres → copiar cadena completa)
   - `CORS_ALLOWED_ORIGINS=https://tu-front.vercel.app,https://tu-dominio`
   - `CORS_ALLOW_CREDENTIALS=True`
5. **Base de datos**: crea un Render Postgres, copia `DATABASE_URL` y ejecútale migraciones desde Render o localmente apuntando a esa URL.
6. **Static/Media**: Render se queda con `STATIC_ROOT=backend/staticfiles`. Puedes usar `collectstatic` (ejecuta `python backend/manage.py collectstatic` en deploy) o servir estáticos con un CDN externo; para documentos (`MEDIA_ROOT`) se recomienda un bucket S3/GCS.
7. **Migraciones**: después del primer deploy, corre `render shell` o un job manual con `python backend/manage.py migrate`.

## Despliegue en Vercel (frontend)

1. Importa el repo en Vercel (root `frontend/`).
2. **Build Command**: `npm run build`, **Output**: `.next`.
3. **Env vars**:
   - `NEXT_PUBLIC_API_BASE_URL=https://tu-backend.onrender.com/api`
   - `NEXT_PUBLIC_QUOTE_ENDPOINT=https://tu-backend.onrender.com/api/leads/`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE_NUMBER`, `NEXT_PUBLIC_SUPPORT_EMAIL`.
4. Configura dominios (ej. `app.crossinsurance.com`) y actualiza `DJANGO_ALLOWED_HOSTS` + `CORS_ALLOWED_ORIGINS` para incluirlos.
5. Tras cada despliegue, prueba `/login` y `/dashboard` para asegurar que la cookie funciona con HTTPS.

## Frontend en Vercel

1. En Vercel, selecciona "Add New Project" → importa este repo → ajusta el directorio raíz a `frontend/`.
2. Variables necesarias:
   - `NEXT_PUBLIC_API_BASE_URL=https://cross-insurance-backend.onrender.com/api`
   - `NEXT_PUBLIC_QUOTE_ENDPOINT=https://cross-insurance-backend.onrender.com/api/leads/`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE_NUMBER`, `NEXT_PUBLIC_SUPPORT_EMAIL`
3. Build command: `npm run build`. Output: `.next`.
4. Asigna un dominio (`app.crossinsurance.com`) y actualiza `DJANGO_ALLOWED_HOSTS` + `CORS_ALLOWED_ORIGINS` en Render para incluirlo.
5. Después del deploy, verifica `/login` y `/dashboard`; como se usa cookie de sesión, Render ya permite credenciales (`CORS_ALLOW_CREDENTIALS=True`).
