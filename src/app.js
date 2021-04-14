const express = require('express');
const Student = require('./models/students')
require('./db/conn')
const studentRouter = require("./routers/student")

const app = express();
const port = process.env.PORT || 2020;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(studentRouter)

//created server 
app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})