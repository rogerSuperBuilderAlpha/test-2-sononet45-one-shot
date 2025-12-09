# Testing Guide

This document provides guidance on testing the Label Verification System.

## Table of Contents

- [Manual Testing](#manual-testing)
- [Test Scenarios](#test-scenarios)
- [Creating Test Labels](#creating-test-labels)
- [Expected Behaviors](#expected-behaviors)
- [Edge Cases](#edge-cases)

## Manual Testing

### Prerequisites

1. Ensure both frontend and backend are running
2. Have test label images ready
3. OpenAI API key is configured

### Basic Test Flow

1. **Navigate to Application**
   - Open [http://localhost:5173](http://localhost:5173)
   - Verify page loads correctly

2. **Test Form Validation**
   - Try submitting empty form → Should show validation error
   - Try uploading non-image file → Should show error
   - Try uploading oversized file (>10MB) → Should show error

3. **Test Happy Path**
   - Fill in all fields correctly
   - Upload valid label image
   - Submit form
   - Verify results display

## Test Scenarios

### Scenario 1: Perfect Match ✅

**Form Data:**
```
Brand Name: Old Tom Distillery
Product Type: Kentucky Straight Bourbon Whiskey
Alcohol Content: 45%
Net Contents: 750 mL
```

**Label Should Contain:**
- "Old Tom Distillery" (exact match)
- "Kentucky Straight Bourbon Whiskey"
- "45% Alc./Vol." or "90 Proof"
- "750 mL" or "750mL"

**Expected Result:**
- ✅ Overall Status: Approved
- ✅ All fields: Match
- Confidence: High

### Scenario 2: Brand Name Mismatch ❌

**Form Data:**
```
Brand Name: Tom's Distillery
Product Type: Kentucky Straight Bourbon Whiskey
Alcohol Content: 45%
Net Contents: 750 mL
```

**Label Contains:**
- "Old Tom Distillery" (different from submitted)

**Expected Result:**
- ❌ Overall Status: Rejected
- ❌ Brand Name: Mismatch
- ✅ Other fields: Match
- Reason: "Brand name does not match the label"

### Scenario 3: ABV Mismatch ❌

**Form Data:**
```
Brand Name: Old Tom Distillery
Product Type: Kentucky Straight Bourbon Whiskey
Alcohol Content: 40%
Net Contents: 750 mL
```

**Label Contains:**
- "45% Alc./Vol."

**Expected Result:**
- ❌ Overall Status: Rejected
- ✅ Brand Name: Match
- ✅ Product Type: Match
- ❌ Alcohol Content: Mismatch
- Reason: "ABV mismatch: submitted 40% vs label 45%"

### Scenario 4: Volume Format Variations ✅

**Form Data:**
```
Net Contents: 750 mL
```

**Label May Show Any of:**
- "750 mL"
- "750ml"
- "750ML"
- "75cl" (75 centiliters = 750ml)
- "0.75L"

**Expected Result:**
- ✅ Should match all equivalent formats

### Scenario 5: Product Type Fuzzy Match ✅

**Form Data:**
```
Product Type: Kentucky Straight Bourbon Whiskey
```

**Label May Show:**
- "Kentucky Straight Bourbon Whiskey"
- "Kentucky Bourbon Whiskey"
- "Straight Bourbon Whiskey"

**Expected Result:**
- ✅ Should match with similarity threshold

## Creating Test Labels

### Method 1: Use Real Labels

Search for publicly available alcohol label images:
- TTB COLA Public Registry
- Brand websites
- Product marketing materials

### Method 2: Create Mock Labels

Use a design tool (Canva, Photoshop, etc.) to create test labels:

**Required Elements:**
1. Brand Name prominently displayed
2. Product Type/Class
3. Alcohol Content (% Alc./Vol. and/or Proof)
4. Net Contents (volume)
5. Government Warning (optional but realistic)

**Example Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│        OLD TOM DISTILLERY          │
│                                     │
│   Kentucky Straight Bourbon        │
│           Whiskey                   │
│                                     │
│      45% Alc./Vol. (90 Proof)      │
│                                     │
│             750 mL                  │
│                                     │
│   [Government Warning Text]         │
│                                     │
└─────────────────────────────────────┘
```

### Method 3: Use Sample Images

Download sample bourbon/whiskey labels from:
- [Unsplash](https://unsplash.com/s/photos/bourbon-label)
- [Pexels](https://www.pexels.com/search/whiskey-label/)

## Expected Behaviors

### Successful Verification

**When:** All fields match
**Displays:**
- Green "✓ Approved" badge
- All fields show green "Match" status
- Confidence level displayed
- Timestamp for audit trail
- Any additional info found on label

### Failed Verification

**When:** One or more fields don't match
**Displays:**
- Red "✗ Rejected" badge
- Mismatched fields highlighted in red
- Specific reasons for each mismatch
- Matched fields still show green
- Confidence level
- Timestamp

### Error Handling

**File Upload Errors:**
- Invalid file type → "Please select a valid image file"
- File too large → "Image file size must be less than 10MB"
- No file selected → "Please upload a label image"

**Network Errors:**
- Backend down → "Failed to verify label. Please try again."
- OpenAI API error → Specific error message from API
- Timeout → "Request timed out. Please try again."

## Edge Cases

### 1. Poor Image Quality

**Test:** Upload blurry or low-resolution image

**Expected:**
- AI may still extract text (GPT-4 Vision is robust)
- Confidence level may be "medium" or "low"
- Some fields may not be detected

**Workaround:** Request clearer image from applicant

### 2. Angled or Rotated Images

**Test:** Upload image taken at an angle

**Expected:**
- GPT-4 Vision handles rotation well
- Should still extract most text
- May have lower confidence

### 3. Multiple Labels in One Image

**Test:** Upload image showing front and back label

**Expected:**
- AI will extract all visible text
- May find additional information
- Verification should still work for required fields

### 4. Non-English Text

**Test:** Label with foreign language

**Expected:**
- GPT-4 Vision supports multiple languages
- English portions should still be extracted
- May affect confidence level

### 5. Special Characters

**Test:** Brand names with special characters (®, ™, é, etc.)

**Expected:**
- Should handle most Unicode characters
- Matching logic normalizes special characters
- Minor variations should still match

### 6. Proof vs. ABV

**Test:** Form submits "45%" but label shows "90 Proof"

**Expected:**
- Backend should extract percentage from proof
- 90 Proof = 45% ABV (divide by 2)
- Should match correctly

**Note:** Current implementation extracts as-is. Enhancement could add proof conversion.

### 7. Volume Conversions

**Test:** Form: "750 mL", Label: "75cl"

**Expected:**
- ✅ Should match (both = 750ml)

**Test:** Form: "750 mL", Label: "0.75L"

**Expected:**
- ✅ Should match (conversion handled)

## Performance Testing

### Response Times

**Expected:**
- Image upload: < 1 second
- AI processing: 3-5 seconds
- Total verification: < 10 seconds

**Test:**
1. Upload various image sizes
2. Measure time from submit to results
3. Verify all complete within 10 seconds

### Concurrent Requests

**Test:**
1. Open multiple browser tabs
2. Submit verifications simultaneously
3. Verify all complete successfully

**Expected:**
- All requests process independently
- No conflicts or errors
- Results return correctly to each tab

## API Testing

### Using cURL

**Health Check:**
```bash
curl http://localhost:3001/api/health
```

**Verify Label:**
```bash
curl -X POST http://localhost:3001/api/verify \
  -F "labelImage=@/path/to/label.jpg" \
  -F "brandName=Old Tom Distillery" \
  -F "productType=Kentucky Straight Bourbon Whiskey" \
  -F "alcoholContent=45%" \
  -F "netContents=750 mL"
```

### Using Postman

1. Create new POST request
2. URL: `http://localhost:3001/api/verify`
3. Body type: `form-data`
4. Add fields:
   - `labelImage` (file)
   - `brandName` (text)
   - `productType` (text)
   - `alcoholContent` (text)
   - `netContents` (text)
5. Send request

## Automated Testing (Future Enhancement)

### Unit Tests

Recommended frameworks:
- **Backend**: Jest + Supertest
- **Frontend**: Jest + React Testing Library

### Integration Tests

Test complete flow:
1. Upload image
2. Verify API call
3. Check response format
4. Validate UI updates

### Example Test Case (Jest)

```javascript
describe('Label Verification', () => {
  it('should match exact brand name', () => {
    const extracted = { brandName: 'Old Tom Distillery' };
    const submitted = { brandName: 'Old Tom Distillery' };
    const result = verifyLabel(extracted, submitted);
    expect(result.fields.brandName.match).toBe(true);
  });

  it('should handle volume conversions', () => {
    expect(normalizeVolume('750 mL')).toBe(750);
    expect(normalizeVolume('75cl')).toBe(750);
    expect(normalizeVolume('0.75L')).toBe(750);
  });
});
```

## Reporting Issues

When reporting bugs, include:

1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Screenshots** (if applicable)
5. **Browser/environment** details
6. **Sample data** used (without sensitive info)
7. **Error messages** from console

## Test Checklist

Before deployment, verify:

- [ ] Health check endpoint responds
- [ ] Form validation works
- [ ] Image upload accepts valid files
- [ ] Image upload rejects invalid files
- [ ] Matching scenarios work correctly
- [ ] Mismatch scenarios show errors
- [ ] Results display properly
- [ ] Timestamp appears
- [ ] Confidence level shows
- [ ] Mobile responsive design works
- [ ] Error messages are clear
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] OpenAI API key works
- [ ] No API keys in codebase

---

**Happy Testing! 🧪**

