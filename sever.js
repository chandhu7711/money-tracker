const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/money-tracker', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema
const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  type: String, // 'income' or 'expense'
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', async (req, res) => {
  const transactions = await Transaction.find();
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/transactions', async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.post('/transactions', async (req, res) => {
  const { description, amount, type } = req.body;

  const newTransaction = new Transaction({
    description,
    amount,
    type,
  });

  await newTransaction.save();
  res.redirect('/');
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
