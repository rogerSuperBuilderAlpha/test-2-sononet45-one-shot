import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [formData, setFormData] = useState({
    brandName: '',
    productType: '',
    alcoholContent: '',
    netContents: '',
  });

  const [labelImage, setLabelImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear results when form changes
    if (results) setResults(null);
    if (error) setError(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image file size must be less than 10MB');
        return;
      }

      setLabelImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear results
      if (results) setResults(null);
      if (error) setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResults(null);

    // Validation
    if (!labelImage) {
      setError('Please upload a label image');
      return;
    }

    if (!formData.brandName || !formData.productType || 
        !formData.alcoholContent || !formData.netContents) {
      setError('All fields are required');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('labelImage', labelImage);
      data.append('brandName', formData.brandName);
      data.append('productType', formData.productType);
      data.append('alcoholContent', formData.alcoholContent);
      data.append('netContents', formData.netContents);

      const response = await axios.post(`${API_URL}/api/verify`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResults(response.data.results);
    } catch (err) {
      console.error('Verification error:', err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error ||
        'Failed to verify label. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      brandName: '',
      productType: '',
      alcoholContent: '',
      netContents: '',
    });
    setLabelImage(null);
    setImagePreview(null);
    setResults(null);
    setError(null);
  };

  const fillSampleData = (scenario) => {
    const samples = {
      matching: {
        brandName: 'Old Tom Distillery',
        productType: 'Kentucky Straight Bourbon Whiskey',
        alcoholContent: '45%',
        netContents: '750 mL',
      },
      brandMismatch: {
        brandName: "Tom's Distillery",
        productType: 'Kentucky Straight Bourbon Whiskey',
        alcoholContent: '45%',
        netContents: '750 mL',
      },
      abvMismatch: {
        brandName: 'Old Tom Distillery',
        productType: 'Kentucky Straight Bourbon Whiskey',
        alcoholContent: '40%',
        netContents: '750 mL',
      },
    };

    setFormData(samples[scenario]);
    if (results) setResults(null);
    if (error) setError(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">🏛️</div>
              <div>
                <h1 className="title">TTB Label Verification System</h1>
                <p className="subtitle">AI-Powered Alcohol Beverage Label Compliance</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="content-grid">
            {/* Left Column - Form */}
            <div className="form-column">
              <div className="card">
                <div className="card-header">
                  <h2>Product Information</h2>
                  <p className="card-description">
                    Enter the alcohol product details as submitted in the application form
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="form">
                  <div className="form-group">
                    <label htmlFor="brandName" className="label">
                      Brand Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="brandName"
                      name="brandName"
                      value={formData.brandName}
                      onChange={handleInputChange}
                      placeholder="e.g., Old Tom Distillery"
                      className="input"
                      required
                    />
                    <p className="help-text">The brand under which the product is sold</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="productType" className="label">
                      Product Class/Type <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="productType"
                      name="productType"
                      value={formData.productType}
                      onChange={handleInputChange}
                      placeholder="e.g., Kentucky Straight Bourbon Whiskey"
                      className="input"
                      required
                    />
                    <p className="help-text">The beverage classification</p>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="alcoholContent" className="label">
                        Alcohol Content (ABV) <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="alcoholContent"
                        name="alcoholContent"
                        value={formData.alcoholContent}
                        onChange={handleInputChange}
                        placeholder="e.g., 45%"
                        className="input"
                        required
                      />
                      <p className="help-text">ABV percentage</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="netContents" className="label">
                        Net Contents <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="netContents"
                        name="netContents"
                        value={formData.netContents}
                        onChange={handleInputChange}
                        placeholder="e.g., 750 mL"
                        className="input"
                        required
                      />
                      <p className="help-text">Volume</p>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="labelImage" className="label">
                      Label Image <span className="required">*</span>
                    </label>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        id="labelImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input"
                        required
                      />
                      <label htmlFor="labelImage" className="file-input-label">
                        <span className="file-icon">📁</span>
                        <span>{labelImage ? labelImage.name : 'Choose label image'}</span>
                      </label>
                    </div>
                    <p className="help-text">Upload image of the alcohol label (JPG, PNG, max 10MB)</p>
                  </div>

                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Label preview" />
                    </div>
                  )}

                  <div className="button-group">
                    <button
                      type="submit"
                      disabled={loading}
                      className="button button-primary"
                    >
                      {loading ? (
                        <>
                          <span className="spinner"></span>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <span>🔍</span>
                          Verify Label
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={loading}
                      className="button button-secondary"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="sample-data-section">
                    <p className="sample-label">Quick Test Scenarios:</p>
                    <div className="sample-buttons">
                      <button
                        type="button"
                        onClick={() => fillSampleData('matching')}
                        className="button button-sample"
                        disabled={loading}
                      >
                        Scenario A
                      </button>
                      <button
                        type="button"
                        onClick={() => fillSampleData('brandMismatch')}
                        className="button button-sample"
                        disabled={loading}
                      >
                        Scenario B
                      </button>
                      <button
                        type="button"
                        onClick={() => fillSampleData('abvMismatch')}
                        className="button button-sample"
                        disabled={loading}
                      >
                        Scenario C
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="results-column">
              {error && (
                <div className="alert alert-error">
                  <div className="alert-icon">⚠️</div>
                  <div>
                    <h3>Error</h3>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {results && (
                <div className="card">
                  <div className="card-header">
                    <div className={`status-badge ${results.overallMatch ? 'status-success' : 'status-error'}`}>
                      {results.overallMatch ? '✓ Approved' : '✗ Rejected'}
                    </div>
                    <h2>Verification Results</h2>
                    <p className="card-description">
                      {results.overallMatch 
                        ? 'All information matches the label'
                        : 'Discrepancies found between submitted data and label'}
                    </p>
                  </div>

                  <div className="results-grid">
                    {Object.entries(results.fields).map(([field, data]) => (
                      <div key={field} className={`result-item ${data.match ? 'match' : 'mismatch'}`}>
                        <div className="result-header">
                          <h3 className="result-title">
                            {field === 'brandName' && '🏷️ Brand Name'}
                            {field === 'productType' && '🥃 Product Type'}
                            {field === 'alcoholContent' && '🌡️ Alcohol Content'}
                            {field === 'netContents' && '📏 Net Contents'}
                          </h3>
                          <span className={`result-badge ${data.match ? 'badge-success' : 'badge-error'}`}>
                            {data.match ? '✓ Match' : '✗ Mismatch'}
                          </span>
                        </div>
                        
                        <div className="result-content">
                          <div className="result-row">
                            <span className="result-label">Submitted:</span>
                            <span className="result-value">{data.submitted || 'N/A'}</span>
                          </div>
                          <div className="result-row">
                            <span className="result-label">On Label:</span>
                            <span className="result-value">{data.extracted || 'Not found'}</span>
                          </div>
                          {!data.match && (
                            <div className="result-reason">
                              <span className="reason-icon">ℹ️</span>
                              <span>{data.reason}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="results-footer">
                    <div className="confidence-indicator">
                      <span className="confidence-label">AI Confidence:</span>
                      <span className={`confidence-badge confidence-${results.confidence}`}>
                        {results.confidence?.toUpperCase() || 'MEDIUM'}
                      </span>
                    </div>
                    <div className="timestamp">
                      Verified: {new Date(results.timestamp).toLocaleString()}
                    </div>
                  </div>

                  {results.additionalInfo && (
                    <div className="additional-info">
                      <h4>Additional Information Found on Label:</h4>
                      <p>{results.additionalInfo}</p>
                    </div>
                  )}
                </div>
              )}

              {!error && !results && !loading && (
                <div className="placeholder-card">
                  <div className="placeholder-icon">📋</div>
                  <h3>No Results Yet</h3>
                  <p>Fill out the form and upload a label image to begin verification</p>
                  <div className="features-list">
                    <div className="feature-item">
                      <span className="feature-icon">🤖</span>
                      <span>AI-powered OCR extraction</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🔍</span>
                      <span>Intelligent text matching</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">📊</span>
                      <span>Detailed verification reports</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">⚡</span>
                      <span>3-5 second processing time</span>
                    </div>
                  </div>
                </div>
              )}

              {loading && (
                <div className="loading-card">
                  <div className="loading-spinner"></div>
                  <h3>Analyzing Label...</h3>
                  <p>Using AI to extract and verify label information</p>
                  <div className="loading-steps">
                    <div className="loading-step">📷 Reading image...</div>
                    <div className="loading-step">🔍 Extracting text...</div>
                    <div className="loading-step">✓ Comparing data...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>TTB Label Verification System • AI-Powered Compliance Tool • Built with OpenAI GPT-4 Vision</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

