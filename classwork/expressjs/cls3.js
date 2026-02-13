const express = require("express"); // Import express
const fs = require("fs"); // Import file system
const app = express();
const port = 8000;

app.use(express.json()); // Parse JSON body

const DB_FILE = "student.json"; // Local database file

// Read data from JSON file
function readData() {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

// Write data to JSON file
function writeData(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Home route
app.get("/", (req, res) => {
    res.send("welcome to home page");
});

// Get all students
app.get("/student", (req, res) => {
    res.json(readData());
});

// Get student by id
app.get("/student/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = readData().find(s => s.id === id);

    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
});

// Add new student
app.post("/student", (req, res) => {
    const { id, name, branch } = req.body;

    if (!id || !name || !branch)
        return res.status(400).json({ error: "Missing fields" });

    const students = readData();

    if (students.find(s => s.id === id))
        return res.status(400).json({ error: "ID exists" });

    const newStudent = { id, name, branch };
    students.push(newStudent);
    writeData(students);

    res.status(201).json(newStudent);
});

// Update student id
app.put("/student/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const newId = parseInt(req.body.newId);

    const students = readData();
    const student = students.find(s => s.id === id);

    if (!student) return res.status(404).json({ error: "Student not found" });

    if (students.find(s => s.id === newId))
        return res.status(400).json({ error: "ID exists" });

    student.id = newId;
    writeData(students);

    res.json(student);
});

// puth method to update student name and branch
app.put("/student/:id", (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const { name, branch } = req.body;
        const students = readData();
        const studentIndex = students.findIndex(s => s.id === id);

        if (studentIndex === -1) {
            return res.status(404).json({ error: "Student not found" });
        }

        students[studentIndex].name = name;
        students[studentIndex].branch = branch;
        writeData(students);

        res.json(students[studentIndex]);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});



app.delete("/student/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const students = readData();
        const index = students.findIndex(s => s.id === id);
        
        if (index === -1) {
            return res.status(404).json({ error: "Student not found" });
        }

        const deleteStudent = students.splice(index, 1);
        writeData(students);

        res.json({ message: "Student deleted successfully", deletedStudent: deleteStudent[0] });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


// Start server
app.listen(port, () => console.log(`Server running on ${port}`));



