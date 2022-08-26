const express = require('express');
const app = express();
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//!1 npm install cookie-session
const cookieSession = require('cookie-session') //persist data across different routes

let users = [

    { username: 'Matt', password: '1234' },
    { username: 'Jake', password: '4567' },
    { username: 'Brandon', password: '8901' },
    { username: 'Jose', password: '1122' }
]

//!2 set up the cookie session
app.use(cookieSession({//set up a midlware, arg1 = name, arg2 = keys
    name: 'session', // this will be added to the req.session 
    keys: ['sdsadsdsds'],
    maxAge: 14 * 24 * 60 * 60 * 1000//2 weeks - in seconds
})) 


app.get('/', (req, res) => {
    res.render('index')
})
app.post('/login', (req, res) => {
    let { userID, password } = req.body
    //check database for correct username and password 
    // re-encrypting the password check to see if the hash match
    let user = users.find(userRecord => {
        return userRecord.username == userID && userRecord.password == password
    })
    if (user) { //a match was found
        //! place the user's id on the session
        req.session.isAuthenticated = true;
        res.redirect('/protected')
    } else {
        //no user found
        res.redirect('/')
    }


})

app.get('/protected', auth, (req, res) => {
    //make sure taht they are still loged in  (cookie session)
    res.send('protected')
})
app.get('/notprotected', (req, res) => {
    res.send('not protected')
})
app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/')
})
function auth(req, res, next) { //gatekeeper
    if (req.session.isAuthenticated) {
        next()
    } else {
        res.redirect('/')
    }
}

app.all('admin/*', auth) //protect all routes that has the path: /admin/
app.get('/admin/dashboard', (req, res) => {
    res.send('/admin/dashboard')
})
app.get('/admin/users', (req, res) => {
    res.send('/admin/users')
})
app.get('/admin/metrics', (req, res) => {
    res.send('/admin/metrics')
})



app.listen(3000, () => {
    console.log('listening to port 3000')
})