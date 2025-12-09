# Sample Label Information

This document describes the sample labels referenced in the project requirements.

## Sample Bourbon Label

The project requirements reference a sample bourbon label with the following information:

### Label Contents

```
┌───────────────────────────────────────────────────────┐
│                                                       │
│              OLD TOM DISTILLERY                       │
│                                                       │
│         Kentucky Straight Bourbon Whiskey             │
│                                                       │
│           45% Alc./Vol. (90 Proof)                    │
│                                                       │
│                   750 mL                              │
│                                                       │
│  Bottled by Old Tom Distillery, Louisville, KY       │
│                                                       │
│  GOVERNMENT WARNING: (1) According to the            │
│  Surgeon General, women should not drink              │
│  alcoholic beverages during pregnancy because         │
│  of the risk of birth defects. (2) Consumption        │
│  of alcoholic beverages impairs your ability to       │
│  drive a car or operate machinery, and may cause      │
│  health problems.                                     │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### Field Mapping

For verification testing, use this data:

| Field | Value | Notes |
|-------|-------|-------|
| **Brand Name** | Old Tom Distillery | Main brand identifier |
| **Product Type** | Kentucky Straight Bourbon Whiskey | Beverage classification |
| **Alcohol Content** | 45% | Can also be expressed as 90 Proof |
| **Net Contents** | 750 mL | Standard bottle size |

## Creating Your Own Test Labels

Since this is a sample project, you'll need to provide your own label images for testing. Here are some options:

### Option 1: Find Real Labels Online

Search for bourbon or whiskey label images that are publicly available:

1. **TTB COLA Public Registry**
   - https://www.ttb.gov/alfd/cola_public_registry.shtml
   - Official source of approved labels
   - Download actual approved label images

2. **Stock Photo Websites**
   - Unsplash: https://unsplash.com/s/photos/bourbon-label
   - Pexels: https://www.pexels.com/search/whiskey-label/
   - Free, high-quality images

3. **Brand Websites**
   - Visit bourbon/whiskey brand websites
   - Download product images (ensure legal use)
   - Often have high-resolution label images

### Option 2: Create Mock Labels

Use design tools to create realistic mock labels:

**Tools:**
- **Canva** (free, web-based)
  - https://www.canva.com/
  - Use "Label" templates
  - Add required text elements

- **Figma** (free for individuals)
  - https://www.figma.com/
  - More design control
  - Export as PNG/JPG

- **PowerPoint/Keynote**
  - Quick and simple
  - Add text boxes with label info
  - Export as image

**Design Tips:**
- Use classic serif fonts (like Garamond, Baskerville)
- Include all required elements:
  - Brand name (large, prominent)
  - Product type
  - ABV and/or Proof
  - Volume
  - Government warning (small text)
- Make text clear and readable
- Use appropriate colors (browns, golds for bourbon)

### Option 3: Take Photos of Real Bottles

If you have access to alcohol bottles:

1. Take clear, well-lit photos
2. Capture label straight-on (not at angle)
3. Ensure all text is in focus
4. Use good lighting (natural light works best)
5. High resolution (at least 1024x768)

**Important:** Only for personal testing, not for distribution.

## Test Label Requirements

For successful AI extraction, your test labels should:

### Image Quality
- **Resolution:** At least 800x600 pixels
- **Format:** JPG, PNG, GIF, or WebP
- **Size:** Under 10MB
- **Clarity:** Text clearly readable

### Text Requirements
- **Brand Name:** Clearly visible
- **Product Type:** Full classification
- **ABV:** Percentage format (e.g., "40%", "45% Alc./Vol.")
- **Volume:** With units (e.g., "750 mL", "1L", "12 fl oz")

### Orientation
- Straight-on view preferred
- Slight angles okay (GPT-4 Vision handles well)
- Avoid extreme rotations
- No upside-down text

## Recommended Test Images

### Bourbon/Whiskey Labels
Look for labels with these characteristics:
- Traditional design
- Clear typography
- All four required fields visible
- Professional appearance

### Beer/Ale Labels
- Often more colorful
- May have larger brand names
- Look for craft brewery labels
- Ensure ABV and volume are visible

### Wine Labels
- Can be more artistic
- May have smaller text
- Ensure all required info is present
- Watch for metric vs. imperial volumes

## Sample Data Sets

### Bourbon Test Set

**Test 1: Standard Bourbon**
```
Brand: Buffalo Trace
Type: Kentucky Straight Bourbon Whiskey
ABV: 45%
Volume: 750 mL
```

**Test 2: High Proof Bourbon**
```
Brand: Wild Turkey
Type: Kentucky Straight Bourbon Whiskey
ABV: 50.5%
Volume: 750 mL
```

**Test 3: Rye Whiskey**
```
Brand: Bulleit
Type: Straight Rye Whiskey
ABV: 45%
Volume: 750 mL
```

### Beer Test Set

**Test 1: IPA**
```
Brand: Sierra Nevada
Type: India Pale Ale
ABV: 6.8%
Volume: 12 fl oz
```

**Test 2: Stout**
```
Brand: Guinness
Type: Irish Dry Stout
ABV: 4.2%
Volume: 14.9 fl oz
```

### Wine Test Set

**Test 1: Red Wine**
```
Brand: Robert Mondavi
Type: Cabernet Sauvignon
ABV: 13.5%
Volume: 750 mL
```

**Test 2: White Wine**
```
Brand: Kendall-Jackson
Type: Chardonnay
ABV: 13.5%
Volume: 750 mL
```

## Legal Considerations

**Important:** This is an educational/portfolio project.

- ✅ Use publicly available images
- ✅ Create your own mock labels
- ✅ Take photos of bottles you own (for testing only)
- ❌ Don't use copyrighted label designs commercially
- ❌ Don't redistribute brand images without permission
- ✅ For portfolio/demo purposes, clearly state "Sample/Test Data"

## Where to Upload

When using the application:

1. Click "Choose label image"
2. Select your prepared label image
3. Ensure file is under 10MB
4. Supported formats: JPG, PNG, GIF, WebP

## Troubleshooting Images

**If AI can't extract text:**
- Increase image resolution
- Improve lighting/contrast
- Ensure text isn't too small
- Try different image format
- Check for glare or reflections

**If extraction is inaccurate:**
- Use clearer font
- Increase text size
- Remove background clutter
- Take photo more directly
- Try different angle

---

**Need Help Finding Labels?**

For this project submission, the evaluator will likely bring their own test images. Focus on building a robust system that can handle various label formats and qualities.

