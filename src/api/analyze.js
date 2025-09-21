// api/analyze.js
export default async function handler(req, res) {
  // Set comprehensive CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests for analysis
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  try {
    console.log('🚀 Proxy: Received request:', {
      method: req.method,
      headers: req.headers,
      body: req.body ? 'Present' : 'Missing'
    });

    // Validate request body
    if (!req.body || !req.body.content) {
      res.status(400).json({ 
        error: 'Invalid request body. Content is required.',
        details: 'Please provide content in the request body'
      });
      return;
    }

    const { content } = req.body;

    // Validate content
    if (typeof content !== 'string' || content.trim().length === 0) {
      res.status(400).json({ 
        error: 'Invalid content provided',
        details: 'Content must be a non-empty string'
      });
      return;
    }

    console.log('📤 Proxy: Forwarding to backend API...');

    // Forward request to your actual API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const response = await fetch('https://credscore-355089345579.europe-west1.run.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Vercel-Proxy/1.0',
        'X-Forwarded-For': req.headers['x-forwarded-for'] || 'unknown',
        'X-Real-IP': req.headers['x-real-ip'] || 'unknown',
      },
      body: JSON.stringify({ content: content.trim() }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log('📥 Proxy: Backend response status:', response.status);

    // Handle non-OK responses
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('❌ Backend API error:', response.status, errorText);
      
      // Return structured error response
      res.status(response.status).json({
        error: `Backend API error: ${response.status}`,
        details: errorText,
        fallback: true
      });
      return;
    }

    // Parse and forward successful response
    const data = await response.json();
    console.log('✅ Proxy: Successfully forwarded response');

    // Add proxy metadata
    const proxyResponse = {
      ...data,
      _proxy: {
        timestamp: new Date().toISOString(),
        via: 'vercel-proxy',
        backend_status: response.status
      }
    };

    res.status(200).json(proxyResponse);

  } catch (error) {
    console.error('🚨 Proxy error:', error);

    // Handle different error types
    if (error.name === 'AbortError') {
      res.status(504).json({
        error: 'Backend request timeout',
        details: 'The backend API took too long to respond',
        fallback: true
      });
      return;
    }

    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      res.status(502).json({
        error: 'Backend API unavailable',
        details: 'Could not connect to the backend service',
        fallback: true
      });
      return;
    }

    // Generic error response
    res.status(500).json({
      error: 'Proxy server error',
      details: error.message || 'An unexpected error occurred',
      fallback: true
    });
  }
}
