const express = require('express')
const router = express.Router()
const Student = require("../models/students")

//create a new student
//1 by promising
// router.post('/students', (req,res)=>{
//     const student = new Student(req.body);
//     student.save().then(()=>{
//         res.status(201).send(student)
//     }).catch((err)=>{
//         res.status(400).send(err)
//     })
// })

//2 by using async/await and try/catch 
router.post('/students', async(req,res)=>{
    try {
        const student = new Student(req.body);
        const newStudent = await student.save();
        res.status(201).json({status:201, message:"Registration Successful", data: newStudent})
    } catch (err) {
        res.status(400).json({status:201, message:err});
    }
})

//3 by using async/await and then/catch
// router.post('/students', async(req,res)=>{
//     const student = new Student(req.body);
//     const newStudent = await student.save()
//     .then((data)=>{res.status(201).json({status:201, message:"Registration Successful", data: data})})
//     .catch((er)=>{res.status(400).json({status:201, message:er})})
// })

//read all students detail
router.get('/students', async(req,res)=>{
    try {
        const students = await Student.find()
        res.status(201).json({status:201, message:"Fatched", data: students})
    } catch (error) {
        res.status(400).json({status:400, message:error})
    }
})

//read individual student detail (By id)
// router.get('/students/:id', async(req,res)=>{
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
router.get('/students/:name', async(req,res)=>{
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

//update student data(By ID)
router.patch('/students/:id', async(req,res)=>{
    try {
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body,{new: true})
        res.status(201).json({status:201, message:"Successfully Updated", data: updateStudent})
    } catch (error) {
        res.status(500).json({status:500, message:error})
    }
})

//update student data(By name)
//router.patch('/students/:name', async(req,res)=>{
//     try {
//         const _name = req.params.name;
//         const updateStudent = await Student.findOneAndUpdate({name:_name}, req.body,{new: true})
//         res.status(201).json({status:201, message:"Successfully Updated", data: updateStudent})
//     } catch (error) {
//         res.status(500).json({status:500, message:error})
//     }
// })

//Delete student detail
router.delete('/students/:id', async (req,res)=>{
    try {
        const _id = req.params.id;
        console.log(_id);
        const deleteStudent = await Student.findByIdAndDelete(_id)
        console.log(deleteStudent);
        if(!deleteStudent){
            res.status(404).json({status:404, message:"Not Found"})
        }else{
            res.status(201).json({status:201, message:"Successfully Deleted", data: deleteStudent})
        }
    } catch (error) {
        res.status(500).json({status:500, message:error})
    }
})

module.exports = router;