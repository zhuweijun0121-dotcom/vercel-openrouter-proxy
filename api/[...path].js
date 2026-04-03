export default async function handler(req, res) {
  const path = req.query.path ? req.query.path.join("/") : "";
  const targetUrl = `https://openrouter.ai/api/v1/${path}`;

  const headers = {
    "Content-Type": "application/json",
    // 关键：从 Vercel 环境变量里读取 Key，不再写死
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "HTTP-Referer": "https://icyrene.xyz",
    "X-Title": "OpenClaw Personal Proxy"
  };

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
