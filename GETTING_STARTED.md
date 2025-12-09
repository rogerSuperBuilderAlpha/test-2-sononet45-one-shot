# Getting Started with TTB Label Verification System

Welcome! This guide will walk you through getting the application running on your local machine in about 5 minutes.

## 📋 What You'll Need

Before starting, make sure you have:

- ✅ **Node.js 18+** installed ([download](https://nodejs.org/))
- ✅ **npm** (comes with Node.js)
- ✅ **OpenAI API Key** with GPT-4 Vision access ([get one](https://platform.openai.com/api-keys))
- ✅ A code editor (VS Code, Sublime, etc.)
- ✅ Terminal/Command Prompt

**Check your Node.js version:**
```bash
node --version
# Should show v18.0.0 or higher
```

## 🚀 Installation Steps

### Step 1: Clone the Repository

```bash
# Clone the repo
git clone <your-repository-url>

# Navigate into the directory
cd test-2
```

### Step 2: Install Dependencies

```bash
# Install all dependencies at once (backend + frontend)
npm run install:all
```

This will install:
- Root dependencies
- Backend dependencies (Express, OpenAI, etc.)
- Frontend dependencies (React, Vite, etc.)

**Expected output:**
```
added 250 packages in 30s
```

### Step 3: Set Up Backend Environment

```bash
# Navigate to backend
cd backend

# Create .env file
# On Mac/Linux:
cat > .env << 'EOF'
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EOF

# On Windows (PowerShell):
# Create the file manually or use:
@"
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
"@ | Out-File -FilePath .env -Encoding utf8
```

**⚠️ IMPORTANT:** Replace `sk-your-actual-api-key-here` with your real OpenAI API key!

**Don't have an API key yet?**
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-`)
5. Paste it into your `.env` file

### Step 4: Set Up Frontend Environment

```bash
# Navigate to frontend (from backend directory)
cd ../frontend

# Create .env file
# On Mac/Linux:
echo "VITE_API_URL=http://localhost:3001" > .env

# On Windows (PowerShell):
"VITE_API_URL=http://localhost:3001" | Out-File -FilePath .env -Encoding utf8
```

### Step 5: Start the Application

```bash
# Go back to root directory
cd ..

# Start both backend and frontend
npm run dev
```

**You should see:**
```
🚀 Label Verification API running on port 3001
📝 Environment: development
🔑 OpenAI API Key: Configured

VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Success!** 🎉 The application is now running.

### Step 6: Open in Browser

Open your browser and go to:
```
http://localhost:5173
```

You should see the TTB Label Verification System interface.

## ✅ Verify Installation

### Test 1: Backend Health Check

Open a new terminal and run:
```bash
curl http://localhost:3001/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "Label Verification API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Test 2: Frontend Loads

- Go to http://localhost:5173
- You should see a purple gradient header
- Form fields should be visible
- No errors in browser console

### Test 3: Quick Scenario Test

1. Click one of the "Scenario" buttons (A, B, or C)
2. Form should auto-fill with sample data
3. Upload any image file (for now, any image works for testing)
4. Click "Verify Label"
5. You should see results after 3-5 seconds

## 🎯 Next Steps

Now that it's running, you can:

1. **Read the README**
   - Full documentation: [README.md](./README.md)
   - Understand how it works

2. **Try Different Scenarios**
   - Use the quick scenario buttons
   - Upload different label images
   - Test the verification logic

3. **Explore the Code**
   - Backend: `backend/server.js`
   - Frontend: `frontend/src/App.jsx`
   - Styling: `frontend/src/App.css`

4. **Deploy to Production**
   - Follow: [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Deploy frontend to Vercel
   - Deploy backend to Railway

5. **Run Tests**
   - See: [TESTING.md](./TESTING.md)
   - Try different test scenarios
   - Test edge cases

## 🐛 Troubleshooting

### Backend won't start

**Error: "OPENAI_API_KEY is not defined"**

✅ **Solution:**
```bash
cd backend
ls -la .env
# If .env doesn't exist, create it (see Step 3)
```

**Error: "Port 3001 already in use"**

✅ **Solution:**
```bash
# Find what's using the port
lsof -i :3001

# Kill the process
kill -9 <PID>

# Or change the port in backend/.env
PORT=3002
```

### Frontend won't start

**Error: "Port 5173 already in use"**

✅ **Solution:**
```bash
# Find and kill the process
lsof -i :5173
kill -9 <PID>
```

**Error: "Cannot find module"**

✅ **Solution:**
```bash
cd frontend
rm -rf node_modules
npm install
```

### CORS Errors

**Error in browser console: "CORS policy blocked"**

✅ **Solution:**
```bash
# Check backend .env has correct frontend URL
cd backend
grep FRONTEND_URL .env
# Should be: FRONTEND_URL=http://localhost:5173
```

### OpenAI API Errors

**Error: "Incorrect API key"**

✅ **Solution:**
1. Check your API key is valid
2. Make sure it starts with `sk-`
3. Verify no extra spaces or quotes
4. Create a new key if needed

**Error: "You exceeded your current quota"**

✅ **Solution:**
1. Go to [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing)
2. Add payment method
3. Add credits ($5-10 is enough for testing)

### Dependencies Issues

**Error: "npm ERR!"**

✅ **Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete all node_modules
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf backend/node_modules

# Reinstall
npm run install:all
```

## 📝 File Checklist

Make sure these files exist:

```
✅ backend/.env (with your OpenAI API key)
✅ frontend/.env (with VITE_API_URL)
✅ backend/node_modules/
✅ frontend/node_modules/
✅ node_modules/
```

## 🔧 Development Tips

### Running Frontend and Backend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Checking Logs

**Backend logs** show in the terminal:
- API requests
- OpenAI API calls
- Errors

**Frontend logs** in browser console (F12):
- React errors
- API responses
- Validation messages

### Making Changes

**Backend changes:**
- Edit `backend/server.js`
- Server auto-restarts (using `--watch`)

**Frontend changes:**
- Edit `frontend/src/App.jsx` or `App.css`
- Browser auto-refreshes

## 💡 Quick Tips

1. **Keep terminals open** - Don't close the terminal running `npm run dev`

2. **Check both logs** - Backend terminal shows API logs, browser console shows frontend logs

3. **Use sample scenarios** - The A/B/C buttons are great for quick testing

4. **Watch for errors** - Red text in terminal = something's wrong

5. **OpenAI costs money** - Each verification costs ~$0.01-0.03

## 📚 Additional Resources

- **Full Documentation:** [README.md](./README.md)
- **Environment Setup:** [ENV_SETUP.md](./ENV_SETUP.md)
- **Deployment Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Testing Guide:** [TESTING.md](./TESTING.md)
- **Sample Labels:** [SAMPLE_LABELS.md](./SAMPLE_LABELS.md)

## 🎓 Understanding the Flow

1. User fills form + uploads image
2. Frontend sends to backend API
3. Backend calls OpenAI GPT-4 Vision
4. AI extracts text from label
5. Backend compares submitted vs. extracted data
6. Results sent back to frontend
7. Frontend displays verification results

## ✨ You're All Set!

You now have a fully functional AI-powered label verification system running locally.

**Try it out:**
1. Click "Scenario A" button
2. Upload any label image
3. Click "Verify Label"
4. See the magic happen! ✨

---

**Need Help?** Check the [README.md](./README.md) troubleshooting section or open an issue on GitHub.

**Happy Verifying! 🎉**

