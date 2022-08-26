//!cookie SESSION

//! npm init
//! npm install express

const express = require('express');
const app = express();
let port = 3000;

//! when you travel from a page to another there is no state information, the data is not persisted, that is why you need to persist store info so we can navigate through pages 
//! use session and cookies for that 

//! 1. run: npm install cookie-session, that installs cookie
const cookieSession = require('cookie-session'); //set ap the cookie session
 //initiate the cookie session
app.use(cookieSession({//set up a midlware, arg1 = name, arg2 = keys
    name: 'session',
    keys: ['sdsadsdsds'],
    maxAge: 14 * 24 * 60 * 60 *1000//2 weeks - in seconds
}))
//!3
app.get('/', (req, res) => {
    req.session.fName='Kipp' //PLACE THIS ON THE COOKIE, places it in the body.session
    res.send('home page')//the cookie is also being send
})

//! 4
app.get('/protected', (req, res) => { // it has acces to the 
    res.send(`protected ${req.session.fName}`)
})

//!5 MIDLEWARE = function, executes between request and response (route level, application level, error midleware etc)


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})