# HVAC Pro Catalog

A multi-role HVAC product catalog platform for distributors, dealers, and admins. Built as a fully client-side React app — no backend required for the prototype.

## Features

- **Role-gated pricing** — distributors and dealers see their respective pricing tiers
- **Product catalog** — 13 SKUs across 5 categories (Air Conditioners, Heat Pumps, Air Handlers, Gas Furnaces, Evaporator Coils)
- **System Builder** — select an outdoor unit and see AHRI-certified compatible system matchups
- **My Catalogs** — save curated product selections as named catalogs
- **Admin dashboard** — SKU table, brand breakdown, and platform stats (admin role only)

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@hvacpro.com` | `admin123` |
| Distributor | `dist@acmehvac.com` | `dist123` |
| Dealer | `dealer@coolhvac.com` | `dealer123` |

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Wouter (hash routing)
- **Backend:** Express (serves static build in production)
- **Data:** All product data is client-side in `client/src/lib/localData.ts` — no database needed

## Development

```bash
npm install
npm run dev
```

App runs at `http://localhost:5000`.

## Production Build

```bash
npm run build
npm start
```

## Deployment

This repo includes a `render.yaml` for one-click deploy to [Render](https://render.com).

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)
