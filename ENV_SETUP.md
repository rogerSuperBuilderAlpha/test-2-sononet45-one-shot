# Environment Variables Setup Guide

This guide will help you set up environment variables for local development and production deployment.

## 🎯 Overview

The application requires environment variables for:
- **Backend:** OpenAI API key, server configuration
- **Frontend:** Backend API URL

## 📋 Quick Setup

### 1. Backend Environment Variables

Create `backend/.env`:

```bash
cd backend
cat > .env << 'EOF'
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EOF
```

### 2. Frontend Environment Variables

Create `frontend/.env`:

```bash
cd frontend
cat > .env << 'EOF'
VITE_API_URL=http://localhost:3001
EOF
```

### 3. Get Your OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Give it a name (e.g., "TTB Label Verification")
5. Copy the key (starts with `sk-...`)
6. Replace `your_openai_api_key_here` in `backend/.env`

**⚠️ Important Notes:**
- You need a **paid OpenAI account** with GPT-4 Vision access
- Never share or commit your API key
- The key is shown only once - save it securely
- Set up billing limits at [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing)

## 📝 Detailed Configuration

### Backend Variables

#### Required

**`OPENAI_API_KEY`**
- **Description:** Your OpenAI API key for GPT-4 Vision
- **Format:** `sk-...` (starts with sk-)
- **Get it:** [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Cost:** ~$0.01-0.03 per image verification
- **Example:** `sk-proj-abc123...`

#### Optional (with defaults)

**`PORT`**
- **Description:** Port for backend server
- **Default:** `3001`
- **Example:** `3001`
- **Note:** Change if port 3001 is in use

**`NODE_ENV`**
- **Description:** Environment mode
- **Values:** `development` | `production`
- **Default:** `development`
- **Example:** `development`

**`FRONTEND_URL`**
- **Description:** Frontend URL for CORS
- **Default:** `http://localhost:5173`
- **Example:** `http://localhost:5173`
- **Production:** Set to your Vercel URL

### Frontend Variables

#### Required

**`VITE_API_URL`**
- **Description:** Backend API URL
- **Development:** `http://localhost:3001`
- **Production:** Your Railway/Render URL
- **Example:** `http://localhost:3001`

**Note:** Vite requires prefix `VITE_` for client-side variables

## 🌐 Production Setup

### Frontend (Vercel)

**Via Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend.railway.app`
   - **Environment:** Production
3. Redeploy

**Via CLI:**
```bash
vercel env add VITE_API_URL production
# Enter: https://your-backend.railway.app
vercel --prod
```

### Backend (Railway)

**Via Dashboard:**
1. Go to your service → Variables
2. Add variables:
   - `OPENAI_API_KEY`: `sk-your-key`
   - `NODE_ENV`: `production`
   - `PORT`: `3001` (or leave for auto-assign)
   - `FRONTEND_URL`: `https://your-frontend.vercel.app`
3. Deploy

**Via CLI:**
```bash
railway variables set OPENAI_API_KEY=sk-your-key
railway variables set NODE_ENV=production
railway variables set FRONTEND_URL=https://your-frontend.vercel.app
```

### Backend (Render)

**Via Dashboard:**
1. Go to service → Environment
2. Add Environment Variables:
   - `OPENAI_API_KEY`: `sk-your-key`
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `FRONTEND_URL`: `https://your-frontend.vercel.app`
3. Save Changes (auto-redeploys)

## ✅ Verification

### Backend Health Check

```bash
# Local
curl http://localhost:3001/api/health

# Production
curl https://your-backend.railway.app/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Label Verification API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Check Environment Variables

**Backend:**
```bash
cd backend
node -e "require('dotenv').config(); console.log('OpenAI Key:', process.env.OPENAI_API_KEY ? 'Set ✅' : 'Missing ❌')"
```

**Frontend:**
```bash
cd frontend
cat .env
```

### Check Backend Logs

The backend logs will show:
```
🚀 Label Verification API running on port 3001
📝 Environment: development
🔑 OpenAI API Key: Configured
```

If you see `OpenAI API Key: Missing`, check your `.env` file.

## 🔒 Security Best Practices

### ✅ DO

- ✅ Use `.env` files for local development
- ✅ Add `.env` to `.gitignore` (already done)
- ✅ Use platform environment variables for production
- ✅ Rotate API keys regularly
- ✅ Set up billing alerts on OpenAI
- ✅ Use different keys for dev and production
- ✅ Store backup of keys in secure password manager

### ❌ DON'T

- ❌ Commit `.env` files to git
- ❌ Share API keys in screenshots
- ❌ Hardcode keys in source code
- ❌ Post keys in issues or pull requests
- ❌ Use production keys in development
- ❌ Share keys via email or chat
- ❌ Leave keys in browser console logs

## 🚨 What If My Key Is Exposed?

If you accidentally commit or expose your API key:

### 1. Immediately Revoke the Key
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Find the compromised key
3. Click "Revoke"

### 2. Create a New Key
1. Click "Create new secret key"
2. Save it securely
3. Update your environment variables

### 3. Remove from Git History
```bash
# If committed
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (be careful!)
git push origin --force --all
```

### 4. Check for Usage
1. Check OpenAI usage dashboard
2. Look for unexpected API calls
3. Set up billing alerts

## 💰 Cost Management

### OpenAI API Costs

**GPT-4 Vision Pricing (as of 2024):**
- Input: ~$0.01 per image
- Output: ~$0.03 per 1K tokens

**Estimated Costs:**
- Per verification: $0.01 - $0.03
- 100 verifications: $1 - $3
- 1000 verifications: $10 - $30

### Set Up Billing Limits

1. Go to [https://platform.openai.com/account/billing/limits](https://platform.openai.com/account/billing/limits)
2. Set a monthly budget (e.g., $50)
3. Enable email notifications
4. Set up usage alerts

### Monitor Usage

Check usage at: [https://platform.openai.com/usage](https://platform.openai.com/usage)

## 🐛 Troubleshooting

### "OPENAI_API_KEY is not defined"

**Cause:** `.env` file missing or not loaded

**Solution:**
```bash
cd backend
# Check if .env exists
ls -la .env

# If missing, create it
cp .env.example .env

# Add your key
nano .env  # or use any editor
```

### "Incorrect API key provided"

**Cause:** Invalid or revoked key

**Solution:**
1. Verify key starts with `sk-`
2. Check for extra spaces or newlines
3. Create new key if necessary

### "You exceeded your current quota"

**Cause:** No credits or billing not set up

**Solution:**
1. Go to [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing)
2. Add payment method
3. Add credits

### "CORS Error" in browser

**Cause:** `FRONTEND_URL` mismatch

**Solution:**
```bash
# Check backend .env
cd backend
grep FRONTEND_URL .env

# Should match your frontend URL exactly
# Local: http://localhost:5173
# Prod: https://your-app.vercel.app
```

### "Network Error" when submitting

**Cause:** Backend not running or wrong URL

**Solution:**
```bash
# Check backend is running
curl http://localhost:3001/api/health

# Check frontend .env
cd frontend
cat .env
# Should be: VITE_API_URL=http://localhost:3001
```

## 📋 Checklist

Before running the app:

- [ ] Backend `.env` file created
- [ ] OpenAI API key added to backend `.env`
- [ ] OpenAI API key is valid (starts with `sk-`)
- [ ] OpenAI account has credits
- [ ] Frontend `.env` file created
- [ ] Frontend `VITE_API_URL` points to backend
- [ ] `.env` files are in `.gitignore`
- [ ] Backend health check works
- [ ] No API keys in source code

## 📞 Getting Help

**OpenAI API Issues:**
- Documentation: [https://platform.openai.com/docs](https://platform.openai.com/docs)
- Support: [https://help.openai.com](https://help.openai.com)

**Deployment Issues:**
- Vercel: [https://vercel.com/docs](https://vercel.com/docs)
- Railway: [https://docs.railway.app](https://docs.railway.app)
- Render: [https://render.com/docs](https://render.com/docs)

---

**Remember:** Never commit `.env` files to git! 🔒

