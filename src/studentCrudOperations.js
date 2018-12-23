const dbOperations = require("./dbOperations");
const studentsCollection = dbOperations.studentsCollectionName;

// Create student
const createStudent = (studentId, studentName) => {
    return new Promise((resolve, reject) => {
        dbOperations.createDocument(studentsCollection, {_id: studentId, name: studentName}).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

// Read student 
const readStudent = (studentId) => {
    return new Promise((resolve, reject) => {
        dbOperations.readDocument(studentsCollection, studentId).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

const readAllStudents = () => {
    return new Promise((resolve, reject) => {
        dbOperations.readAllDocuments(studentsCollection).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};


// Update student
const updateStudent = (studentId, newStudentName) => {
    return new Promise((resolve, reject) => {
        dbOperations.updateDocument(studentsCollection, studentId, newStudentName).then(()=> {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};

// Delete student
const deleteStudent = (studentId) => {
    return new Promise((resolve, reject) => {
        dbOperations.deleteDocument(studentsCollection, studentId).then(()=> {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};

module.exports = {createStudent, readStudent, readAllStudents, updateStudent, deleteStudent};