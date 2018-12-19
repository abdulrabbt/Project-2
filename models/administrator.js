var db      = require('../db/config');
var course = {};


course.getAll = function(req, res, next){
    db.manyOrNone("SELECT * FROM course;")
    .then(function(result){
        res.locals.admin = result;
        next();
    }).catch(function(error){
        console.log(error);
        next();
    });
};

course.find = function(req, res, next){
    db.one("SELECT * FROM course WHERE student_id=$1;", [req.params.id])
    .then(function(result){
        res.locals.admin = result;
        next();
    }).catch(function(error){
        console.log(error);
        next();
    });
};

course.update = function(req, res, next){
    console.log(req.body);
    db.one("UPDATE course SET mathematics=$1, physics=$2, chemistry=$3, biology=$4, absence=$5, homework=$6, student_id=$7 WHERE id=$8 RETURNING id;", 
    [req.body.mathematics, req.body.physics, req.body.chemistry, req.body.biology, req.body.absence, req.body.homework, req.body.student_id, req.params.id])
    .then(function(result){
        console.log('********', result);
        res.locals.adminId = result.id;
        next();
    }).catch(function(error){
        console.log(error);
        next();
    });
};


course.create = function(req, res, next){
    db.one("INSERT INTO course(mathematics, physics, chemistry, biology, absence, homework, student_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id;", 
    [req.body.mathematics, req.body.physics, req.body.chemistry, req.body.biology, req.body.absence, req.body.homework, res.locals.studentId])
    .then(function(result){
        res.locals.adminId = result.id;
        next();
    }).catch(function(error){
        console.log('error in course.create');
        console.log(error);
        next();
    });
};

module.exports = course;
