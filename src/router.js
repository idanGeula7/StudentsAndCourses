"use strict";
const express = require("express");
const router = express.Router();
const config = require("./private/config.js");
const ApiVersion = config.ApiVersion;
const studentsResource = config.studentsCollectionName;
const coursesResource = config.coursesCollectionName;
const dbManager = require("./dbManager");

// General methods
// Assign student to a course
router.post(`/${ApiVersion}/general/assignStudentToCourse`, async function (req, res) {

    let studentId = Number(req.query.studentId);
    let courseId = Number(req.query.courseId);

    try {
        await dbManager.assignStudentToCourse(studentId, courseId);
        res.status(200).end();
    } catch (error) {
        // Course doesn't exist
        res.status(404).end();
    }
});

// Set score in a course for a student
router.put(`/${ApiVersion}/general/setScore`, async function (req, res) {

    let studentId = Number(req.query.studentId);
    let courseId = Number(req.query.courseId);
    let newGrade = Number(req.query.newGrade);

    try {
        await dbManager.setScore(studentId, courseId, newGrade);
        res.status(200).end();
    } catch (error) {
        // Course doesn't exist or student doesn't assign to the course
        res.status(404).end();
    }
});

// Get a list of outstanding students (average > 90)
router.get(`/${ApiVersion}/general/getOutstandingStudents`, async function (req, res) {

    try {
        let data = await dbManager.getOutstandingStudents();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).end();
    }
});


// CRUD methods
// Read
router.get(`/${ApiVersion}/:resource/:resourceId`, async function (req, res) {
    let resource = req.params.resource;
    let resourceId = Number(req.params.resourceId);
    let data;

    if ((resource != studentsResource) && (resource != coursesResource)) {
        // Bad request
        res.status(400).end();
        return;
    }

    try {
        if (resource == studentsResource) {
            data = await dbManager.readStudent(resourceId);
        } else {
            data = await dbManager.readCourse(resourceId);
        }

        if (data.length == 0) {
            // Resource doesn't exist
            res.status(404).end();
        } else {
            res.json(data[0]);
        }
    } catch (error) {
        res.status(500).end();
    }
});

// Read all
router.get(`/${ApiVersion}/:resource`, async function (req, res) {
    let resource = req.params.resource;
    let data;

    if ((resource != studentsResource) && (resource != coursesResource)) {
        // Bad request
        res.status(400).end();
        return;
    }

    try {
        if (resource == studentsResource) {
            data = await dbManager.readAllStudents();
        } else {
            data = await dbManager.readAllCourses();
        }

        if (data.length == 0) {
            // No resources exists
            res.status(404).end();
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).end();
    }
});

// Create
router.post(`/${ApiVersion}/:resource`, async function (req, res) {
    let resource = req.params.resource;
    let resourceId = Number(req.query.resourceId);
    let resourceName = req.query.resourceName;
    let createdResource;

    if ((resource != studentsResource) && (resource != coursesResource)) {
        // Bad request
        res.status(400).end();
        return;
    }

    try {
        if (resource == studentsResource) {
            createdResource = await dbManager.createStudent(resourceId, resourceName);
        } else {
            createdResource = await dbManager.createCourse(resourceId, resourceName);
        }

        res.status(201).json(createdResource);
    } catch (error) {
        // Duplicated key
        res.status(409).json("Duplicated id. Try another one");
    }
});

// Update (if resourceId exists)
router.put(`/${ApiVersion}/:resource/:resourceId`, async function (req, res) {
    let resource = req.params.resource;
    let resourceId = Number(req.params.resourceId);
    let newResourceName = req.query.newResourceName;

    if ((resource != studentsResource) && (resource != coursesResource)) {
        // Bad request
        res.status(400).end();
        return;
    }

    try {
        if (resource == studentsResource) {
            await dbManager.updateStudent(resourceId, newResourceName);
        } else {
            await dbManager.updateCourse(resourceId, newResourceName);
        }

        res.status(200).end();
    } catch (error) {
        res.status(500).end();
    }
});

// Delete
router.delete(`/${ApiVersion}/:resource`, async function (req, res) {
    let resource = req.params.resource;
    let resourceId = Number(req.query.resourceId);

    if ((resource != studentsResource) && (resource != coursesResource)) {
        // Bad request
        res.status(400).end();
        return;
    }

    try {
        if (resource == studentsResource) {
            await dbManager.deleteStudent(resourceId);
        } else {
            await dbManager.deleteCourse(resourceId);
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).end();
    }
});

module.exports = router;