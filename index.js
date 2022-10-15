
const runServer = async () => {
    const express = require('express') // use the express package
    const app = express() // create an express server
    const port = 3000 // set the port we want express to listen on
    
    // create an express route that handles a GET request to path /scores
    app.get('/scores', async (req, res) => {
      res.send(await readData()) // use the readData() function and return the result as the response
    })
    
    // start express and listen on the port set in the port variable
    app.listen(port, () => {
      console.log(`Scores API is listening on port ${port}`)
    })
}


const readData = async () => {
    const { MongoClient, ServerApiVersion } = require('mongodb'); // use the mongo db package
    const uri = "mongodb+srv://demo-test:demo-test@demo.sy87c7d.mongodb.net/?retryWrites=true&w=majority"; // build the connections string
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); // create the mongo db client
    const err = await client.connect()

    const collection = client.db("db").collection("scores")
    const docs = collection.find().sort("score", -1)

    results = [] // declare an empty array for our results
    await docs.forEach((d) => { // loop through each result
        results.push({ // create an object to represent it, and push it to our results array
            name: d.name,
            score: d.score
        })
    })
    await client.close()

    return results
}
//readData()


const insertData = async () => {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://demo-test:demo-test@demo.sy87c7d.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const err = await client.connect()
    const collection = client.db("db").collection("scores")

    const newScore = {
        name: "Su Zhang",
        score: 100,
        date: Date.now()
    }

    await collection.insertOne(newScore)

    await client.close()
}
// insertData()


runServer()