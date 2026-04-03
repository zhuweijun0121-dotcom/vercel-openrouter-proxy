export default async function handler(req, res) {
  const path = req.query.path ? req.query.path.join("/") : "";
  const targetUrl = `https://openrouter.ai/api/${path}`;

  // 1. 检查 API Key 是否存在
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing OPENROUTER_API_KEY environment variable. Check Vercel Settings!" });
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
    "HTTP-Referer": "https://icyrene.xyz",
    "X-Title": "OpenClaw Personal Proxy"
  };

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    // 2. 如果报错，返回详细错误
    res.status(500).json({ 
      error: "Fetch Failed", 
      message: error.message,
      target: targetUrl 
    });
  }
}
