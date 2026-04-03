export default async function handler(req, res) {
  // 获取路径中 v1 之后的部分
  const pathParts = req.url.split('/api/v1/')[1] || req.url.split('/api/')[1] || "";
  const targetUrl = `https://openrouter.ai/api/v1/${pathParts}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://icyrene.xyz",
        "X-Title": "OpenClaw Proxy"
      },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
