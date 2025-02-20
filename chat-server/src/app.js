const express = require("express");
const {expressx} = require('ca-webutils');

const app = express();
app.use(express.static("public")); // Serve frontend files
console.log('process.cwd()',process.cwd());


app.use(expressx.spa());

module.exports = app;
