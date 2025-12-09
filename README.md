# TTB Label Verification System

AI-Powered Alcohol Beverage Label Compliance Tool for the Alcohol and Tobacco Tax and Trade Bureau (TTB).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)

## 🎯 Overview

This application streamlines the TTB label verification process by using AI to extract information from alcohol label images and automatically compare it against submitted application data. It reduces the tedious manual verification work for compliance officers while maintaining accuracy and creating detailed audit trails.

### Key Features

- **🤖 AI-Powered OCR**: Uses OpenAI GPT-4 Vision to extract text from label images
- **🔍 Intelligent Matching**: Handles variations in formatting (e.g., "750ml" vs "750 mL" vs "75cl")
- **📊 Detailed Reports**: Provides comprehensive verification results with specific discrepancies
- **⚡ Fast Processing**: 3-5 second analysis time per label
- **💾 Audit Trail**: Timestamped results for compliance documentation
- **🎨 Modern UI**: Clean, intuitive interface designed for daily use
- **📱 Responsive**: Works on desktop, tablet, and mobile devices

## 📋 Table of Contents

- [Demo](#-demo)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running Locally](#-running-locally)
- [Usage](#-usage)
- [Testing Scenarios](#-testing-scenarios)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Demo

**Live Application**: [Deploy to get URL - see DEPLOYMENT.md]

**Repository**: https://github.com/rogerSuperBuilderAlpha/test-2-sononet45-one-shot

### Sample Screenshots

*(Upload screenshots of your deployed application and reference them here)*

## 🛠 Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Custom styling with modern design

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **OpenAI GPT-4 Vision** - Image analysis and text extraction
- **Multer** - File upload handling

### Deployment
- **Vercel** - Frontend hosting
- **Railway/Render** - Backend hosting

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
  - Download from [https://nodejs.org/](https://nodejs.org/)
  - Verify: `node --version`

- **npm** (comes with Node.js)
  - Verify: `npm --version`

- **Git**
  - Download from [https://git-scm.com/](https://git-scm.com/)
  - Verify: `git --version`

- **OpenAI API Key**
  - Sign up at [https://platform.openai.com/](https://platform.openai.com/)
  - Create API key at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
  - **Note**: You need GPT-4 Vision access (requires paid account)

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd test-2
```

### 2. Install Dependencies

#### Option A: Install All at Once
```bash
npm run install:all
```

#### Option B: Install Separately
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## ⚙️ Configuration

### Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your OpenAI API key:
   ```env
   # Required
   OPENAI_API_KEY=sk-your-actual-api-key-here

   # Optional (defaults shown)
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

   **⚠️ Important**: Never commit the `.env` file to Git. It's already in `.gitignore`.

### Frontend Configuration

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Create a `.env` file:
   ```bash
   # For local development
   echo "VITE_API_URL=http://localhost:3001" > .env
   ```

   For production, set this to your deployed backend URL.

## 🏃 Running Locally

### Method 1: Run Both Frontend and Backend Together

From the root directory:

```bash
npm run dev
```

This will start:
- Backend API on [http://localhost:3001](http://localhost:3001)
- Frontend app on [http://localhost:5173](http://localhost:5173)

### Method 2: Run Separately

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

### Verify Installation

1. **Backend Health Check**: Visit [http://localhost:3001/api/health](http://localhost:3001/api/health)
   - Should return: `{"status": "ok", "message": "Label Verification API is running"}`

2. **Frontend**: Visit [http://localhost:5173](http://localhost:5173)
   - Should see the TTB Label Verification System interface

## 📖 Usage

### Step 1: Prepare Your Data

Gather the following information:
- Brand Name (e.g., "Old Tom Distillery")
- Product Class/Type (e.g., "Kentucky Straight Bourbon Whiskey")
- Alcohol Content (e.g., "45%")
- Net Contents (e.g., "750 mL")
- Label image (JPG, PNG, GIF, or WebP, max 10MB)

### Step 2: Submit for Verification

1. Open the application in your browser
2. Fill in the product information form
3. Upload the label image
4. Click "Verify Label"

### Step 3: Review Results

The system will:
1. Analyze the label image using AI
2. Extract text information
3. Compare against submitted data
4. Display detailed results with:
   - Overall match status (Approved/Rejected)
   - Field-by-field comparison
   - Specific discrepancy reasons
   - AI confidence level
   - Timestamp for audit trail

### Step 4: Document Results

- Screenshot or print results for your records
- Use timestamp for tracking
- Review additional information found on label

## 🧪 Testing Scenarios

The application includes three sample scenarios to demonstrate functionality:

### Scenario A: Perfect Match
```
Brand Name: Old Tom Distillery
Product Type: Kentucky Straight Bourbon Whiskey
Alcohol Content: 45%
Net Contents: 750 mL
```
**Expected Result**: ✅ All fields match

### Scenario B: Brand Name Mismatch
```
Brand Name: Tom's Distillery
Product Type: Kentucky Straight Bourbon Whiskey
Alcohol Content: 45%
Net Contents: 750 mL
```
**Expected Result**: ❌ Brand name does not match

### Scenario C: ABV Mismatch
```
Brand Name: Old Tom Distillery
Product Type: Kentucky Straight Bourbon Whiskey
Alcohol Content: 40%
Net Contents: 750 mL
```
**Expected Result**: ❌ Alcohol content does not match

**Note**: You'll need to provide your own label image for testing. Use the "Quick Test Scenarios" buttons to auto-fill forms.

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Frontend (Vercel):**
```bash
cd frontend
vercel --prod
```

**Backend (Railway):**
1. Push code to GitHub
2. Connect repository on Railway
3. Set environment variables
4. Deploy

### Environment Variables for Production

**Backend:**
- `OPENAI_API_KEY` - Your OpenAI API key
- `NODE_ENV` - Set to `production`
- `PORT` - Port number (usually auto-assigned)
- `FRONTEND_URL` - Your Vercel frontend URL

**Frontend:**
- `VITE_API_URL` - Your Railway/Render backend URL

## 📚 API Documentation

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Label Verification API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Verify Label
```http
POST /api/verify
Content-Type: multipart/form-data
```

**Request Body:**
- `labelImage` (file) - Image file of the label
- `brandName` (string) - Brand name from application
- `productType` (string) - Product class/type
- `alcoholContent` (string) - ABV percentage
- `netContents` (string) - Volume

**Response:**
```json
{
  "success": true,
  "results": {
    "overallMatch": true,
    "fields": {
      "brandName": {
        "submitted": "Old Tom Distillery",
        "extracted": "Old Tom Distillery",
        "match": true,
        "reason": "Match"
      },
      "productType": {
        "submitted": "Kentucky Straight Bourbon Whiskey",
        "extracted": "Kentucky Straight Bourbon Whiskey",
        "match": true,
        "reason": "Match"
      },
      "alcoholContent": {
        "submitted": "45%",
        "extracted": "45%",
        "match": true,
        "reason": "Match"
      },
      "netContents": {
        "submitted": "750 mL",
        "extracted": "750 mL",
        "match": true,
        "reason": "Match"
      }
    },
    "confidence": "high",
    "additionalInfo": "90 Proof, Bottler information...",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "error": "Failed to verify label",
  "message": "Detailed error message"
}
```

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                      (React + Vite)                          │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐      │
│  │   Form     │  │   Image    │  │    Results       │      │
│  │   Input    │──│   Upload   │──│    Display       │      │
│  └────────────┘  └────────────┘  └──────────────────┘      │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP Request (multipart/form-data)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                         Backend                              │
│                    (Express + Node.js)                       │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐      │
│  │   Multer   │  │  OpenAI    │  │   Verification   │      │
│  │   Upload   │──│   Vision   │──│     Logic        │      │
│  └────────────┘  └────────────┘  └──────────────────┘      │
└──────────────────────┬──────────────────────────────────────┘
                       │ API Call
                       ▼
              ┌─────────────────┐
              │   OpenAI API    │
              │  (GPT-4 Vision) │
              └─────────────────┘
```

### Data Flow

1. User submits form with label image
2. Frontend sends multipart form data to backend
3. Backend validates and stores temporary image
4. Image is sent to OpenAI GPT-4 Vision API
5. AI extracts label information
6. Backend compares extracted vs. submitted data
7. Results are processed and formatted
8. Temporary image is deleted
9. Results are returned to frontend
10. Frontend displays verification results

## 🔒 Security

### Best Practices Implemented

- ✅ **No Secrets in Code**: Environment variables for all sensitive data
- ✅ **CORS Protection**: Whitelist only frontend domain
- ✅ **File Validation**: Type and size restrictions on uploads
- ✅ **Temporary Storage**: Images deleted after processing
- ✅ **Input Sanitization**: All inputs validated
- ✅ **HTTPS**: Enforced in production
- ✅ **Rate Limiting**: Recommended for production

### API Key Security

**⚠️ CRITICAL**: Never commit API keys to Git

- Use `.env` files (already in `.gitignore`)
- Use environment variables on deployment platforms
- Rotate keys if accidentally exposed
- Monitor usage on OpenAI dashboard
- Set up billing alerts

### Recommended Production Enhancements

```javascript
// Rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 🐛 Troubleshooting

### Common Issues

#### "OPENAI_API_KEY is not defined"
**Solution**: Ensure `.env` file exists in `backend/` with valid API key

#### CORS Errors
**Solution**: Check `FRONTEND_URL` in backend `.env` matches your frontend URL

#### "Network Error" when submitting
**Solution**: Ensure backend is running on port 3001

#### Image upload fails
**Solution**: 
- Check file size (max 10MB)
- Verify file format (JPG, PNG, GIF, WebP)
- Ensure `backend/uploads/` directory exists

#### "Failed to extract JSON from AI response"
**Solution**: 
- Check OpenAI API status
- Verify you have GPT-4 Vision access
- Ensure image quality is good

### Debug Mode

Enable detailed logging:

```javascript
// backend/server.js
console.log('Request received:', req.body);
console.log('OpenAI response:', response);
```

### Check Logs

**Local Development:**
```bash
# Backend logs appear in terminal
cd backend
npm run dev
```

**Production:**
- Railway: `railway logs`
- Render: View in dashboard
- Vercel: `vercel logs`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Update README for new features
- Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- OpenAI for GPT-4 Vision API
- TTB compliance officers for workflow insights
- React and Express communities

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review [Troubleshooting](#-troubleshooting) section

## 🎓 Learn More

- [OpenAI Vision API Documentation](https://platform.openai.com/docs/guides/vision)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Vite Documentation](https://vitejs.dev/)

---

**Built with ❤️ for TTB Compliance Officers**

*Making label verification faster, more accurate, and less tedious.*

