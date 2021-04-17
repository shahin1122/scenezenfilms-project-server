const express = require('express')
const app = express()
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
require('dotenv').config()
const port = process.env.PORT || 5050;


app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rmnsf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('Connection Error!' , err);
  const eventCollection = client.db("scenezendb").collection("service");
  const eventCillection2= client.db("scenezendb").collection("newService"); 


  app.get('/newEvent' , (req,res)=>{
    eventCillection2.find()
    .toArray((err , items)=>{
      res.send(items)
    //   console.log('form database',items);
  })
  })


  app.get('/events' , (req,res)=>{
      eventCollection.find()
      .toArray((err , items)=>{
          res.send(items)
        //   console.log('form database',items);
      })
  })

  


  

  app.post('/addReview' , (req ,res)=>{
       const newEvent = req.body  ;
       console.log('adding new event' , newEvent); 
       eventCollection.insertOne(newEvent) 
       .then(result => {
           console.log('Inserted Count!',result.insertedCount);
           res.send(result.insertedCount > 0)
       }) 
  })



  // it is for service portion

  app.post('/addService' , (req ,res)=>{
    const newEvent2 = req.body  ;
    console.log('adding new event' , newEvent2); 
    eventCillection2.insertOne(newEvent2) 
    .then(result => {
        console.log('Inserted Count!',result.insertedCount);
        res.send(result.insertedCount > 0)
    }) 
})



//   console.log('Database connected successfully!');
  // perform actions on the collection object
//   client.close();
});








app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})