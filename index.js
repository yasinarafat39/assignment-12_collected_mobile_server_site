const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@cluster0.g8htdaf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const categoriesCollection = client.db('collectedMobile').collection('categories');
        const productsCollection = client.db('collectedMobile').collection('products');

        
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