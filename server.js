const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const mockProducts = [
  { id: 1, name: 'เสื้อ buyersmile', price: 199 },
  { id: 2, name: 'หมวก buyersmile', price: 149 }
];

app.get('/api/products', (req, res) => {
  res.json(mockProducts);
});

app.post('/api/order', async (req, res) => {
  const order = req.body;
  console.log('Received order:', order);
  // Add logic to write to Google Sheet here
  res.status(200).json({ message: 'Order saved' });
});

app.listen(port, () => console.log(`Server running on port ${port}`));