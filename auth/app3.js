//! MIDLEWARE - has a req,res and next

//npm init
//npm install express

const express = require('express');
const app = express();

// logger will execute first and next() will send to the routes: homepage, admin
app.use(logger) //is creating an array of all the functions before sending back to the client, [logger,[homepage, admin]]

//the midleware has acces to req,res and next
app.get('/', (req, res) => {
    console.log('inside the route')
    res.send('home page')
})

//use function keyword because we are going to use it before is defined
function logger(req, res, next) { //this is the midleware function 
    console.log('Log')
    next();
}
// app.use(logger) //is creating an array of all the functions before sending back to the client

app.listen(3000, () => {
    console.log('listening to port 3000')
})