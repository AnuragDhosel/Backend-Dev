const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

const students = [
    { id: 1, name: "shubham", branch: "cse" },
    { id: 2, name: "batsal", branch: "ece" },
    { id: 3, name: "akh1kyro", branch: "diploma" }
]

app.get("/", (req, res) => {
    res.send("welcome to home page")
})

app.get("/user", (req, res) => {
    res.send("user")
})


app.get("/students", (req, res) => {
    res.json(students)
})

app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!id) {
        return res.status(400).json({ error: "student id is required" });
    }

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ error: "student not found" });
    }

    res.json(student);
});

app.get("/students", (req, res) => {
    const branch = req.query.branch;
    if (!branch) {
        return res.json[students];
    }
    const foundStudents = students.filter[(s) => s.branch == branch];
    res.json[foundStudents];
})

app.post("/api/students", (req, res) => {
    const { name , branch } = req.body;

    if (!name || !branch) {
        return res.status(400).json({ error: "Invalid user data" });
    }

    const newUser = {
        id: students.length + 1,
        name,
        branch
    };

    students.push(newUser);
    res.status(201).json(newUser);
});

// put methode 
app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, branch } = req.body;
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ error: "student not found" });
    }
    if (name) student.name = name;
    if (branch) student.branch = branch;
    res.json(student);
});

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})