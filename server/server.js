const express = require ('express');
const app = express();

const bodyParser = require("body-parser");

const db = require ('./queries.js')

app.use(bodyParser.json());

const port = 8080

/*allDevsDetails = [
    {
        id : 1,
        name : "Anna",
        email : "anna@a.pl",
        role : "Frontend Developer",
        status : "Full time",
        avilability : "AV",
        team : "Team B",
    },
    {
        id : 2,
        name : "Jan",
        email : "jan@j.pl",
        role : "Frontend Developer",
        status : "Full time",
        avilability : "UA",
        team : "Team B",
    },
    {
        id : 3,
        name : "Stan",
        email : "stan@s.pl",
        role : "Frontend Developer",
        status : "Full time",
        avilability : "TUA",
        team : "Team C",
    },
]*/
// if any request will come serve static from build folder, serves static server with first view
app.use(express.static("build"));


/*

app.get('/createdb',db.createdb)

app.get('/dropdb',db.dropdb)

app.get('/rebuilddb',db.rebuilddb)

app.get('/createfixture',db.createfixture)

app.get('/api/allDevelopers', (req,res)=>{
    res.send(allDevsDetails);
})*/

// create new database
app.post('/createDatabase',db.createDatabase)

// get all developers list
app.get('/getAllDevelopers',db.getAllDevelopers)

// add new developer
app.post('/addNewDeveloper',db.adddeveloper)

// edit given developer details
app.put('/developer/:id',db.editdveloper)


/*
app.put('/api/developers/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const updatedDeveloper = req.body;

    try {
        // Update the developer's details in the database
        // Replace this with your own database code
        //const result = await db.updateDeveloper(id, updatedDeveloper);


        res.status(200).json({ message: 'Developer details updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update developer details!!!!!!!!!!' });
    }
});
*/

/*app.post('/api/developers', (req, res) => {
    const newDeveloper = req.body;
    allDevsDetails.push(newDeveloper);
    res.sendStatus(200);
});*/

//........................................

app.listen(port, function (){
    console.log(`server listening on port ${port}`)
})