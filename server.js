const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const data = require('./data');

const app = express();
app.use(express.static(__dirname));
app.use(
  cors({
    origin: ['http://localhost:5000'],
    credentials: true,
  }),
);
console.log('\nprocess.env.MONGODB_URI: ', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!');
});

const Product = mongoose.model('products', new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    calorie: Number,
    category: String,
}));

app.get('/api/products/seed', async (req, res) => {
    const products = await Product.insertMany(data.products);
    res.send({products});
})

app.get('/api/products', async (req, res) => {
    const {category} = req.query;
    const products = await Product.find(category? {category} : {});
    res.send(products);
})

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
})

const PORT = process.env.PORT || 5000;

app.get('/api/categories', (req, res) => {
    res.send(data.categories);
})

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})