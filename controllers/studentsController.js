var express = require('express');
var router  = express.Router();

var student = require('../models/student');
var course   = require('../models/administrator');

router.get('/', student.getAll, renderIndex);
router.get('/:id', course.find, student.findByCourse, renderShow);

function renderIndex(req, res){
    var mustacheVariables = {
        student: res.locals.student
    };
    res.render('./students/index', mustacheVariables);
};

function renderShow(req, res){
    var mustacheVariables = {
        student: res.locals.student,
        courseStudent: res.locals.admin 
    };
    res.render('./students/show', mustacheVariables);
};

module.exports = router;