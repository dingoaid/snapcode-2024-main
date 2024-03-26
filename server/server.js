const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

let uri = `mongodb+srv://rlarhksdn892:88@00@KIm@cluster0.seqg46o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    // Example: Define a route that uses the MongoDB client
    app.post('/submit-email', async (req, res) => {
      const { address } = req.body;
      try {
        const collection = client.db("myDatabaseName").collection("emails");
        await collection.insertOne({ address, dateSubmitted: new Date() });
        res.status(200).send('Email saved successfully!');
      } catch (error) {
        console.error('Error saving email:', error);
        res.status(500).send(error.message);
      }
    });

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

run().catch(console.dir);