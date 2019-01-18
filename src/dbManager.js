const dbOperations = require("./dbOperations");
const studentCrudOperations = require("./studentCrudOperations");
const courseCrudOperations = require("./courseCrudOperations");

const dbInit = () => (dbOperations.init());

// Student CRUD operations
const createStudent = (studentId, studentName) => (studentCrudOperations.createStudent(studentId, studentName));
const readStudent = (studentId) => (studentCrudOperations.readStudent(studentId));
const readAllStudents = () => (studentCrudOperations.readAllStudents());
const updateStudent = (studentId, newStudentName) => (studentCrudOperations.updateStudent(studentId, newStudentName));
const deleteStudent = (studentId) => (studentCrudOperations.deleteStudent(studentId));


// Course CRUD operations
const createCourse = (courseId, courseName) => (courseCrudOperations.createCourse(courseId, courseName));
const readCourse = (courseId) => (courseCrudOperations.readCourse(courseId));
const readAllCourses = () => (courseCrudOperations.readAllCourses());
const updateCourse = (courseId, newCourseName) => (courseCrudOperations.updateCourse(courseId, newCourseName));
const deleteCourse = (courseId) => (courseCrudOperations.deleteCourse(courseId));

// General methods
const assignStudentToCourse = (studentId, courseId) => (dbOperations.assignStudentToCourse(studentId, courseId));
const setScore = (studentId, courseId, newGrade) => (dbOperations.setScore(studentId, courseId, newGrade));
const getOutstandingStudents = () => (dbOperations.getOutstandingStudents());

const closeConnection = () => (dbOperations.closeConnection());

module.exports = {
    dbInit,
    createStudent,
    readStudent,
    readAllStudents,
    updateStudent,
    deleteStudent,
    createCourse,
    readCourse,
    readAllCourses,
    updateCourse,
    deleteCourse,
    assignStudentToCourse,
    setScore,
    getOutstandingStudents,
    closeConnection
};