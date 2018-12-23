const _ = require("underscore");
const MongoClient = require("mongodb").MongoClient;
const config = require("./private/config.js");
const mongoUrl = config.mongoUrl;
const dbName = config.dbName;
const studentsCollectionName = config.studentsCollectionName;
const coursesCollectionName = config.coursesCollectionName;
let courseCollectionInstance;
let dbUniversity;
let clientForDB;

// Setting up a MongoDB connection
const init = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        }, (err, client) => {
            if (err) {
                console.log("failed to connect to MongoDB");
                reject(err);
            } else {
                clientForDB = client;
                dbUniversity = clientForDB.db(dbName);
                courseCollectionInstance = dbUniversity.collection(coursesCollectionName);
                console.log("Connected successfully to MongoDB");
                resolve();
            }
        });
    });

};

// CRUD operations
const createDocument = (collectionName, JsonToInsert) => {
    return new Promise((resolve, reject) => {
        const collection = dbUniversity.collection(collectionName);
        collection.insertOne(
            JsonToInsert, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JsonToInsert);
                }
            });
    });
};

const readDocument = (collectionName, documentId) => {
    return new Promise((resolve, reject) => {
        const collection = dbUniversity.collection(collectionName);
        collection.find({
            _id: documentId
        }).
        toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const readAllDocuments = (collectionName) => {
    return new Promise((resolve, reject) => {
        const collection = dbUniversity.collection(collectionName);
        collection.find().
        toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const updateDocument = (collectionName, documentId, newName) => {
    return new Promise((resolve, reject) => {
        const collection = dbUniversity.collection(collectionName);
        collection.updateOne({
            _id: documentId
        }, {
            $set: {
                name: newName
            }
        }, {
            upsert: false
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const deleteDocument = (collectionName, documentId) => {
    return new Promise((resolve, reject) => {
        const collection = dbUniversity.collection(collectionName);
        collection.deleteOne({
            _id: documentId
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};


// Other methods
const assignStudentToCourse = (studentId, courseId) => {
    return new Promise((resolve, reject) => {
        readDocument(coursesCollectionName, courseId).then(async (courses) => {
            if (courses.length == 0) {
                // Course doesn't exist
                reject();
                return;
            }

            // Checks whether student exists
            let student = await readDocument(studentsCollectionName, studentId);
            if (student.length == 0) {
                // Student doesn't exist
                reject();
                return;
            }

            // check whether the student aleardy assigned to the course
            let instancesOfStudentId = courses[0].students.filter(x => x.id == studentId);
            if (instancesOfStudentId.length > 0) {
                // Student already exist
                resolve();
                return;
            }

            let studentsArr = courses[0].students;
            studentsArr.push({
                id: studentId,
                grade: -1
            });

            courseCollectionInstance.updateOne({
                _id: courseId
            }, {
                $set: {
                    name: courses[0].name,
                    students: studentsArr
                }
            }, {
                upsert: true
            }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
};

const setScore = (studentId, courseId, newGrade) => {
    return new Promise((resolve, reject) => {
        readDocument(coursesCollectionName, courseId).then((courses) => {
            if (courses.length == 0) {
                // Course doesn't exist
                reject();
                return;
            }

            let studentsArr = courses[0].students;
            let foundIndex = studentsArr.findIndex(student => student.id == studentId);
            if (foundIndex == -1) {
                //The student isn't assigned to the course
                reject();
                return;
            } else {
                studentsArr[foundIndex] = {
                    id: studentId,
                    grade: newGrade
                };
                courseCollectionInstance.updateOne({
                    _id: courseId
                }, {
                    $set: {
                        name: courses[0].name,
                        students: studentsArr
                    }
                }, {
                    upsert: true
                }, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
};

const getOutstandingStudents = () => {
    return new Promise((resolve, reject) => {
        courseCollectionInstance.find().
        toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                let arrayOfAllGrades = [];
                let arrayOfOutstandingStudents = [];

                // Gets all the grades into one array
                result.forEach((course) => {
                    course.students.forEach((student) => {
                        arrayOfAllGrades.push(student);
                    });
                });

                // Filters students who don't have a grade (the default grade when assigning for a couse is -1)
                arrayOfAllGrades = arrayOfAllGrades.filter(student => student.grade > 0);

                // Filtes duplicate students
                const idsOfAssignedStudents = _.uniq(arrayOfAllGrades.map(student => student.id));

                // Calculates average grade for each student
                idsOfAssignedStudents.forEach((studentId) => {
                    let sumOfGrades = 0;
                    let countOfGrades = 0;

                    arrayOfAllGrades.forEach((grade) => {
                        if (grade.id == studentId) {
                            countOfGrades++;
                            sumOfGrades += grade.grade;
                        }
                    });

                    if (sumOfGrades / countOfGrades > 90) {
                        arrayOfOutstandingStudents.push({
                            id: studentId,
                            average: sumOfGrades / countOfGrades
                        });
                    }
                });
                resolve(arrayOfOutstandingStudents);
            }
        });
    });
};

const closeConnection = () => {
    clientForDB.close();
    console.log("MongoDB connection closed");
};

module.exports = {
    init,
    createDocument,
    readDocument,
    readAllDocuments,
    updateDocument,
    deleteDocument,
    studentsCollectionName,
    coursesCollectionName,
    assignStudentToCourse,
    setScore,
    getOutstandingStudents,
    closeConnection
};