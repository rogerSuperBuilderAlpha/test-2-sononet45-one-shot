# Deployment Guide

This document provides detailed instructions for deploying the Label Verification System to production.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Railway/Render)](#backend-deployment-railwayrender)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

## Prerequisites

1. **OpenAI API Key**: Get from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. **Git Repository**: Push your code to GitHub
3. **Accounts**:
   - [Vercel](https://vercel.com) for frontend
   - [Railway](https://railway.app) or [Render](https://render.com) for backend

## Frontend Deployment (Vercel)

### Option 1: Deploy via Vercel Dashboard

1. **Connect Repository**
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Select the repository

2. **Configure Build Settings**
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel --prod

# Set environment variable
vercel env add VITE_API_URL
# Enter: https://your-backend-url.railway.app
```

## Backend Deployment (Railway/Render)

### Option 1: Railway

1. **Create New Project**
   - Go to [https://railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Configure Service**
   - Root Directory: `backend`
   - Start Command: `npm start`

3. **Environment Variables**
   ```
   OPENAI_API_KEY=your_openai_api_key
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Generate Domain**
   - Railway will auto-generate a domain
   - Copy this URL for frontend configuration

### Option 2: Render

1. **Create New Web Service**
   - Go to [https://render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repository

2. **Configure Service**
   - Name: `label-verification-backend`
   - Environment: `Node`
   - Region: Choose closest to users
   - Branch: `main`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**
   ```
   OPENAI_API_KEY=your_openai_api_key
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Copy the generated URL

### Option 3: Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
cd backend
heroku create your-app-name

# Set environment variables
heroku config:set OPENAI_API_KEY=your_openai_api_key
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend-url.vercel.app

# Deploy
git subtree push --prefix backend heroku main

# Or if above doesn't work:
git push heroku `git subtree split --prefix backend main`:main --force
```

## Environment Variables

### Backend (.env)

```bash
# Required
OPENAI_API_KEY=sk-...your-key-here

# Optional (with defaults)
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env)

```bash
# Required
VITE_API_URL=https://your-backend.railway.app
```

## Post-Deployment

### 1. Update Frontend with Backend URL

After deploying the backend, update the frontend's `VITE_API_URL`:

**Vercel:**
```bash
vercel env add VITE_API_URL production
# Enter your backend URL
vercel --prod
```

Or via Vercel Dashboard:
- Go to Project Settings → Environment Variables
- Add `VITE_API_URL` with your backend URL
- Redeploy

### 2. Update Backend with Frontend URL

Update the backend's `FRONTEND_URL` for CORS:

**Railway:**
- Go to Variables
- Update `FRONTEND_URL` with your Vercel URL

**Render:**
- Go to Environment
- Update `FRONTEND_URL`
- Render auto-redeploys

### 3. Test the Application

1. Visit your frontend URL
2. Fill in the form with sample data
3. Upload a test label image
4. Verify the results display correctly

### 4. Monitor Logs

**Railway:**
```bash
railway logs
```

**Render:**
- View logs in the dashboard under "Logs" tab

**Vercel:**
```bash
vercel logs
```

## Troubleshooting

### CORS Errors

Ensure `FRONTEND_URL` is set correctly in backend environment variables.

### 500 Internal Server Error

Check backend logs for OpenAI API errors. Verify `OPENAI_API_KEY` is set.

### Build Failures

**Frontend:**
- Ensure Node.js version ≥ 18
- Check all dependencies are installed

**Backend:**
- Verify `package.json` exists in backend directory
- Check `npm install` runs successfully

### Image Upload Issues

- Verify backend has write permissions for `uploads/` directory
- Check file size limits (10MB default)
- Ensure proper MIME types are allowed

## Cost Considerations

### OpenAI API

- GPT-4 Vision costs ~$0.01-0.03 per image analysis
- Set up usage limits in OpenAI dashboard
- Monitor usage at [https://platform.openai.com/usage](https://platform.openai.com/usage)

### Hosting

- **Vercel**: Free tier includes 100GB bandwidth
- **Railway**: Free tier with $5 credit (requires credit card)
- **Render**: Free tier available (may sleep after inactivity)

## Security Checklist

- ✅ Never commit `.env` files
- ✅ Use environment variables for all secrets
- ✅ Enable CORS only for your frontend domain
- ✅ Set up rate limiting for production
- ✅ Monitor API usage and costs
- ✅ Use HTTPS for all endpoints
- ✅ Implement file upload size limits

## Continuous Deployment

Both Vercel and Railway/Render support automatic deployments:

1. Push to `main` branch
2. Services auto-detect changes
3. Automatic build and deployment
4. Zero-downtime updates

To disable auto-deployment, check the platform settings.

## Support

For deployment issues:
- Vercel: [https://vercel.com/docs](https://vercel.com/docs)
- Railway: [https://docs.railway.app](https://docs.railway.app)
- Render: [https://render.com/docs](https://render.com/docs)
- OpenAI: [https://platform.openai.com/docs](https://platform.openai.com/docs)

