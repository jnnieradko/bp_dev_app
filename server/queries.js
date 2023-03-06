const Pool = require('pg').Pool
const pool = new Pool({
    user: 'beyondplay',
    host: 'localhost',
    database: 'beyondplay',
    password: 'bp',
    port: 5432,
})

var Fakerator = require("fakerator");
var fakerator = Fakerator();
var name = fakerator.names.name();

console.log(typeof name)

const getUsers = (request, response) => {
    pool.query('SELECT * FROM allDevelopers ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createdb = (request, response) => {
    pool.query('create table if not exists allDevelopers (\n' +
        '    id serial PRIMARY KEY,\n' +
        '    name text,\n' +
        '    email text,\n' +
        '    role text,\n' +
        '    status text,\n' +
        '    avilability text,\n' +
        '    team text\n' +
        '\n' +
        ')', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json("db rebuilded")
    })
}

const dropdb = (request, response) => {
    pool.query('drop table if exists allDevelopers', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
}

const rebuilddb = (request, response) => {
    pool.query('drop table if exists allDevelopers; create table if not exists allDevelopers (\n' +
        '    id serial PRIMARY KEY,\n' +
        '    name text,\n' +
        '    email text,\n' +
        '    role text,\n' +
        '    status text,\n' +
        '    avilability text,\n' +
        '    team text\n' +
        '\n' +
        ')', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json("przebodowana")

    })
}



const createfixture = (request, response) => {
    pool.query('insert into allDevelopers (name, email, role, status, avilability, team)\n' +
        `values  (\'${name}\', \'j@beyond.com\', \'F-dev\', \'FullTime\', \'Available\', \'TeamA\')`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
}

//create database
const createDatabase = (request, response) => {
    pool.query(
        'drop table if exists allDevelopers ; ' +
        'create table if not exists allDevelopers\n' +
        '(\n' +
        '    id          serial PRIMARY KEY,\n' +
        '    name        text,\n' +
        '    email       text,\n' +
        '    role        text,\n' +
        '    status      text,\n' +
        '    avilability text,\n' +
        '    team        text\n' +
        '\n' +
        ') ; ' +
        '' +
        'insert into allDevelopers (name, email, role, status, avilability, team)\n' +
        `values  (\'${name}\', \'j@beyond.com\', \'F-dev\', \'FullTime\', \'Available\', \'TeamA\') ;` +
        '' +
        'insert into allDevelopers (name, email, role, status, avilability, team)\n' +
        `values  (\'${name}\', \'k@beyond.com\', \'F-dev\', \'FullTime\', \'Available\', \'TeamB\') ;`
        +
        '' +
        'insert into allDevelopers (name, email, role, status, avilability, team)\n' +
        `values  (\'${name}\', \'k@beyond.com\', \'F-dev\', \'FullTime\', \'Available\', \'TeamC\') ;`+
        '' +
        'insert into allDevelopers (name, email, role, status, avilability, team)\n' +
        `values  (\'${name}\', \'k@beyond.com\', \'F-dev\', \'FullTime\', \'Available\', \'TeamA\') `


        , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
}

//add user
const adddeveloper = (request, response) => {

    const { id, name, email, role, status, availability, team } = request.body;


    pool.query("INSERT INTO allDevelopers (id, name, email, role, status, avilability, team) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [id, name, email, role, status, availability, team], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(`Developer added with ID: ${id}`)

    })
}

//edit developer
const editdveloper = (request, response) => {

    const id = parseInt(request.params.id);
    const { name, email, role, status, availability, team } = request.body;

    pool.query( 'UPDATE allDevelopers SET name = $1, email = $2, role = $3, status = $4, avilability = $5, team = $6 WHERE id = $7',
        [name, email, role, status, availability, team, id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json('Developer details updated successfully')

        })
}


module.exports = {getAllDevelopers: getUsers, createdb, dropdb, rebuilddb, createfixture, createDatabase, adddeveloper, editdveloper}