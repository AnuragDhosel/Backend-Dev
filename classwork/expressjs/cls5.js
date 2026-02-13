// middle ware

const express = require('express');
const app = express();
app.use(express.json());
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use((req, res, next) => {
    console.log(`I am middleware 1`);
    next();
} );

app.use((req, res, next) => {
    console.log(`I am middleware 2`);
    next();
    //return res.send("You are not allowed to access this resource");
} );

const readStudentsFromFile= async () => {
    const data = await fs.readFile("./students.json", "utf-8");
    return JSON.parse(data || "[]");
} ;

const writeStudentsToFile = async (students) => {
    await fs.writeFile("./students.json", JSON.stringify(students, null, 2));
};

// app.get("/student" , fileAuthMiddleware , async (req , res) => {
//     const students = await readStudentsFromFile();
//     return res.
// });

app.get("/students", async (req, res) => {
    const students = await readStudentsFromFile();
    return res.status(200).json(students);
});

app.post("/students", async (req, res) => {
    const newStudent = req.body;
    const students = await readStudentsFromFile();
    students.push(newStudent);
    await writeStudentsToFile(students);
    res.json({ message: "Student added successfully" });
});


const authmiddleware = ((req , res, next) => {
    const token = req.headers["authorisation"];
    if(!token) return res.send("not provided");
    if(token === "secrettoken"){
        return res.send("passed")
    }
    next();
})