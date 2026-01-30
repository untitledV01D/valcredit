## Quick Start

Puedes probar la aplicacion en los siguientes enlaces (placeholders):
- Frontend: https://valcredit-frontend.vercel.app
- Admin Console: https://valcredit-frontend.vercel.app/admin
- API Backend: https://valcredit-backend.onrender.com

## Backend
1. Instalar dependencias:
   ```bash
   cd backend
   npm install
   ```
2. Configurar el archivo `.env` con la base de datos.
3. Generar modelos:
   ```bash
   npx prisma generate
   ```
4. Iniciar:
   ```bash
   npm run dev
   ```

## Frontend
1. Instalar dependencias:
   ```bash
   cd frontend
   npm install
   ```
2. Configurar el archivo `.env` con la URL del backend.
3. Iniciar:
   ```bash
   npm run dev
   ```

## Notas Finales
- Uso PrismaORM para gestionar más fácilmente la base de datos. Dado que es un ORM se encarga de la creación de base de datos y migraciones.
- El proyecto incluye un archivo `database.sql` pero de hecho el script que ha generado prisma, pueden encontrarlo en prima/migrations. cada carpeta representa una "migración", y es a su vez el script que genera las tablas
