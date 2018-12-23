let app = require("./app");
const dbManager = require("./dbManager");
const config = require("./private/config.js");
const port = config.port;

dbManager.dbInit();

// Starts server
let serverInstance = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Shuts server down and closes DB connection when app exits
process.on("SIGINT", function () {
    serverInstance.close();
    dbManager.closeConnection();
});