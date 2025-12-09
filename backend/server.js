import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Helper function to normalize text for comparison
function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s.]/g, '') // Remove special characters except dots
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper function to normalize volume measurements
function normalizeVolume(volume) {
  if (!volume) return '';
  const normalized = volume.toLowerCase().replace(/\s+/g, '');
  
  // Handle different volume formats
  const volumePatterns = [
    { regex: /(\d+\.?\d*)\s*ml/i, unit: 'ml' },
    { regex: /(\d+\.?\d*)\s*l/i, unit: 'l' },
    { regex: /(\d+\.?\d*)\s*cl/i, unit: 'cl' },
    { regex: /(\d+\.?\d*)\s*fl\s*oz/i, unit: 'floz' },
    { regex: /(\d+\.?\d*)\s*oz/i, unit: 'oz' },
  ];
  
  for (const pattern of volumePatterns) {
    const match = normalized.match(pattern.regex);
    if (match) {
      let value = parseFloat(match[1]);
      // Convert to ml for comparison
      if (pattern.unit === 'l') value *= 1000;
      if (pattern.unit === 'cl') value *= 10;
      if (pattern.unit === 'floz' || pattern.unit === 'oz') value *= 29.5735; // US fl oz to ml
      return Math.round(value * 100) / 100; // Round to 2 decimal places
    }
  }
  
  return normalized;
}

// Helper function to normalize ABV
function normalizeABV(abv) {
  if (!abv) return '';
  const match = abv.match(/(\d+\.?\d*)/);
  return match ? parseFloat(match[1]) : '';
}

// Helper function to check if two values are similar
function isSimilar(value1, value2, threshold = 0.85) {
  const norm1 = normalizeText(value1);
  const norm2 = normalizeText(value2);
  
  if (norm1 === norm2) return true;
  
  // Check if one contains the other
  if (norm1.includes(norm2) || norm2.includes(norm1)) return true;
  
  // Calculate similarity score using Levenshtein distance
  const distance = levenshteinDistance(norm1, norm2);
  const maxLength = Math.max(norm1.length, norm2.length);
  const similarity = maxLength > 0 ? 1 - (distance / maxLength) : 1;
  
  return similarity >= threshold;
}

// Levenshtein distance calculation
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Analyze label image using OpenAI Vision API
async function analyzeLabelImage(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = path.extname(imagePath).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are analyzing an alcohol beverage label. Extract the following information from the label image and return it in JSON format:

{
  "brandName": "The brand name as shown on the label",
  "productType": "The product class/type (e.g., 'Kentucky Straight Bourbon Whiskey', 'India Pale Ale')",
  "alcoholContent": "The ABV percentage (extract just the number)",
  "netContents": "The volume/net contents (e.g., '750 mL', '12 fl oz')",
  "additionalInfo": "Any other relevant information on the label",
  "confidence": "Your confidence level in the extraction (high/medium/low)"
}

Be precise and extract the exact text as it appears on the label. If any field is not visible or unclear, set it to null.`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.1, // Low temperature for consistent extraction
    });

    const content = response.choices[0].message.content;
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from AI response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}

// Verify label against submitted data
function verifyLabel(extractedData, submittedData) {
  const results = {
    overallMatch: true,
    fields: {},
    timestamp: new Date().toISOString(),
  };

  // Verify Brand Name
  const brandMatch = isSimilar(extractedData.brandName, submittedData.brandName);
  results.fields.brandName = {
    submitted: submittedData.brandName,
    extracted: extractedData.brandName,
    match: brandMatch,
    reason: brandMatch ? 'Match' : 'Brand name does not match the label',
  };
  if (!brandMatch) results.overallMatch = false;

  // Verify Product Type
  const typeMatch = isSimilar(extractedData.productType, submittedData.productType, 0.7);
  results.fields.productType = {
    submitted: submittedData.productType,
    extracted: extractedData.productType,
    match: typeMatch,
    reason: typeMatch ? 'Match' : 'Product type does not match the label',
  };
  if (!typeMatch) results.overallMatch = false;

  // Verify Alcohol Content
  const submittedABV = normalizeABV(submittedData.alcoholContent);
  const extractedABV = normalizeABV(extractedData.alcoholContent);
  const abvMatch = Math.abs(submittedABV - extractedABV) < 0.5;
  results.fields.alcoholContent = {
    submitted: submittedData.alcoholContent,
    extracted: extractedData.alcoholContent,
    match: abvMatch,
    reason: abvMatch ? 'Match' : `ABV mismatch: submitted ${submittedABV}% vs label ${extractedABV}%`,
  };
  if (!abvMatch) results.overallMatch = false;

  // Verify Net Contents
  const submittedVolume = normalizeVolume(submittedData.netContents);
  const extractedVolume = normalizeVolume(extractedData.netContents);
  const volumeMatch = submittedVolume === extractedVolume || 
                      Math.abs(submittedVolume - extractedVolume) < 1;
  results.fields.netContents = {
    submitted: submittedData.netContents,
    extracted: extractedData.netContents,
    match: volumeMatch,
    reason: volumeMatch ? 'Match' : 'Volume does not match the label',
  };
  if (!volumeMatch) results.overallMatch = false;

  // Add confidence and additional info
  results.confidence = extractedData.confidence || 'medium';
  results.additionalInfo = extractedData.additionalInfo;

  return results;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Label Verification API is running',
    timestamp: new Date().toISOString()
  });
});

// Main verification endpoint
app.post('/api/verify', upload.single('labelImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const submittedData = {
      brandName: req.body.brandName,
      productType: req.body.productType,
      alcoholContent: req.body.alcoholContent,
      netContents: req.body.netContents,
    };

    // Validate submitted data
    if (!submittedData.brandName || !submittedData.productType || 
        !submittedData.alcoholContent || !submittedData.netContents) {
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Analyze the label image
    const extractedData = await analyzeLabelImage(req.file.path);

    // Verify the data
    const verificationResults = verifyLabel(extractedData, submittedData);

    // Clean up uploaded file after processing
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      results: verificationResults,
    });

  } catch (error) {
    console.error('Verification error:', error);
    
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ 
      error: 'Failed to verify label',
      message: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Label Verification API running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'Configured' : 'Missing'}`);
});

