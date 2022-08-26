//! default for any form is ‘get’!
//GET - retrieve resource
//PUT - store resource
//DELETE - remove a resource
//POST - Update a resource
//HEAD - retrieve the headers or metadata for a resource


//? req.query //contains the URL query parameters (after the '?' in the URL).'user?userId=5896544', request.query.userId = 5896544
//? req.body // key-value pairs of data submitted in the request body // scraping data from header
//? req.params //object containing properties mapped to the named route "parameters".example: '/user/:name',the "name" = req.params.name.
//? res.send  // sets the content type to text/Html, the client will treat it as text. It then returns the response to the client.
//? res.render // renders a view and sends the rendered HTML string to the client, second argument is an object sent to client
//? res.json() //sends a JSON response ,this is used for api calls, sends a json object back to client



// how to send the info from form to url?
router.get('/submit', (req, res) => { //this is the default verb: get
    const { firstName, lastName } = req.query //req.query
    res.send(`data is in the url. ${firstName}, ${lastName}`)
})

// how to send the info from form to header? on form change the method = 'post'
// add body parser: (usually goes in app.js)
app.use(express.json()); //converts header payload string to js object
app.use(express.urlencoded({ extended: true })) //attaches is to the req.body
router.post('/submit', (req, res) => {
    const { firstName, lastName } = req.body //req.body
    res.send(`data is in the header. ${firstName}, ${lastName}`)
})

// make an api call to your backend and send json to front end:
let number = 3
router.get('/api/counter', (req, res) => {//send the current value of the counter to the client
    // client side: let result = await fetch('/api/counter') //this is a get by default
    res.json({
        value: number
    })
})

router.post('/api/counter', (req, res) => {
    // client side: let result = await fetch('/api/counter', { method: 'post' })
    number++;// adding 1 to the current value of the counter
    res.json({ status: 'incremented', value: number })//send an object back to client
});


router.put('/api/counter', (req, res) => {
    // client side: let result = await fetch('/api/counter', { method: 'put' })
    number--;//decrement the number// subtract 1 from the current value of the counter
    res.json({ status: 'decremented', value: number })
});

router.delete('/api/counter', (req, res) => {
    // client side: let result = await fetch('/api/counter', { method: 'delete' })
    number = 0;//reset the value of number to zero
    res.json({ status: 'reset', value: number })
});




