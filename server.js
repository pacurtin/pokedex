const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const API = "https://pokeapi.co/api/v2";

// serve up the prod build of app. need to run build first.
app.use(express.static(path.join(__dirname, ".", "build")));

// start express server on port 3001
app.listen(3001, () => {
  console.log("server started on port 3001");
});

// get pokemon info from API and pass it to client
app.get('/pokemon/:id', function(req,res) {
  axios.get(API+"/pokemon/"+req.params.id).then(response=>{
    res.send(response.data);
  });
});

// get pokemon count
app.get('/pokemon', function(req,res) {
  axios.get(API+"/pokemon").then(response=>{
    res.send(response.data);
  });
});


