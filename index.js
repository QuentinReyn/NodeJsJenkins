const express = require('express'),
  app = express(),
  cors = require('cors'),
  mysql = require('mysql'), // import mysql module
  bodyParser = require('body-parser');

  let port = process.env.PORT || 3000;
// make server object that contain port property and the value for our server.

db = mysql.createConnection({
    host: 'bhdyilbzgnpopubgq3tt-mysql.services.clever-cloud.com',
    user: 'uikrvl7mddnejzzu',
    password: 'gAI9Sm294NXa2ZbrTEuh',
    database: 'bhdyilbzgnpopubgq3tt'
  })

// use the modules
const userRouter = require('./routes/user');
const choiceRouter = require('./routes/choice');
const choiceUserRouter = require('./routes/choiceUser');
// use the modules
app.use(cors())
app.use(bodyParser.json());
// use router
app.use('/user', userRouter);
app.use('/choice', choiceRouter);
app.use('/choiceuser', choiceUserRouter);
app.get("/",(req,res) => {
res.send("Hello World");
})
// starting the server
app.listen( port , () => console.log(`Server started, listening port: ${port}`));