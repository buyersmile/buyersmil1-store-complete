fetch('https://buyersmil1-api.onrender.com/api/products')
  .then(res => res.json())
  .then(data => {
    document.getElementById('products').innerHTML = data.map(p => `
      <div>
        <strong>${p.name}</strong> - ${p.price} บาท
      </div>
    `).join('');
  });

document.getElementById('orderForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = new FormData(e.target);
  const res = await fetch('https://buyersmil1-api.onrender.com/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: form.get('name'),
      product: form.get('product')
    })
  });
  alert('Order submitted!');
});
