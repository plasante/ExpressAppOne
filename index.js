var express = require('express');
var bodyParser = require('body-parser');

app = express();
app.use(bodyParser.json());

app.get("/one", function (req, res) {
  res.end("This is simple end string response");
})

app.post("/two", function (req, res) {
  res.send("This is post simple string response");
})

// Response Status Code
app.get("/three", function (req, res) {
  res.status(401).end("You dont have permission to use this route");
})

// Json Response
app.get("/four", function (req, res) {
  let MyJsonArray = [
    {
      name: 'Pierre',
      city: 'Mascouche',
    },
    {
      name: 'Alice',
      city: 'Martin',
    }
  ]

  res.json(MyJsonArray);
})

// Response Download
app.get("/five", function (req, res) {
  res.download("./images/about.jpg");
})

// Redirect Response
app.get("/usa", function (req, res) {
  res.redirect('http://localhost:8000/canada')
})
app.get("/canada", function (req, res) {
  res.send("This is canada");
})

// Response Header
app.get("/six", function (req, res) {
  res.append("name","PierreLasante")
  res.append("city","Mascouche")
  res.status(201).end("This is response Header");
})

// Response Set Cookie
app.get("/seven", function (req, res) {
  res.cookie("name","PierreLasante")
  res.cookie("city","Mascouche")
  res.cookie("age","68 years old")

  res.status(201).end("This is Response Cookie");
})

// Response Clear Cookie
app.get("/eight", function (req, res) {
  res.clearCookie("name")
  res.clearCookie("city")
  res.clearCookie("age")

  res.status(201).end("This is Response Clear Cookie");
})

// Get Query Data
// app.get("/", function (req, res) {
//   let firstName = req.query.firstName;
//   let lastName = req.query.lastName;
//
//   res.end(firstName + " " + lastName);
// })

// Get Query From Header
// app.get("/", function (req, res) {
//   let firstName = req.header('firstName');
//   let lastName = req.header('lastName');
//
//   res.end(firstName + " " + lastName);
// })

// Post Data in URL
// app.post("/", function (req, res) {
//   let firstName = req.query.firstName;
//   let lastName = req.query.lastName;
//
//   res.send(firstName + " " + lastName);
// })

// Post Data in Header
// app.post("/", function (req, res) {
//   let username = req.header('username');
//   let password = req.header('password');
//
//   res.send("User Name: " + username + " Password: " + password);
// })

// Post Data in Body as JSON
app.post("/", function (req, res) {
  let JSONData = req.body;
  let JSONString = JSON.stringify(JSONData);
  res.send(JSONString);
})

app.listen(8000, function () {
  console.log('Express app listening on 8000');
})