var db      = require('../db/config');
var student = {};


student.getAll = function(req, res, next){
    db.manyOrNone("SELECT * FROM students;")
    .then(function(result){
        res.locals.student = result;
        next()
    }).catch(function(error){
        console.log(error);
        next();
    });
};


student.find = function(req, res, next){
    db.one("SELECT * FROM students WHERE id=$1;", [req.params.id])
    .then(function(result){
        res.locals.student = result;
        next();
    }).catch(function(error){
        console.log(error);
        next();
    });
};

student.update = function(req, res, next){
    db.one("UPDATE students SET name=$1, email=$2, phone=$3 WHERE id=$5 RETURNING id;", 
    [req.body.name, req.body.email, req.body.phone, req.params.id])
    .then(function(result){
        res.locals.studentId = result.id;
        next();
    }).catch(function(error){
        console.log(error);
        next();
    });
};

student.create = function(req, res, next){
    db.one("INSERT INTO students(name, email, phone) VALUES($1, $2, $3) RETURNING id;", 
    [req.body.name, req.body.email, req.body.phone, req.params.id])
    .then(function(result){
        res.locals.studentId = result.id;
        next();
    }).catch(function(error){
        console.log(error);
        next();
    });
};

student.delete = function(req, res, next){
    db.manyOrNone("DELETE FROM students WHERE id=$1;", [req.params.id])
    .then(function(){
        next()
    }).catch(function(error){
        console.log(error);
        next();
    });
};

student.findByCourse = function(req, res, next){
    db.manyOrNone("SELECT * FROM students WHERE id=$1;", [req.params.id])
    .then(function(result){
        res.locals.student = result;
        next();
    }).catch(function(error){
        console.log(error);
        next();
    });
};



module.exports = student;