const express = require('express');
const app = express();
const port = 4000;

// middle ware
app.set("view engine" , "ejs");


const student = [
    {id:1 , name: "raj" , branch: "CSE"},
    {id:2 , name: "ajay" , branch: "CSE"},
    {id:3 , name: "raj2" , branch: "CSE"},
]

// get route
app.get('/', (req, res) => {
    res.render("form");
});



app.post('/student/register', (req, res) => {
    console.log("form" , req.body);
    res.send("registered");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

