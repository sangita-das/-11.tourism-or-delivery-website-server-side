const { MongoClient } = require('mongodb');
const express = require('express')
const ObjectId = require('mongodb').ObjectId;


const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyeto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// console.log(uri)


async function run() {
  try {
    await client.connect();
    // console.log('database connected successfully')
    const database = client.db('tourism');
    const serviceCollection = database.collection('service')



    // GET service API
    app.get('/service', async (req, res) => {
      const cursor = serviceCollection.find({});
      const service = await cursor.toArray();
      res.send(service);
    })

    // get all servicess

    app.get("/allServices", async (req, res) => {
      const result = await serviceCollection.find({}).toArray();
      res.send(result);
    });


    // Get Single Service
    app.get('/service/:key', async (req, res) => {
      const id = req.params.key;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.json(service);
    })

    // POST API
    // add Services
    app.post("/addServices", async (req, res) => {
      console.log(req.body);
      const result = await serviceCollection.insertOne(req.body);
      console.log(result);
    });


    // DELETE API
    app.delete('/service/:key', async (req, res) => {
      const id = req.params.key;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.deleteOne(query);
      res.json(result);
    })


    /*  // add Services
     app.post("/addService", async (req, res) => {
       console.log(req.body);
       const result = await ServicesCollection.insertOne(req.body);
       console.log(result);
     });
 
     // get search events
     app.get("/searchService", async (req, res) => {
       const result = await ServicesCollection.find({
         title: { $regex: req.query.search },
       }).toArray();
       res.send(result);
       console.log(result);
     });
 
     // add clients
     app.post("/addClients", async (req, res) => {
       console.log(req.body);
       const result = await clientCollection.insertOne(req.body);
       res.send(result);
     });
 
     // get all client
 
     app.get("/allClients", async (req, res) => {
       const result = await clientCollection.find({}).toArray();
       res.send(result);
       console.log(result);
     });
     // get all servicess
 
     app.get("/allServices", async (req, res) => {
       const result = await ServicesCollection.find({}).toArray();
       res.send(result);
     });
 
     // delete event
 
     app.delete("/deleteService/:id", async (req, res) => {
       console.log(req.params.id);
       const result = await ServicesCollection.deleteOne({
         _id: ObjectId(req.params.id),
       });
       res.send(result);
     });
 
     // my orders
 
     app.get("/myOrders/:email", async (req, res) => {
       const result = await ServicesCollection.find({
         email: req.params.email,
       }).toArray();
       res.send(result);
     });
 
 
 
     // DELETE API
 
 
  */
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