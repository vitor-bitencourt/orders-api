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
    //Verify if the body of the request is empty
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error('Não foi possível criar o pedido, verifique os dados informados.');
    }

    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    //Verify if the required fields are empty
    if (!numeroPedido || !valorTotal || !dataCriacao || !items || !Array.isArray(items)) {
      throw new Error('Não foi possível criar o pedido, verifique os dados informados.');
    }

    //Verify if each item has the required fields
    for (const item of items) {
      if (!item.idItem || !item.quantidadeItem || !item.valorItem) {
        throw new Error('Não foi possível criar o pedido, verifique os dados dos itens informados.');
      }
    }

    //Transform the data
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
    console.error('Error creating the order:', err);
    res.status(400).send({ error: err.message });
  }
});

// List all orders
app.get('/order/list', async (req, res) => {
  try {
    const orders = await Order.find();
    //Verify if there is any order
    if (orders.length === 0) {
      return res.status(404).send({ message: 'Nenhum pedido encontrado' });
    }
    res.send(orders);
  } catch (err) {
    console.error('Error ao buscar pedidos:', err);
    res.status(500).send({ error: 'Erro ao buscar os pedidos' });
  }
});

// Get order by order number
app.get('/order/:orderId', async (req, res) => { 
  try {
    const order = await Order.find(req.params);
    if (!order) {
        return res.status(404).send({ error: 'Order not found' });
      }
      res.send(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update order by order number
app.put('/order/:orderId', async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(req.params, {
      value: req.body.valorTotal,
      creationDate: new Date(req.body.dataCriacao),
      items: req.body.items.map(item => ({
        productId: item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem
      }))
    }, { new: true });
    if (!updatedOrder) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.send(updatedOrder);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete order by order number
app.delete('/order/:orderId', async (req, res) => { 
  try {
    const orderId = req.params.orderId;
    //Verify if there is and ordeId and it is not empty
    if (!orderId) {
      return res.status(400).send({ error: 'Número do pedido não encontrado!' });
    }
    //Try to  find and delete the order
    const order = await Order.findOneAndDelete({ orderId });

    //verify if the order was found
    if (!order) {
      return res.status(404).send({ error: 'Pedido não encontrado!' });
    }
    return res.send(order);
  } catch (err) {
    console.error('Error deleting the order:', err);
    return res.status(500).send({ error: 'Erro ao deletar o pedido' });
  }
});

// DB Conncection
app.listen(port, () => {
  mongoose.connect(process.env.MONGODB_URI, {
  }).then(() => {
    console.log('Connected to MongoDB Atlas');
  }).catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
  });
});