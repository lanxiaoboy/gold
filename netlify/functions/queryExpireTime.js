export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const upstream = 'https://waiyu.pro/app/queryExpireTime';

    const resp = await fetch(upstream, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json, text/plain, */*',
        'Origin': 'https://waiyu.pro',
        'Referer': 'https://waiyu.pro/',
        'User-Agent': 'Mozilla/5.0 (NetlifyFunctionsProxy)'
      },
      body: event.body
    });

    const text = await resp.text();
    return {
      statusCode: 200,
      headers: { 'Content-Type': resp.headers.get('content-type') || 'application/json; charset=utf-8' },
      body: text
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ code: 502, msg: '网关错误', data: e.message })
    };
  }
}
