//! GLOBAL MIDLEWARE
const express = require('express');
const app = express();

let count = 0;
app.use(countLog) //execute first

app.get('/', (req, res,next) => { //second
    console.log('home page')
    res.send('/home page')
    next()
})

app.get('/dashboard', (req, res, next) => {
    console.log('dashboard')
    res.send('dashboard')
    next()
})
app.use(printCurrentLog)

function countLog(req, res, next) { 
    count++;
    console.log(`countLog: ${count}`)
    next();
}
function printCurrentLog(req, res, next) {
    console.log(`printCurrentLog: ${count}`)
    next();
}

app.listen(3000, () => {
    console.log('listening to port 3000')
})