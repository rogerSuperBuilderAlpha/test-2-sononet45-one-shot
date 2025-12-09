# Vercel Deployment Fix

## The Issue

You're getting this error:
```
sh: line 1: cd: frontend: No such file or directory
Error: Command "cd frontend && npm install && npm run build" exited with 1
```

This happens because we have a monorepo structure, and Vercel needs to know which directory to deploy.

## Solution: Configure Root Directory in Vercel Dashboard

### Step 1: Go to Project Settings

1. Go to your Vercel project dashboard
2. Click on "Settings"
3. Go to "General" section

### Step 2: Set Root Directory

1. Find "Root Directory" setting
2. Click "Edit"
3. Enter: `frontend`
4. Click "Save"

### Step 3: Configure Build Settings

In the same Settings page, under "Build & Development Settings":

1. **Framework Preset:** Vite
2. **Build Command:** `npm run build` (default is fine)
3. **Output Directory:** `dist` (default is fine)
4. **Install Command:** `npm install` (default is fine)

### Step 4: Add Environment Variable

1. Go to "Environment Variables"
2. Add new variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `http://localhost:3001` (for now, update after backend is deployed)
   - **Environment:** All (Production, Preview, Development)
3. Click "Save"

### Step 5: Redeploy

1. Go to "Deployments" tab
2. Click the three dots on the latest deployment
3. Click "Redeploy"
4. ✅ Should work now!

## Alternative: Deploy via CLI with Correct Directory

```bash
cd frontend
vercel --prod
```

When prompted:
- Set root directory to current directory (frontend)
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

## After Successful Deployment

1. Note your frontend URL (e.g., `https://your-app.vercel.app`)
2. Deploy backend (see DEPLOYMENT.md)
3. Update frontend environment variable:
   - Go to Vercel → Settings → Environment Variables
   - Edit `VITE_API_URL` 
   - Change to your backend URL (e.g., `https://your-backend.railway.app`)
   - Redeploy

## Quick Fix Commands

```bash
# If you want to deploy just the frontend
cd frontend
vercel --prod

# Or update vercel.json to be inside frontend directory
# (Move vercel.json into the frontend folder)
```

## What Went Wrong

The `vercel.json` at the root level was trying to navigate into the frontend directory, but Vercel's build process needed to know the root directory is `frontend` from the start.

By setting "Root Directory" to `frontend` in Vercel's dashboard, it starts the build process inside the frontend folder, so all commands work correctly.

---

**Next:** After frontend deploys successfully, deploy the backend following DEPLOYMENT.md, then update the `VITE_API_URL` environment variable.

