const dbOperations = require("./dbOperations");
const coursesCollection = dbOperations.coursesCollectionName;

// Create course
const createCourse = (courseId, courseName) => {
    return new Promise((resolve, reject) => {
        dbOperations.createDocument(coursesCollection, {_id: courseId, name: courseName, students: []}).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

// Read course 
const readCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        dbOperations.readDocument(coursesCollection, courseId).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

const readAllCourses = () => {
    return new Promise((resolve, reject) => {
        dbOperations.readAllDocuments(coursesCollection).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

// Update course
const updateCourse = (courseId, newCourseName) => {
    return new Promise((resolve, reject) => {
        dbOperations.updateDocument(coursesCollection, courseId, newCourseName).then(()=> {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};

// Delete course
const deleteCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        dbOperations.deleteDocument(coursesCollection, courseId).then(()=> {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};

module.exports = {createCourse, readCourse, readAllCourses, updateCourse, deleteCourse};