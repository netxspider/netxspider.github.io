// Vercel Serverless Edge/Node Function for Likes Counter
// Works out of the box when deployed to Vercel

let memoryLikes = 0;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // If Vercel KV or Upstash Redis is configured via environment variables:
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
        return res.status(200).json({ count: isNaN(count) ? memoryLikes : count });
      } else {
        const response = await fetch(`${kvUrl}/get/netxspider_site_likes`, {
          headers: { Authorization: `Bearer ${kvToken}` },
        });
        const data = await response.json();
        const current = data.result !== null && data.result !== undefined ? parseInt(data.result, 10) : memoryLikes;
        return res.status(200).json({ count: isNaN(current) ? memoryLikes : current });
      }
    } catch {
      // fallback to memory
    }
  }

  // Memory fallback for standard deployment
  if (req.method === 'POST') {
    memoryLikes += 1;
    return res.status(200).json({ count: memoryLikes });
  }

  return res.status(200).json({ count: memoryLikes });
}
