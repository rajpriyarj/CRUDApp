const express = require('express');
const router = express.Router();

const students=[]

//------GET STUDENTS API------//

router.get('/', (req, res)=>{
    res.send({
        "Students list": students
    })
})

//------GET STUDENTS API on basis of id------//

router.get('/:id', (req, res)=>{
    let curr_student
    let student_id=req.params.id;
    students.forEach(user=>{
        if (user.id==student_id.id){
            curr_student=user
        }
    })
    res.send(curr_student)
})

//------POST STUDENTS API------//

router.post('/', (req,res)=>{
    const student = req.body;
    if (student.student_name){
        students.push({
            ...student,
            id: `${students.length + 1}`
        });
        res.send("Student registered successfully")
    }else{
        res.send("Invalid Student Creation!!")
    }
});

//------PUT STUDENTS API------//

router.put('/:id', (req,res)=>{
    const student_id = req.params.id;
    const student_update = req.body;
    let index = -1;
    for (let student of students){
        if (student.id == student_id){
            if (student_update.name != null || undefined)
                student.student_name = student_update.student_name;
            res.send("Student Updated");
        }
    }
    res.send("Student not found!!");
});

//------DELETE STUDENTS API------//

router.delete('/:id', (req,res)=>{
    const student_id = req.params.id;
    for(let student of students){
        if (student.id == student_id){
            students.splice(students.indexOf(student), 1);
            res.send("Student Deleted");
        }
    }
    res.send("Student does not exist")
});

module.exports = router;