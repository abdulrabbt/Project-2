var express = require('express');
var router  = express.Router();

var student = require('../models/student');
var course   = require('../models/administrator');


router.get('/', student.getAll, renderIndex);
router.get('/new', renderNew);
router.get('/:id/edit',student.find, course.find, renderEdit);
router.get('/:id', course.find, student.findByCourse, renderShow);

router.post('/', student.create, course.create, redirectShow)
router.put('/:id', student.update, course.update, redirectShow);
router.delete('/:id', student.delete, redirectIndex);


function renderIndex(req, res){
    var mustacheVariables = {
        studentList: res.locals.student
    };
    res.render('./admin/index', mustacheVariables);
};

function renderShow(req, res){
    var mustacheVariables = {
        student: res.locals.student,
        courseStudent: res.locals.admin 
    };
    //console.log(mustacheVariables);
    res.render('./admin/show', mustacheVariables);
};

function renderEdit(req, res){
    var mustacheVariables = {
        studentList: res.locals.student,
        courseStudent: res.locals.admin
    };
    res.render('./admin/edit', mustacheVariables)
};

function renderNew(req, res){
    res.render('./admin/new');
};

function redirectIndex(req, res){
    res.redirect('/admin');
};

function redirectShow(req, res){
    res.redirect(`/admin/${res.locals.adminId}`);
};

module.exports = router;