//! how does PASSPORT WORKS?

//! npm init
//! 1. npm install pbkdf2 : algorithm that creates hash from text

//! 2. require crypto: this is an npm module, encrypts the hash
const pbkdf2 = require('pbkdf2'); //arg1=password, arg2=salt, arg3 =mix how many times , arg4 = , arg5 = the hashing algorithm 

//! 3. core module, encrypts a hash
const crypto = require('crypto') // salt = randomize/is mixing a string, the password
let salt = crypto.randomBytes(20).toString('hex') // is mixing the crypto result, arg1= how many times you want  to be randomized, converts the buffer to a hex producing a string
// console.log(salt) // buffer

//! 4. hash a password
let password = 'any pass'
let key = pbkdf2.pbkdf2Sync(password, salt,3600,256,'sha256' )
// console.log(key)

let hash = key.toString('hex') // is mixing the the hashed key 
// console.log(key)

let stored_pass = `pbkdf2_sha256*3600*${salt}*${hash}`// store this password to database, * is a delimiter 
// console.log(stored_pass)

//! reloging in, check is the password is a match with what we have in the database
let newLogInPassword = 'any pass'
//? retrieve password from database
//? we need to split the database password by the (*)
let pass_parts = stored_pass.split('*') //[pbkdf2_sha256,3600,${salt},${hash}]


//? get the new password and run it through the same encryption --> [pbkdf2_sha256,3600,${salt},${hash}]
let newPassword = pbkdf2.pbkdf2Sync(newLogInPassword, pass_parts[2], parseInt(pass_parts[1]), 256, 'sha256')
//? convert to a hex
let hashLoginPassword = newPassword.toString('hex')

//? check if they match
if (hashLoginPassword == pass_parts[3]) {
    console.log('it is a match')
} else {
    console.log('no match')
}