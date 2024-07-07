//Imports
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//Config
const app = express();
app.use(express.json());
const port = 3000;

//Model
const Order = mongoose.model('Order', { 
  orderId: { type: String, unique: true },
  value: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  items: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }]
});

//Create a new order
app.post('/order', async (req, res) => {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    // Transform data
    const order = new Order({
      orderId: numeroPedido.replace(/-\d+$/, ''),
      value: valorTotal,
      creationDate: new Date(dataCriacao),
      items: items.map(item => ({
        productId: item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem
      }))
    });

    await order.save();
    res.status(201).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.listen(port, () => {
  mongoose.connect(process.env.MONGODB_URI, {
  }).then(() => {
    console.log('Connected to MongoDB Atlas');
  }).catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
  });
});