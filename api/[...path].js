// Vercel Serverless Function - API Route for OpenRouter
// 文件路径: api/[...path].js

export default async function handler(req, res) {
  // 获取请求的路径参数
  const path = req.query.path ? req.query.path.join("/") : "";
  
  // 拼接 OpenRouter 的目标地址
  const targetUrl = `https://openrouter.ai/api/v1/${path}`;

  // 配置请求头，包含你的 API Key
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer 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`,
    "HTTP-Referer": "https://icyrene.xyz", // 用于 OpenRouter 排名标记
    "X-Title": "OpenClaw Personal Proxy"
  };

  try {
    // 向 OpenRouter 发起请求
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: JSON.stringify(req.body)
    });

    // 获取 OpenRouter 的返回数据
    const data = await response.json();
    
    // 返回给 OpenClaw
    res.status(response.status).json(data);
  } catch (error) {
    // 如果出错，报错
    res.status(500).json({ error: error.message });
  }
}
