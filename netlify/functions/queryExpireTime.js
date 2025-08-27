export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders() };
  }
  try {
    const upstream = 'https://waiyu.pro/app/queryExpireTime';
    const resp = await fetch(upstream, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json, text/plain, */*',
        'Origin': 'https://waiyu.pro',
        'Referer': 'https://waiyu.pro/',
      },
      body: event.body,
    });

    const text = await resp.text();
    return {
      statusCode: resp.status,
      headers: {
        ...corsHeaders(),
        'Content-Type': resp.headers.get('content-type') || 'application/json; charset=utf-8'
      },
      body: text
    };
  } catch (e) {
    return { statusCode: 502, headers: corsHeaders(), body: JSON.stringify({ code: 10000, msg: '系统未知异常', data: String(e) }) };
  }
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
