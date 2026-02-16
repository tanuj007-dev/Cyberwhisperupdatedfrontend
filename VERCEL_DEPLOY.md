# Deploy CyberWhisper to Vercel

## 1. Push code to GitHub

Make sure your project is in a GitHub repository (you already pushed it).

## 2. Import project in Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in (use GitHub if needed).
2. Click **Add New…** → **Project**.
3. **Import** your `cyberwhisper` (or repo name) repository.
4. Vercel will detect **Next.js** and set:
   - **Framework Preset:** Next.js  
   - **Build Command:** `next build` (or leave default)  
   - **Output Directory:** leave default  
   - **Install Command:** `npm install` (default)

## 3. Environment variables (recommended)

In the import screen (or later in **Project → Settings → Environment Variables**), add:

| Name | Value | Notes |
|------|--------|--------|
| `NEXT_PUBLIC_BACKEND_API_URL` | `https://darkred-mouse-801836.hostingersite.com` | Backend API (no trailing slash). Used by frontend. |
| `BACKEND_API_URL` | `https://darkred-mouse-801836.hostingersite.com` | Used by Next.js API routes (server-side). |

**Optional (if you use them):**

- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` – for image uploads.
- `NEWSLETTER_SERVICE_TOKEN` or `ADMIN_SERVICE_TOKEN` – if your backend needs them for newsletter/admin.

If you don’t set these, the app still runs using the default backend URL in code.

## 4. Deploy

1. Click **Deploy**.
2. Wait for the build to finish.
3. Your app will be at:  
   `https://<your-project>-<random>.vercel.app`  
   (or your custom domain if you add one).

## 5. After deploy

- **Admin login:** `https://<your-vercel-url>/admin/login`
- The frontend will call your backend at `https://darkred-mouse-801836.hostingersite.com` for courses, users, brochures, etc.
- Ensure your **backend** allows requests from your Vercel origin (CORS) if the browser calls it directly.

## Troubleshooting

- **Build fails:** Check the build log; often it’s a missing dependency or Node version. Vercel uses Node 18 by default; your app should be fine.
- **404 on routes:** Next.js app router is used; no extra config needed for `/admin/*` or `/api/*`.
- **API errors:** Confirm `NEXT_PUBLIC_BACKEND_API_URL` and `BACKEND_API_URL` are set (or that the default URL is correct) and that the backend is reachable from the internet.
