// Vercel Serverless Function for Global Likes Counter
// Persists globally across all users, devices, and serverless lambda instances

let memoryLikes = 0;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Prevent any CDN / browser caching so count is always live across all users
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. If Vercel KV or Upstash Redis is configured:
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const kvUrl = process.env.KV_REST_API_URL;
      const kvToken = process.env.KV_REST_API_TOKEN;

      if (req.method === 'POST') {
        const response = await fetch(`${kvUrl}/incr/netxspider_site_likes`, {
          headers: { Authorization: `Bearer ${kvToken}` },
        });
        const data = await response.json();
        const count = typeof data.result === 'number' ? data.result : parseInt(data.result || '0', 10);
        return res.status(200).json({ count: isNaN(count) ? 0 : count });
      } else {
        const response = await fetch(`${kvUrl}/get/netxspider_site_likes`, {
          headers: { Authorization: `Bearer ${kvToken}` },
        });
        const data = await response.json();
        const current = data.result !== null && data.result !== undefined ? parseInt(data.result, 10) : 0;
        return res.status(200).json({ count: isNaN(current) ? 0 : current });
      }
    } catch {
      // fallback to global persistent counter
    }
  }

  // 2. Global persistent counter via Abacus (shared live across all users globally)
  try {
    const abacusEndpoint =
      req.method === 'POST'
        ? 'https://abacus.jasoncameron.dev/hit/netxspider_v2/likes'
        : 'https://abacus.jasoncameron.dev/get/netxspider_v2/likes';

    const abacusRes = await fetch(abacusEndpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (abacusRes.ok) {
      const data = await abacusRes.json();
      if (typeof data.value === 'number') {
        memoryLikes = data.value;
        return res.status(200).json({ count: data.value });
      }
    } else {
      const errData = await abacusRes.json().catch(() => ({}));
      // If key does not exist yet, default to 0
      if (errData && errData.error === 'Key not found') {
        return res.status(200).json({ count: 0 });
      }
    }
  } catch (err) {
    // fallback to memory
  }

  // Fallback to memory
  if (req.method === 'POST') {
    memoryLikes += 1;
    return res.status(200).json({ count: memoryLikes });
  }

  return res.status(200).json({ count: memoryLikes });
}
