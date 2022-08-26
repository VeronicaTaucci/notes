//build a server and turn it on
// 2 Main Pieces to Node Module Pattern
// 1- require()
// 2- module.exports or exports
let port = 3000;
let students = [{ fName: "Victoria", city: "Atlanta" }, { fName: "Andrew", city: "Atlanta" }, { fName: "Stephen", city: "Houston" }, { fName: "James", city: "Austin" }, { fName: "Matt", city: "Seattle" },]

//! 1. import code module from node.js library
const http = require('http'); //it has methods and properties
//! 2. Set up a server
const server = http.createServer((request, response) => { //arg1-callback function (request and response -objects)
    //request is what we get from client
    //response is what we send back to client
    // console.log(request.url) //http://localhost:3000/

    //! specific url
    switch (request.url) {
        case '/': //http://localhost:3000/
            response.setHeader('Content-Type', 'text/html') //letting the client know that we are sending html back
            response.end(`<h1>Hello Node</h1>`) //send info back to client
            break;
        case '/api': //http://localhost:3000/api
            response.setHeader('Content-Type', 'application/json') //letting the client know that we are sending json data
            let studentsJSON = JSON.stringify(students)
            response.end(studentsJSON) //send info back to client
            break;
        default:
            break;
    }
})
//! 3. turn the server on
server.listen(3000, () => { //http://localhost:3000/
    console.log(`listening to port ${port}`)
})

//! the way you export module
//in file from which we export: let name = 'Veronica'  module.exports = name
// in config file (app.js): let myName = require('.ourModules/stringMode');




