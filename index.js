
const express=require('express')
const app=express()
const port=process.env.PORT || 5000;

require('dotenv').config()
const cors=require('cors')


app.use(express.json())
app.use(cors())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u2o3a1l.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


const userCollection=client.db('donationDB').collection('users')









            //POST USER AND GET

     app.post('/users',async(req,res)=>{
        const userInfo=req.body
        const query={email:userInfo.email}
        const exitUsers=await userCollection.findOne(query)
        if(exitUsers){
            return res.send({message:'User Already Exits',insertedId:null})
        }
        console.log('User Uploaded',userInfo)
        const result=await userCollection.insertOne(userInfo)
        res.send(result)
     })

     app.get('/users',async(req,res)=>{
        const reslut=await userCollection.find().toArray()
     })

















    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
  
    res.send('Donation   Server is Running')

})

app.listen(port)
