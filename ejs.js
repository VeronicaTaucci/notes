// EJS. (Run commands: npm init, npm install express ejs)
// File structure:
// Data: --> x-- > data.json
// Public: --> css, images, js-- > x
// Routes: --> x-- > index.js
// Views: --> x-- > index.ejs
// Node_modules
// Package.json
// App.js


//? Routes –> index.js:
const express = require('express')
const router = express.Router();
const dataFile = require('../data/data.json');//!1 import data from data.json //when imported it will be converted to js {speakers: [{},{},{}]}
let pageSpeakers = dataFile.speakers
router.get('/', (req, res) => {
    res.render('index', {
        artwork: pagePhotos,///this is passed to ejs 
    })
})
Module.exports = router;




//? App.js
const express = require('express'); //this is a function block that has to be called/invoked
const app = express(); //invoking the function will return an object (instance of express)
app.use(express.static('public'))//configure public folder
app.set('view engine', 'ejs')//install ejs templates
app.use(require('./routes/index'))
let port = 3000//! create and start a server
app.listen(port, () => { //argument1 = port , argument2 = callBack
    console.log(`listening on port: ${port}`)
})


