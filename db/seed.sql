DROP DATABASE IF EXISTS school_db;
CREATE DATABASE school_db;
\c school_db

-- add create tables here

CREATE TABLE students(
  id serial primary key,
  name varchar,
  email varchar,
  phone int
);


CREATE TABLE course(
    id serial primary key,
    mathematics int,
    physics int,
    chemistry int,
    biology int,
    absence int,
    homework int,
    student_id int not null,
    foreign key(student_id) references students ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO students (name, email, phone) 
VALUES 
('Abdulrab Bin Taleb', 'abdulrab.bt@hotmail.com', 0545298122),
('Sarah Khaled', 'sarah@hotmail.com', 0545298188),
('Rand Khaled', 'rand@hotmail.com', 0545298177);


INSERT INTO course (mathematics, physics, chemistry, biology, absence, homework, student_id)
VALUES
(92, 88, 97, 78, 5, 2, 1),
(99, 98, 99, 100, 2, 0, 2),
(97, 99, 100, 99, 3, 1, 3);
