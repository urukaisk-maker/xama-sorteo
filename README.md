# XAMA · Sorteo de Cesta Solidaria

Aplicación web para el sorteo solidario de cestas de comida de la **ONG XAMA**.
La participación es **gratuita**: no se compran boletos. Se reparten 40 números y se sortea uno al azar entre los asignados.

🔗 **Demo en producción:** https://xama-sorteo.vercel.app

---

## ✨ Características

- Sorteo visual de 40 números con animación tipo ruleta.
- Selección aleatoria segura mediante `crypto.getRandomValues`.
- Resultado destacado en tiempo real, sin recargar la página.
- Diseño oscuro con estética futurista (cian sobre negro).
- Totalmente responsive (móvil, tablet, escritorio).
- Footer con términos de uso, política de privacidad y política de cookies en modales.
- Favicon propio.

---

## 🛠️ Tecnologías

| Capa | Tecnología |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router + Turbopack) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| ORM | [Prisma 7](https://www.prisma.io/) |
| Base de datos | PostgreSQL ([Neon](https://neon.tech/)) |
| Despliegue | [Vercel](https://vercel.com/) |
| Gestor de paquetes | npm |

---

## 🚀 Puesta en marcha

### Requisitos

- Node.js 20 o superior
- Una base de datos PostgreSQL (recomendado: Neon, gratuito)

### Instalación

```bash
git clone git@github.com:urukaisk-maker/xama-sorteo.git
cd xama-sorteo
npm install
```

### Variables de entorno

Crea un archivo `.env` en la raíz con:

```env
DATABASE_URL="postgresql://usuario:password@host-pooler.region.aws.neon.tech/neondb?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://usuario:password@host.region.aws.neon.tech/neondb?sslmode=require"
```

- `DATABASE_URL`: cadena **con** `-pooler` (la usa la app).
- `DATABASE_URL_UNPOOLED`: cadena **sin** `-pooler` (la usan las migraciones).

### Base de datos

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

El seed crea un sorteo con los 40 números en estado `disponible`.

### Desarrollo

```bash
npm run dev
```

Abre http://localhost:3000.

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (genera Prisma + compila Next) |
| `npm start` | Sirve el build de producción |
| `npm run lint` | Linter |
| `npm run db:migrate` | Crea y aplica una migración |
| `npm run db:seed` | Ejecuta el seed |
| `npm run db:studio` | Abre Prisma Studio |

---

## 📂 Estructura del proyecto

```
xama-sorteo/
├── prisma/
│   ├── schema.prisma        # Modelos Sorteo, Numero
│   ├── seed.ts              # Seed inicial
│   └── migrations/          # Migraciones
├── src/
│   ├── app/
│   │   ├── page.tsx         # Página principal (server)
│   │   ├── Sorteo.tsx       # Componente cliente con la ruleta
│   │   ├── Footer.tsx       # Footer con modales
│   │   ├── layout.tsx       # Layout raíz
│   │   ├── globals.css      # Estilos globales
│   │   └── icon.svg         # Favicon
│   └── lib/
│       └── prisma.ts        # Cliente Prisma compartido
├── prisma.config.ts         # Configuración de Prisma 7
└── package.json
```

---

## ☁️ Despliegue en Vercel

1. Conecta el repositorio en [vercel.com/new](https://vercel.com/new).
2. En **Environment Variables**, añade:
   - `DATABASE_URL` (con `-pooler`)
   - `DATABASE_URL_UNPOOLED` (sin `-pooler`)
3. Deploy.

Cada `git push` a `main` redespliega automáticamente.

> Si modificas el esquema de Prisma, ejecuta desde tu máquina:
> ```bash
> npx prisma migrate deploy
> ```
> El build de Vercel no aplica migraciones.

---

## 👤 Autor

Desarrollado por **[Manuel Casimiro Carrasco](https://unique-biscochitos-31bcea.netlify.app/)**

---

## 📄 Licencia

Proyecto solidario de la **ONG XAMA**. Todos los derechos reservados.
