var express = require("express");
var app = express();
var port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server listening on port");
});

app.use("/instructor/register", (req, res) => {
  res.sendfile(__dirname + "/public/registerInstructor.html");
});

app.use("/instructor/Login", (req, res) => {
  res.sendfile(__dirname + "/public/loginpage/instructorLogin.html");
});

app.use("/instructor/dashboard", (req, res) => {
  res.sendfile(__dirname + "/public/dashboard/instructorDashboard.html");
});
