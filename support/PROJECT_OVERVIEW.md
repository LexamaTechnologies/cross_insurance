# Cross Insurance Platform – Reference Guide

> This document captures the architecture, tooling, and deployment workflow of the Cross Insurance project. Use it as a template for future initiatives that need a modern CRM + marketing site stack.

---

## 1. High-Level Overview

| Layer          | Purpose                                                                                     |
|----------------|----------------------------------------------------------------------------------------------|
| Frontend       | Public marketing site, quote form, and dashboard shell built with Next.js + Tailwind CSS.   |
| Backend/API    | Django + Django REST Framework serving CRM data, leads API, and admin panel.                |
| Database       | PostgreSQL (managed by Render).                                                              |
| Assets         | Static Next.js assets in `frontend/public/`; Django admin assets collected to Render static site. |
| Domains        | GoDaddy-hosted root domain (`crossinsurancepr.com`) pointing to Vercel (frontend) and Render (API). |

---

## 2. Technologies & Libraries

- **Frontend**
  - Next.js 15 (App Router, Server Components, TurboPack dev)
  - React 19 + TypeScript
  - Tailwind CSS v4
  - Next/Image for optimized assets
  - Custom components: `ProfileMenu`, `QuoteForm`, `MobileHeaderMenu`.

- **Backend**
  - Django 4.2 + Django REST Framework 3.16
  - `django-environ` for env management
  - `django-cors-headers` for cross-domain requests
  - `psycopg[binary]` for PostgreSQL connections
  - Gunicorn for production WSGI server

- **Infrastructure**
  - **Render**: hosts backend web service, PostgreSQL database, and static site for admin assets.
  - **Vercel**: hosts the Next.js frontend with auto deploy from GitHub.
  - **GoDaddy**: DNS registrar; A/CNAME records configured for Vercel and Render.

---

## 3. Server Services & Environments

| Service                              | Provider | Notes                                                                                         |
|--------------------------------------|----------|-----------------------------------------------------------------------------------------------|
| `cross-insurance-backend`            | Render   | Django app, gunicorn start command, env vars via Render dashboard.                            |
| `cross-insurance-db` (Postgres)      | Render   | Internal `DATABASE_URL`; migrate via Render shell/job.                                        |
| `cross-insurance-admin-static`       | Render   | Static Site serving `/backend/staticfiles` (Django admin CSS/JS).                             |
| `cross-insurance` (frontend)         | Vercel   | Production + preview deployments on push. Domains: `www.crossinsurancepr.com`, apex redirect. |

**Environment variables (Render – backend)**  
```
DJANGO_SECRET_KEY=<generated>
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=api.crossinsurancepr.com,cross-insurance-backend.onrender.com
CORS_ALLOWED_ORIGINS=https://www.crossinsurancepr.com,https://cross-insurance.vercel.app
SESSION_COOKIE_SAMESITE=None
SESSION_COOKIE_SECURE=True
DATABASE_URL=<Render Postgres internal URL>
```

**Environment variables (Vercel – frontend)**  
```
NEXT_PUBLIC_API_BASE_URL=https://api.crossinsurancepr.com/api
NEXT_PUBLIC_QUOTE_ENDPOINT=https://api.crossinsurancepr.com/api/leads/
NEXT_PUBLIC_WHATSAPP_NUMBER=+17876000000
NEXT_PUBLIC_PHONE_NUMBER="+1 (787) 600-0000"
NEXT_PUBLIC_SUPPORT_EMAIL=contacto@crossinsurancepr.com
```

---

## 4. Project Structure

```
cross_insurance/
├── backend/
│   ├── core/                # Django settings, URLs, wsgi/asgi configs
│   ├── crm/                 # Models, serializers, viewsets, auth endpoints
│   ├── staticfiles/         # Collected admin assets (served via Render static site)
│   ├── Procfile             # gunicorn start command for Render
│   └── render_migrate.sh    # helper script to run migrations via job/shell
├── frontend/
│   ├── public/
│   │   └── images/          # Marketing assets (team photos, logos, etc.)
│   ├── src/
│   │   ├── app/             # Next.js App Router pages (`page.tsx`, dashboard, login)
│   │   └── components/      # Reusable components (QuoteForm, ProfileMenu, MobileHeaderMenu)
│   └── README.md            # Frontend-specific instructions
├── support/
│   └── PROJECT_OVERVIEW.md  # This guide
└── README.md                # Monorepo overview, setup instructions
```

---

## 5. Best Practices Applied

1. **Decoupled Architecture** – Clearing separation of concerns (Next.js for UI, Django REST for API) simplifies scaling and maintenance.
2. **Environment Isolation** – `.env` files locally, Render/Vercel dashboards for deployment secrets. No secrets committed.
3. **CORS & Session Security** – `CORS_ALLOW_CREDENTIALS=True`, cookie `SameSite=None` + `Secure=True`, ensuring cross-domain dashboard works safely.
4. **Static Asset Strategy** – `collectstatic` output served from dedicated static site, ensuring Django admin UI renders correctly in production.
5. **Infrastructure as configuration** – DNS records documented, environment vars centrally defined; easy to replicate in future projects.
6. **Responsive UX** – Tailwind grid/layouts, profile cards with Next/Image, accessible navigation (desktop + mobile menu).
7. **API Documentation by convention** – DRF’s browsable API + resource naming ensures discoverability (`/api/clients/`, `/api/leads/`, `/api/dashboard/metrics/`, etc.).

---

## 6. Deployment Workflow (Reference)

1. **Local development**
   ```
   # Backend
   source .venv/bin/activate
   python backend/manage.py runserver
   # Frontend
   cd frontend && npm run dev
   ```
2. **Version control**
   - Work in feature branches; commit frequently.
   - Ensure `frontend/public/images/*` and `backend/staticfiles/` updated when assets change.
3. **Push to GitHub**
   - Repo: `github.com/LexamaTechnologies/cross_insurance`
   - Vercel auto builds frontend; Render auto builds backend/static site.
4. **DB migrations**
   - Locally: `python backend/manage.py makemigrations && migrate`
   - Render: run `python backend/manage.py migrate` from Shell or `render_migrate.sh`.
5. **Domain updates**
   - GoDaddy: configure `A @ → 216.198.79.1`, `CNAME www → e61415d04b11d363.vercel-dns-017.com`, `CNAME api → cross-insurance-backend.onrender.com`.
   - Wait for propagation; check via dnschecker.org.

---

## 7. Future Enhancements (Template Ideas)

- **CI/CD**: Integrate GitHub Actions for tests + lint before deploying.
- **Monitoring**: Hook Sentry or Logtail for error tracking on both tiers.
-
- **Infrastructure-as-Code**: Document Render/Vercel resources via Terraform or Pulumi for automated provisioning.
- **Automated `collectstatic`**: Add a pre-deploy command in Render or use S3/CloudFront to avoid committing staticfiles.
- **CMS Integration**: If content editors are required, add a headless CMS (Sanity, Contentful) for testimonials or team bios.

---

## 8. Quick References

- **Admin Panel**: `https://api.crossinsurancepr.com/admin/`
- **API Root**: `https://api.crossinsurancepr.com/api/`
- **Frontend**: `https://www.crossinsurancepr.com`
- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com
- **DNS Registrar**: https://dcc.godaddy.com

---

_Document maintained in `support/PROJECT_OVERVIEW.md`. Update it whenever architecture or workflows change to keep the template fresh for future projects._
