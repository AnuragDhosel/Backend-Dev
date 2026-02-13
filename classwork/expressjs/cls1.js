const express = require('express');
const app =express();
const port=8000;

const student=[
    {id:1,name:"shubham",branch:"cse"},
    {id:2,name:"batsal",branch:"ece"},
    {id:3,name:"akh1kyro",branch:"diploma"}
]


app.get("/",(req,res)=>{
    res.send("welcome to home page")
})

app.get("/user",(req,res)=>{
    res.send("user")
})

app.get("/student",(req,res)=>{
    res.json(student)
})

app.get("/student/:id",(req,res)=>{
    res.send(" ")
})


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})