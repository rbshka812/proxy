export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, phone } = req.body;

  const BOT_TOKEN = '7958372133:AAF9v8LZKOJiYf5XkQzES3VgSU4WkVTA5hg';
  const CHAT_ID = '7958372133';

  const text = `🎁 Новая заявка!\n👤 ФИО: ${name}\n📞 Телефон: ${phone}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const tgRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    const data = await tgRes.json();

    if (data.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false, error: data });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
