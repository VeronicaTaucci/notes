//! route middleware
const express = require('express');
const app = express();

app.use(passport)
app.get('/dashboard', auth, (req, res, next) => { //auth is a gatekeeper (is authanticated or not?)
    res.send('dashboard')
    next()
})

function auth(req, res, next) {
    if (req.isAuthenticated) {
        next()
    } else{
        res.redirect('/error')
    }
}

app.get('/error', (req, res,next)=> {
    res.send('not authenticated')
    next()
})
function passport(req, res, next) {
    req.isAuthenticated = true;
    next()
}
app.listen(3000, () => {
    console.log('listening to port 3000')
})