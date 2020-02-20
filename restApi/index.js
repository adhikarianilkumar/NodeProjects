const request = require('request');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
// const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 9600;
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Import Routes
const postsRoutes = require('./routes/postsRoute');
app.use('/posts', postsRoutes)


// DB connection
// const client = new MongoClient(process.env.DB_CONNECTION, { useNewUrlParser: true,  useUnifiedTopology: true });
// client.connect(err => {
//   if(err) throw err;
//   // const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('Database is connected!')
//   // client.close();
// });
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true}, (err)=>{
  if(err) throw err;
  console.log('Database is connected!!!!!')
});

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
})