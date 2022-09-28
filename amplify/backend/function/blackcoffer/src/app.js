/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const { MongoClient } = require("mongodb");
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

var uri = "mongodb://mellob:mellob1989@172.105.61.35:27017/?authMechanism=DEFAULT"
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/*
app.get('/api', async function(req, res) {
  const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});
  try{
  const database = client.db('temp');
  const col = database.collection('data');
  const query = { topic: 'oil' };
  const result = await col.find(query).toArray().then((ans) => {
                                                                    return ans;
                                                                  });
  //var send = await result.forEach(console.dir)
  res.json(result);
  //console.log(result);
  }
  catch{
    res.json({"err" : console.dir})
  }
  finally{
    await client.close();
  }
});
*/
app.get('/api', async function(req, res) {
  
  const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});
  try{
  const database = client.db('temp');
  const query = {};
  const col = database.collection('data');
  if (req.headers.topic !== ""){
    query['topic'] = req.headers.topic;
  }
  if (req.headers.endyr !== ""){
    query['endyr'] = req.headers.endyr;
  }
  if (req.headers.source !== ""){
    query['source'] = req.headers.source;
  }
  if (req.headers.pest !== ""){
    query['pest'] = req.headers.pest;
  }
  if (req.headers.country !== ""){
    query['country'] = req.headers.country;
  }
  if (req.headers.city !== ""){
    query['city'] = req.headers.city;
  }
  if (req.headers.sector !== ""){
    query['sector'] = req.headers.sector;
  }
  if (req.headers.region !== ""){
    query['region'] = req.headers.region;
  }

  const result = await col.find(query).toArray().then((ans) => {
                                                                    return ans;
                                                                });
  //var send = await result.forEach(console.dir)
  res.json(result);
  //console.log(result);
  }
  catch{
    res.json({"err" : console.dir})
  }
  finally{
    await client.close();
  }
  
  //res.json({body : JSON.parse(req.body.query)})
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
