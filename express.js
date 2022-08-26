//! 1. npm init // package-lock.json  is going to keep track of all modules that will be installed
//! 2. npm install express /// node_modules

//! 3 import express
const express = require('express'); //this is a function block that has to be called
const app = express(); //invoking the function will return an object (instance of express)


//! 4 create and start a server
let port = 3000
app.listen(port, () => { //arg1 = port , arg2 = cb
    console.log(`listening on port: ${port}`)
})


//! 5 create a route handler
app.get('/', (req, res) => { //get= the request type // arg1 = '/' path: http://localhost:3000// , arg2 = cb/handler (req = info from request, res = send response back to client)
    res.send("Hello World")
})




