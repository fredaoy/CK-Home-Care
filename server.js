const express = require('express');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');
const FormData = require('form-data');

const app = express();
const upload = multer();

app.use(cors());

app.post('/api/check-slip', upload.single('files'), async (req, res) => {
  try {
    const formData = new FormData();

    formData.append('files', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    formData.append('log', 'true');
    formData.append('amount', req.body.amount);

    const response = await axios.post(
      'https://api.slipok.com/api/line/apikey/43369',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'x-authorization': 'SLIPOKM2G0OC0',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    res.json(response.data);

  } catch (err) {
    console.error('❌ Proxy Error:', err.message);

    // 🔁 เช็คสลิปซ้ำ
    if (err.response?.data?.code === 1012) {
      return res.status(200).json({
        success: false,
        message: '❗ สลิปนี้ถูกใช้แล้ว กรุณาแนบสลิปใหม่',
      });
    }

    // 🔁 เช็คยอดเงินไม่ตรง
    if (err.response?.data?.code === 1013) {
      return res.status(200).json({
        success: false,
        message: '❗ ยอดเงินไม่ตรงกับในสลิป กรุณาตรวจสอบอีกครั้ง',
      });
    }

    // ❌ ข้อผิดพลาดอื่น ๆ
    return res.status(500).json({
      success: false,
      message: '❌ เกิดข้อผิดพลาด ไม่สามารถตรวจสอบสลิปได้ในขณะนี้',
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
