const dbOperations = require("./dbOperations");
const studentCrudOperations = require("./studentCrudOperations");
const courseCrudOperations = require("./courseCrudOperations");

const dbInit = () => {
    return new Promise((resolve, reject) => {
        dbOperations.init().then(()=> {
            resolve();
        }).catch(() => {
            reject();
        });
    });
};

// Student CRUD operations
const createStudent = (studentId, studentName) => {
    return new Promise((resolve, reject) => {
        studentCrudOperations.createStudent(studentId, studentName).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

const readStudent = (studentId) => {
    return new Promise((resolve, reject) => {
        studentCrudOperations.readStudent(studentId).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

const readAllStudents = () => {
    return new Promise((resolve, reject) => {
        studentCrudOperations.readAllStudents().then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

const updateStudent = (studentId, newStudentName) => {
    return new Promise((resolve, reject) => {
        studentCrudOperations.updateStudent(studentId, newStudentName).then(()=> {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};

const deleteStudent = (studentId) => {
    return new Promise((resolve, reject) => {
        studentCrudOperations.deleteStudent(studentId).then(()=> {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};


// Course CRUD operations
const createCourse = (courseId, courseName) => {
    return new Promise((resolve, reject) => {
        courseCrudOperations.createCourse(courseId, courseName).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

const readCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        courseCrudOperations.readCourse(courseId).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

const readAllCourses = () => {
    return new Promise((resolve, reject) => {
        courseCrudOperations.readAllCourses().then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

const updateCourse = (courseId, newCourseName) => {
    return new Promise((resolve, reject) => {
        courseCrudOperations.updateCourse(courseId, newCourseName).then(()=> {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};

const deleteCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        courseCrudOperations.deleteCourse(courseId).then(()=> {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};



// General methods
const assignStudentToCourse = ((studentId, courseId) => {
    return new Promise((resolve, reject) => {
        dbOperations.assignStudentToCourse(studentId, courseId).then(()=> {
            resolve();
        }).catch((err) => {
            reject(err);
        });
    });
});

const setScore = (studentId, courseId, newGrade) => {
    return new Promise((resolve, reject) => {
        dbOperations.setScore(studentId, courseId, newGrade).then(()=> {
            resolve();
        }).catch((err) => {
            reject(err);
        });
    });
};

const getOutstandingStudents = () => {
    return new Promise((resolve, reject) => {
        dbOperations.getOutstandingStudents().then((result)=> {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

const closeConnection = () => {
    dbOperations.closeConnection();
};

module.exports = {dbInit, createStudent, readStudent, readAllStudents, updateStudent, deleteStudent, createCourse, readCourse, readAllCourses, updateCourse, deleteCourse, assignStudentToCourse, setScore, getOutstandingStudents, closeConnection};