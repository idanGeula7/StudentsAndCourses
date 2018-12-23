REST API - Node.js

Author: Idan Geula.
ID: 308559699.
Linter used: ESLint.

Instructions:
1) Open cmd in this folder (BloxProject26102018)
2) npm install.
3) npm start.
4) App is running. you can start querying using a tool like Postman (https://www.getpostman.com/).

queries for example:
POST http://localhost:3000/v1/courses?resourceId=5&resourceName=science
POST http://localhost:3000/v1/general/assignStudentToCourse?studentId=2&courseId=991
PUT http://localhost:3000/v1/general/setScore?studentId=1&courseId=991&newGrade=90
GET http://localhost:3000/v1/general/getOutstandingStudents

The collections are already filled with 2 courses and 3 students.
For all API available, please refer to file API.txt in this folder.

