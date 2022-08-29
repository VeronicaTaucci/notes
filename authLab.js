//! npm install -> install all dependecies
//! set up database: npm install sequelize pg pg-hstore
        //pg -> pg is a PostgreSQL client for Node. js, pg is responsible for creating our application's database connection.
        //pg-hstore -> This module implements the hstore data type for storing sets of key/value pairs within a single PostgreSQL value
        // sequelize -> handling database records by representing the data as objects.
//! run: sequelize init
// ! in the config/config.json:
// {
//         "development": {
//         "username": "postgres",
//         "password": null,
//         "database": "auth2022a",
//         "host": "127.0.0.1",
//         "dialect": "postegres"
//     }
// }

//! sequelize db:create
//! generate the models. create a table for roles and one for users. the roles table has to be created first so we can connect it to users
    // run: code init.bash
    // sequelize model: generate--name roles--attributes name: string
    // sequelize model: generate--name users--attributes username: string, email: string, password: string, roleID: integer
    //run: bash init.bash (models and migrations will be created)
//! in the migrations create the association
    //?roles:
//      static associate(models) {
//     // define association here, a role has many users
//     models.roles.hasMany(models.users, { foreignKey: 'roleID' })
// }
    //? users
//      static associate(models) {
//     // define association here
//     models.users.belongsTo(models.roles, { foreignKey: 'roleID' })
// }
//! in the migration: users
 //?before:
//  roleID: {
//      type: Sequelize.INTEGER
//  }
//?after:
// roleID: {
//     type: Sequelize.INTEGER,
//         references: {
//         model: 'roles',
//             key: 'id'
//     }
// }
//! run: sequelize db:migrate

///////////////////// REGISTRATION /////////////////
//! install bcrypt, it will salt and hash the passport: npm install bcryptjs
//! the form contains: username,email,password. in the view/registration.js: <form action="/registration" method="POST">
//! in the routes/registration:
//! initialize a seeders file: sequelize seed:generate --name users // users = name of the file, seeders will create initial data in db
//! run seeders: sequelize db:seed:all
// await queryInterface.bulkInsert('roles', [{
//     name: 'Basic',
//     createdAt: new Date(),
//     updatedAt: new Date()
// },
// {
//     name: 'Admin',
//     createdAt: new Date(),
//     updatedAt: new Date()
// }
// ], {});

//! in the routes/registration
// router.post('/registration', async (req, res) => {
//     //collect data from form and store it in the db
//     try {
//         //? 1. scrape info from the header
//         let { username, email, password } = req.body;
//         //? 2. encrypt the password, import bcrypt: const bcrypt = require('bcryptjs'); //has and salt the password
//         password = bcrypt.hashSync(password, 8); //arg1=variable you want to crypt, arg2= how many times you want to salt
//         //? 3. create a new record in the db // bring the database; const db = require('../models') //models/index.js
//         let insertRecord = await db.users.create({
//             username: username,
//             email: email,
//             password: password, //encrypted and salted already
//             roleID: 1 //use seeders to create the roleIDs first

//         })
//         console.log('completed')
//         res.redirect('/login')

//     } catch (error) {
//         console.log(error)
//         res.render('registration', {
//             error: "error can't register this user name"
//         })

//     }
// })


//? make sure the app.js has (above the routes):
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())


//! npm install passport passport-local
// bring passport to app.js and initialize
// const passport = require('passport');

    // app.use(passport.initialize());
    // app.use(passport.session())
//! set up cookie: npm install cookie-session
    // in app.js: const cookieSession = require('cookie-session');
    //app.use(cookieSession({
    //     name: 'session',
    //     key: ['vxcvxvcxvcxvsds22sd'], //secret key to decode the cookie coming from the client
    //     maxAge: 14 * 24 * 60 * 60 * 1000
    // }))
//! create folder for the auth service (auth) and import it in the app.js passing the password: require('./auth/passport-config')(passport) --> passport will be the name of the function in the passport-config

//! documentation: http://www.passportjs.org/tutorials/password/verify/
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var bcrypt = require('bcryptjs');
// var db = require('../models');

// //scrape info from header
// //check if user is in db
// //encrypt login and password
// //compare the encrypted password with what is in db
// //place the session on the login to persist

// const init = (passport) => {
//     //req => passport => session req.isAuthenticated () => response
//     passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
//         try {
//             let records = await db.users.findAll(({ where: { email: email } }))

//             //! if record found
//             if (records) {
//                 let record = records[0]
//                 // get db password and compare to the password entered in the form
//                 bcrypt.compare(password, record.password, (err, match) => {//arg1=password entered by the user, arg2 = password in the db, arg3= cb
//                     if (match) {
//                         console.log('password match')
//                         return done(null, record) // arg1= if there is an error, arg2= a record that sends info back
//                     } else {
//                         console.log(`password didn't match`)
//                         return done(null, false)
//                     }
//                 })
//             } else {
//                 //! no user in database
//                 return (done, null)
//             }
//         } catch (error) {
//             console.log(error)
//             return (done, error)
//         }
//     }))
//     //add the user info to the session
//     //user is going to come from the record passed to the form
//     passport.serializeUser((user, done) => {
//         done(null, user.id) //arg2 is what is going to the session
//     })
//     //check if user is valid, grab session id from user cookie, decode cookie with secret and check to see if it is in the db
//     passport.deserializeUser(async (id, done) => {// deserialize user 
//         try {
//             let foundUserInDBFromSessionId = await db.users.findByPk(id); //return object if found
//             if (foundUserInDBFromSessionId) {
//                 done(null, foundUserInDBFromSessionId) //still authenticated 
//             } else {
//                 done(null, false) //needs to sign back in, no obj on session so they can't authenticate 
//             }
//         } catch (error) {
//             done(null, false)
//         }
//     })
// }

// module.exports = init;

//! in login.js
// const express = require('express');
// const passport = require('passport');
// const router = express.Router();
// const db = ('..models')

// router.get('/login', (req, res) => {
//     res.render('login')
// })

// router.post('login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }))

// module.exports = router;

//! in auth/index.js
const authReq = (req, res, next) => {

    let auth = req.isAuthenticated();
    if (auth) {
        return next()
    } else {
        res.redirect('/login')
    }
}
module.exports = authReq //import this where you want to have protected pages