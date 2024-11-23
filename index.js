var express = require('express');
var bodyParser = require('body-parser');
const res = require("express/lib/response");
const multer = require('multer');

// Define storage for the multer middleware
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads'); // Destination folder
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()); // Filename along with the current date
  }
});

var upload = multer({ storage: storage }).single('myfile');

var app = express();
app.use(bodyParser.json());
//app.use(multer.array());
app.use(express.static('public'));

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
// app.post("/", function (req, res) {
//   let JSONData = req.body;
//   let JSONString = JSON.stringify(JSONData);
//   res.send(JSONString);
// })

// MultiForm Data
// app.post("/", function (req, res) {
//
//   let JSONData = req.body;
//   console.log(JSONData);
//   res.send(JSON.stringify(JSONData));
// })

// Uploading a file
// app.post("/", function (req, res) {
//   upload(req, res, function (error){
//     if (error) {
//       res.status(500).send("An error occurred while uploading the file.");
//       return;
//     }
//     res.status(200).send("File uploaded successfully.");
//   })
// })

// Middleware function to intercept any request and send response to next
// app.use(function (req, res, next) {
//   console.log('I am from middleware validation');
//   next();
// })

//  Home page
app.get('/', function (req, res) {
  res.send('This is home page')
})

//  About page
app.get('/about', function (req, res,next) {
  console.log('I am from About validation');
  next();
})

app.get('/about', function (req, res) {
  console.log('Sending response from About route');
  res.send('This is about page');
})

//  Contact page
app.get('/contact', function (req, res) {
  res.send('This is Contact page')
})

app.listen(8000, function () {
  console.log('Express app listening on 8000');
})