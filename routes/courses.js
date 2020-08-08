const express = require('express');
const router = express.Router();
const courses=[]

router.get('/', (req,res)=>{
    res.send({
        "data": courses
    })
})

router.get('/:id', (req,res)=>{
    let curr_course
    let param=req.params
    courses.forEach(course=>{
        if (course.id==param.id){
            curr_course=course
        }
    })
    res.send(curr_course)
})

router.post('/', (req,res)=>{
    const course = req.body;
    if(course.name && course.description && course.enrolledStudents && course.availableSlots) {
        courses.push({
            ...course,
            id: `${courses.length + 1}`
        });
        res.send("Course Added Successfully!");
    }
})

router.post('/:id/enroll', (req,res)=>{
    const student = req.body.studentId;
    let curr_course;
    const course_id = req.params.id;

    courses.forEach( course => {
        if (course.id == course_id.id){
            curr_course = 1
            if (student in course["enrolledStudents"]) {
                res.send('Student already enrolled in this course!')
            }else{
                if (course["availableSlots"]>0){
                    course["availableSlots"] -= 1
                    course["enrolledStudents"].push(student)
                    res.send('Student enrolled successfully')
                }else{
                    res.send('No slots available for this course!')
                }
            }
        }
    })
    if (!curr_course){
        res.send('No course found for this id!')
    }
})

router.put('/:id/deregister', (req,res)=>{
    const student = req.body.studentId
    let curr_course;
    const course_id = req.params.id
    courses.forEach(course=>{
        if (course.id==course_id.id){
            curr_course=1
            const student_index = course["enrolledStudents"].indexOf(student)
            if (student_index !== -1){
                course["enrolledStudents"].splice(student_index,1)
                course["availableSlots"] += 1
                res.send('Student unregistered successfully')
            }else{
                res.send('No student with this id is enrolled in this course!')
            }
        }
    })
    if (!curr_course){
        res.send('No course found for this id!')
    }
})

module.exports = router;