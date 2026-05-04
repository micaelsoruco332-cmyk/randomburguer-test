const https = require('https');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { total, descripcion } = body || {};

    if (!total) {
      return res.status(400).json({ error: 'Falta el total' });
    }

    const postData = JSON.stringify({
      items: [{
        title: descripcion || 'Pedido Random Burguer',
        quantity: 1,
        unit_price: Number(total),
        currency_id: 'ARS'
      }],
      back_urls: {
                  success: 'https://randomburguer.vercel.app/pago-exitoso',
                  failure: 'https://randomburguer.vercel.app',
},
      auto_return: 'approved'
    });

    const data = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.mercadopago.com',
        path: '/checkout/preferences',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MPTOKEN}`,
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const reqMP = https.request(options, (resMP) => {
        let data = '';
        resMP.on('data', chunk => data += chunk);
        resMP.on('end', () => resolve(JSON.parse(data)));
      });

      reqMP.on('error', reject);
      reqMP.write(postData);
      reqMP.end();
    });

    return res.status(200).json({ init_point: data.init_point });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}