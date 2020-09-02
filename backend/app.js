var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database = require("./database");
const cors = require('cors');
var verifyToken = require("./Auth/verifyToken");
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* app.get('/', (req, res, next) => {
  res.json({hello: "World"});
}); */



app.post('/insert/user', (req, res) => {
  //adding single user so dont need to put body into a object
  //const {data} = req.body
  //console.log(data);
  /*output:
  {
  username: 'mallvin',
  password: '123',
  age: 24,
  weightClass: 'Under 74kg'
}
*/
  /* 
  for rest client testing with json type
  const {data} = req.body
  var username = data.username;
  var password = data.password;
  var age = data.age;
  var weightClass = data.weightClass; */
  var username = req.body.username;
  var password = req.body.password;
  var age = req.body.age;
  var weightClass = req.body.weightClass;

  database.checkForDuplicateUsername(username, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err });
    } else if (result > 0) {
      res.status(400).json({
        "error": "Duplicate Entry, Username exists",
        "code": "400"
      })
    } else {
      database.addUser(username, password, age, weightClass, (err, result) => {
        if (err) {
          res.status(500).send({ "Error": err.detail });

        } else {
          res.json({ result: "Successfully Created New User" });
        }
      });
    }
  });
});


app.post('/login', (req, res) => {
  //console.log("login received");
  var username = req.body.username;
  var password = req.body.password;
  console.log(username, password);

  database.login(username, password, (error, result) => {
    if (error) {
      res.status(500).send({ "Error": error.detail });

    } else {
      res.json(result);
    }
    //console.log(result);

  });
});





app.post('/insert/squat-log', verifyToken, (req, res) => {
  //console.log("Squat has received");
  var weight = req.body.weight;
  var year = req.body.year;
  var month = req.body.month;
  var userid = req.body.userid;

  database.addSquatLog(weight, year, month, userid, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });

    } else {
      res.json({ result: "Successfully added new squat log" });
    }
  });
});

//for inserting multiple bench logs
/* app.post('/insert/bench-log', (req,res) => {
  const {data} = req.body;

  database.addBenchLog(data, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
      
    } else {
      res.json({result:"Successfully added new bench log"});
    }
  });


}); */



app.post('/insert/bench-log', verifyToken, (req, res) => {
  //console.log("Bench received");
  var weight = req.body.weight;
  var year = req.body.year;
  var month = req.body.month;
  var userid = req.body.userid;

  database.addBenchLog(weight, year, month, userid, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });

    } else {
      res.json({ result: "Successfully added new bench log" });
    }
  });
});




app.post('/insert/deadlift-log', verifyToken, (req, res) => {
  var weight = req.body.weight;
  var year = req.body.year;
  var month = req.body.month;
  var userid = req.body.userid;

  database.addDeadliftLog(weight, year, month, userid, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });

    } else {
      res.json({ result: "Successfully added new deadlift log" });
    }
  });
});





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err.message,
    code: err.status || 500
  });
});

module.exports = app;
