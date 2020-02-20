const request = require('request');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 9600;
require('dotenv/config');
const cors = require('cors');

// Import Routes
const authRoute = require('./routes/authRoute');
const privateRoute = require('./routes/privateRoute');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Route Middleware
app.use('/api/user/', authRoute);
app.use('/api/posts/', privateRoute);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true,  useUnifiedTopology: true }, (err)=>{
  if(err) throw err;
  console.log('Database is connected!!!!!')
});

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
})