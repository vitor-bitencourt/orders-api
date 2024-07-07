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

app.listen(port, () => {
  mongoose.connect(process.env.MONGODB_URI, {
  }).then(() => {
    console.log('Connected to MongoDB Atlas');
  }).catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
  });
});