const express = require('express');
const Student = require('./models/students')
require('./db/conn')
const app = express();
const port = process.env.PORT || 2020;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create 
app.post('/students', (req,res)=>{
    console.log(req.body);
    const student = new Student(req.body);
    student.save().then(()=>{
        res.status(201).send(student)
    }).catch((err)=>{
        res.status(400).send(err)
    })
    //res.send('submit detail')
    // {
    //     user : req.body.name,
    //     phone : req.body.phone,
    //     email : req.body.email,
    //     address : req.body.address,
    // }
})

//created server 
app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})