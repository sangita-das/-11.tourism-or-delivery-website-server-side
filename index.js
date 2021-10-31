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






    const users = [
      { id: 1, name: 'Sagotta Adhikary', email: 'sagotta@gmail.com', phone: '017888888888' },
      { id: 2, name: 'Akhi patellal', email: 'Alkhi@gmail.com', phone: '017888888888' },
      { id: 3, name: 'Joynal Rahman', email: 'Joynal@gmail.com', phone: '017888888888' },
      { id: 4, name: 'Alex Diva', email: 'Alex@gmail.com', phone: '017888888888' },
      { id: 5, name: 'Soniya Kubra', email: 'Soniya@gmail.com', phone: '017888888888' },

    ]


    app.get('/users', (req, res) => {
      const search = req.query.search;

      if (search) {
        const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(search));
        res.send(searchResult);
      }
      else {
        res.send(users)
      }
    });

    // app.METHOD my Order / Client section 
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const result = await serviceCollection.insertOne(newUser)
      // newUser.id = users.length;
      // users.push(newUser);
      console.log('hitting the post', req.body);
      res.json(result)
    })


    // add clients
    app.post("/addClients", async (req, res) => {
      console.log(req.body);
      const result = await serviceCollection.insertOne(req.body);
      res.send(result);
    });


    // my orders

    app.get("/myOrders/:email", async (req, res) => {
      const result = await ServiceCollection.find({
        email: req.params.email,
      }).toArray();
      res.send(result);
    });


    /* dynamic api */
    app.get('/users/:id', (req, res) => {
      const id = req.params.id;
      const user = users[id]
      res.send(user);
      // console.log(req.params.id);
    })



    // get add servicess

    app.get("/addServices", async (req, res) => {
      const result = await ServiceCollection.find({}).toArray();
      res.send(result);
    });


    // gut method update services status

    app.put("/addServices/:key", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const status = req.body.status
      const options = { upsert: true };
      const doc = {
        $set: {
          status: status
        }
      }
      const result = await ServiceCollection.updateOne({ query, doc, options }).toArray();
      res.send(result);
      res.json(result)
    });

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