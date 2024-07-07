//Imports
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//Config
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => {
  mongoose.connect(process.env.MONGODB_URI, {
  }).then(() => {
    console.log('Connected to MongoDB Atlas');
  }).catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
  });
});