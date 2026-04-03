export const config = {
  runtime: 'edge'
};

export default async function (req) {
  const url = new URL(req.url);
  // 精准提取路径，无论带不带 v1
  const path = url.pathname.replace('/api/v1/', '').replace('/api/', '');
  const targetUrl = `https://openrouter.ai/api/v1/${path}${url.search}`;

  // 复制并修整 Header
  const headers = new Headers(req.headers);
  headers.set('Authorization', `Bearer ${process.env.OPENROUTER_API_KEY}`);
  headers.set('HTTP-Referer', 'https://icyrene.xyz');
  headers.set('X-Title', 'OpenClaw High-Speed Proxy');
  headers.delete('host');
  headers.delete('connection');

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.method === 'POST' ? req.body : null,
      redirect: 'follow'
    });

    // 关键：直接返回 Response 对象，实现流式转发
    return new Response(response.body, {
      status: response.status,
      headers: response.headers
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
