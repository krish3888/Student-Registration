const express = require('express');
const Student = require('./models/students')
require('./db/conn')
const app = express();
const port = process.env.PORT || 2020;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create a new student
//1 by promising
// app.post('/students', (req,res)=>{
//     const student = new Student(req.body);
//     student.save().then(()=>{
//         res.status(201).send(student)
//     }).catch((err)=>{
//         res.status(400).send(err)
//     })
// })

//2 by using async/await and try/catch 
app.post('/students', async(req,res)=>{
    try {
        const student = new Student(req.body);
        const newStudent = await student.save();
        res.status(201).json({status:201, message:"Registration Successful", data: newStudent})
    } catch (err) {
        res.status(400).json({status:201, message:err});
    }
})

//3 by using async/await and then/catch
// app.post('/students', async(req,res)=>{
//     const student = new Student(req.body);
//     const newStudent = await student.save()
//     .then((data)=>{res.status(201).json({status:201, message:"Registration Successful", data: data})})
//     .catch((er)=>{res.status(400).json({status:201, message:er})})
// })

//read all students detail
app.get('/students', async(req,res)=>{
    try {
        const students = await Student.find()
        res.status(201).json({status:201, message:"Fatched", data: students})
    } catch (error) {
        res.status(400).json({status:400, message:error})
    }
})

//read individual student detail (By id)
// app.get('/students/:id', async(req,res)=>{
//     try {
//         const _id = req.params.id;
//         const students = await Student.findById(_id)
//         if(!students){
//             res.status(404).json({status:404, message:"Not Found"})
//         }else{
//             res.status(201).json({status:201, message:"Fatched", data: students})
//         }
//     } catch (error) {
//         res.status(500).json({status:500, message:error})
//     }
// })

//read individual student detail (By name)
app.get('/students/:name', async(req,res)=>{
    try {
        const _name = req.params.name;
        const students = await Student.findOne({name: _name})
        if(!students){
            res.status(404).json({status:404, message:"Not Found"})
        }else{
            res.status(201).json({status:201, message:"Fatched", data: students})
        }
    } catch (error) {
        res.status(500).json({status:500, message:error})
    }
})

//created server 
app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})