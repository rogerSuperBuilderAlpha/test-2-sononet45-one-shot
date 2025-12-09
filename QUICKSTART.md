# Quick Start Guide

Get the TTB Label Verification System running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- OpenAI API key (with GPT-4 Vision access)

## Steps

### 1. Clone & Install (2 minutes)

```bash
# Clone repository
git clone https://github.com/rogerSuperBuilderAlpha/test-2-sononet45-one-shot.git
cd test-2-sononet45-one-shot

# Install all dependencies
npm run install:all
```

### 2. Configure Backend (1 minute)

```bash
cd backend

# Create .env file
cat > .env << EOF
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EOF

cd ..
```

**⚠️ Replace `sk-your-actual-key-here` with your real OpenAI API key!**

### 3. Configure Frontend (30 seconds)

```bash
cd frontend

# Create .env file
echo "VITE_API_URL=http://localhost:3001" > .env

cd ..
```

### 4. Run Application (1 minute)

```bash
# From root directory
npm run dev
```

This starts:
- Backend on http://localhost:3001
- Frontend on http://localhost:5173

### 5. Test It! (30 seconds)

1. Open http://localhost:5173
2. Click any "Scenario" button to fill form
3. Upload a label image
4. Click "Verify Label"
5. See results in ~5 seconds

## That's it! 🎉

## Need Help?

**Backend won't start:**
```bash
# Check if port 3001 is in use
lsof -i :3001

# Kill process if needed
kill -9 <PID>
```

**Frontend won't start:**
```bash
# Check if port 5173 is in use
lsof -i :5173

# Kill process if needed
kill -9 <PID>
```

**Can't find OpenAI key:**
- Go to https://platform.openai.com/api-keys
- Click "Create new secret key"
- Copy and paste into backend/.env

**Still stuck?**
- See [README.md](./README.md) for detailed instructions
- See [TROUBLESHOOTING](#troubleshooting) section in README

## Next Steps

- Read [README.md](./README.md) for full documentation
- See [TESTING.md](./TESTING.md) for test scenarios
- See [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to production
- See [SAMPLE_LABELS.md](./SAMPLE_LABELS.md) for creating test labels

---

**Pro Tip:** Bookmark http://localhost:5173 for easy access during development.

