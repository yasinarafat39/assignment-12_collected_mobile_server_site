const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.g8htdaf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const categoriesCollection = client.db('CollectedMobile').collection('categories');
        const productsCollection = client.db('CollectedMobile').collection('products');
        const usersCollection = client.db('CollectedMobile').collection('users');
        const bookingCollection = client.db('CollectedMobile').collection('booking');
        const advertiseCollection = client.db('CollectedMobile').collection('advertise');


        app.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        })

        app.get('/category/:id', async (req, res) => {
            const id = parseInt(req.params.id);
            const query = { category_id: id }
            const categoryProduct = await productsCollection.find(query).toArray();
            res.send(categoryProduct);
        })

        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result);
        })

        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
                return res.send({ AccessToken: token })
            }
            console.log(user);
            res.status(403).send({ AccessToken: '' })
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.post('/booking', async (req, res) => {
            const product = req.body;
            const result = await bookingCollection.insertOne(product);
            res.send(result)
        })

        app.get('/bookings', async (req, res) => {
            const email = req.query.email;
            const query = { userEmail: email };
            const bookings = await bookingCollection.find(query).toArray();
            res.send(bookings);
        })

        app.get('/products', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        })

        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        })

        app.post('/advertise', async (req, res) => {
            const advertiseItem = req.body;
            const result = await advertiseCollection.insertOne(advertiseItem);
            res.send(result);
        })

        app.get('/advertise', async (req, res) => {
            const query = {};
            const result = await advertiseCollection.find(query).toArray();
            res.send(result);
        })

    }
    finally {

    }
}

run().catch(error => console.log(error))

app.get('/', async (req, res) => {
    res.send('Collected Mobile server is running');
})

app.listen(port, () => {
    console.log(`Collected Mobile server running on ${port}`);
})