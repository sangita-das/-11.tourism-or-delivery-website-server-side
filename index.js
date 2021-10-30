const { MongoClient } = require('mongodb');
const express = require('express')


const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyeto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();
    const database = client.db('touris');
    const servicesCollection = database.collection('sesrvices')



    // GET API


    // POST API

    // Add Services
    // add Events
    app.post("/addServices", async (req, res) => {
      console.log(req.body);
      console.log('hit the post api', addService)
      const result = await ServicesCollection.insertOne(req.body);
      console.log(result);
      res.json(result)
    });



    // DELETE API



  }


  finally {
    // await client.close();
  }
}


run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World! Running Tourism server')
})

app.listen(port, () => {
  console.log('Running Tourism Server on port', port);
})