
// Commands:
//   sequelize db:migrate                        Run pending migrations
//   sequelize db: migrate: schema: timestamps:add  Update migration table to have timestamps
//   sequelize db: migrate:status                 List the status of all migrations
//   sequelize db: migrate:undo                   Reverts a migration
//   sequelize db: migrate: undo:all               Revert all migrations ran
//   sequelize db:seed                           Run specified seeder
//   sequelize db: seed:undo                      Deletes data from the database
//   sequelize db: seed:all                       Run every seeder
//   sequelize db: seed: undo:all                  Deletes data from the database
//   sequelize db:create                         Create database specified by configuration
//   sequelize db:drop                           Drop database specified by configuration
//   sequelize init                              Initializes project
//   sequelize init:config                       Initializes configuration
//   sequelize init:migrations                   Initializes migrations
//   sequelize init:models                       Initializes models
//   sequelize init:seeders                      Initializes seeders
//   sequelize migration:generate                Generates a new migration file
//   sequelize migration:create                  Generates a new migration file
//   sequelize model:generate                    Generates a model and its migration
//   sequelize model:create                      Generates a model and its migration
//   sequelize seed:generate                     Generates a new seed file
//   sequelize seed:create                       Generates a new seed file



//!if no CLI, then run: sudo npm install -g sequelize-cli to install sequelize // Sequelize is a promise-based Node.js ORM for Postgres
//! 1 npm install
//! 2. npm install pg pg-hstore
//! 3. sequelize init // initialize a project (assuming you have CLI installed) //? this will create: models, migrations, seeders, config (configuration of our database)
//! 4.  configure the database, in the config folder -> json file:
// {
//     "development":{
//     "username": "postgress",
//     "password": null,
//     "database": "menus2",
//     "host": "127.0.0.1",
//     "dialect": "postgress"
//     }
// }

//!5. create database file that is in the config file (menus2): in the config folder run: sequelize db:create
//!6. create models (allows us to stay in js in talk to the database), you can create models through terminals or bash file
//* a bash file will allow you to run commands later on
//! 6(a) code bash init.bash
// create a table--name < tableName > --atributes < column names >: <datatype>
//? sequelize model:generate --name user --attributes firstName:string,lastName:string,email:string
//!6(b) bash init.bash //that will create a user.js in the models folder
//! 7: sequelize db:migrate //that will create a file in the migration, creating a table in the database 
//? in the database SequelizeMeta will keep track of all migrations that were made
//? sequelize db:migrate:undo will revert the migration and it will drop the table 

//! const db = require('../models/todos')

//the index.js in the models an instance of db is created, so you have acces to the database: const db = require('./models') == const db = require('./models/index')
//! CRUD OPERATIONS
//? add data to the database
// const db = require('../models/todos')
const createRecords = async () => {
    await db.user.create({ firstName: 'Kipp', lastName: 'Noclue', email: 'kipp@dc.com' })
    await db.user.create({ firstName: 'Kira', lastName: 'Voly', email: 'kira@dc.com' })
    await db.user.create({ firstName: 'Jeff', lastName: 'Alon', email: 'jeffp@dc.com' })
    await db.user.create({ firstName: 'Jz', lastName: 'Smith', email: 'smith@dc.com' })
    await db.user.create({ firstName: 'Georgi', lastName: 'Cupcic', email: 'cupcic@dc.com' })
}
// createRecords()

const findAll = async () => {
    let records = await db.user.findAll(); //array of objects [{},{},{}]
    // console.log(records);
    records.forEach(element => {
        console.log(`${element.firstName} ${element.lastName} ${element.email}`);
    })
}
//! findAll()

const findByPK = async (id) => {
    let record = await db.user.findByPk(id); //{}
    console.log(record.firstName, record.lastName, record.email);
}
//! findByPK(2)

const findWhere = async () => {
    let records = await db.user.findAll({ where: { firstName: 'Kipp' } }); // [{}, {}, {}] 
    records.forEach(record => {
        console.log(`${record.firstName} ${record.lastName} ${record.email}`);
    })
}
//! findWhere()


const deleteRecord = async (id) => {
    let record = await db.user.destroy({ where: { id: id } })
    findAll()
}
//! deleteRecord(2)

const updateRecord = async (id) => {
    let update = await db.user.update({ lastName: 'newUpdate' }, { where: { id: id } })
}
//! updateRecord(1)


//! ASSOSIACION
// int the initial.bash create a new table blogs: //? #userID will be linked to the primaryKey of the user table
// sequelize model: generate--name blogs--attributes title: string, body: string, userID: integer 
//in the root run: bash init.bash

//! in the models open the user and blogs
//? blogs:
//  static associate(models) {//models gives you acces to al the models
//     // define association here
//     //?a user has many blogs, a blog belongs to a user
//     models.blogs.belongsTo(models.user, { foreignKey: 'userID' }) //arg1=table (models.blogs), arg2=link to ==> {foreignKey:'userID'} 

// }
//? user:
// static associate(models) { //models gives you acces to al the models
//     // define association here
//     //?a user has many blogs, a blog belongs to a user
//     models.user.hasMany(models.blogs, { foreignKey: 'userID' }) //arg1=table (models.blogs), arg2=link to ==> {foreignKey:'userID'} 

// }
//? in migration/blogs:
// userID: {
//     type: Sequelize.INTEGER,
//         references: {
//         model: 'users',
//             key: 'id'
//     }
// }

//! run: sequelize db:migrate 

//?get all blogs and their author
const findBlogs = async () => {
    let blogs = await db.blogs.findAll({ include: [{ model: db.user, required: true }] }) //findAll()[{},{},{}] ,include = [], required: true - is producing a inner join
    blogs.forEach(blog => {
        console.log(`${blog.title}: ${blog.user.firstName} ${blog.user.lastName}`)
    })
}
// findBlogs()

//? find author and their blogs
const findAuthor = async () => { //this will get us a list of users
    let users = await db.user.findAll({
        include: [{
            model: db.blogs,
            required: true
        }]
    }) //findAll()[{},{},{}] ,include = [], required: true - is producing a inner join
    users.forEach(user => {
        // console.log(`${user.blogs}`)
        user.blogs.forEach(blog => {
            console.log(`${user.firstName}: ${blog.title}`)
        })
    })
}
// findAuthor()