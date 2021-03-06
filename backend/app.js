var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database = require("./database");
const cors = require('cors');
var verifyToken = require("./Auth/verifyToken");
const { start } = require('repl');
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
  //console.log(username, password);

  database.login(username, password, (error, result) => {
    if (error) {
      res.status(500).send({ "Error": error.detail });

    } else {
      //console.log(result);
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


app.get('/get/user/data', verifyToken, (req, res) => {
  //console.log("received");
  var userid = req.body.userid;//userid from verify token that is stored in request body

  database.getUserData(userid, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  });
});



app.put("/update/user", verifyToken, (req, res) => {//qn4
  var userid = req.body.userid;
  var username = req.body.username;
  var password = req.body.password;
  //console.log(userid);
  //console.log(username);
  //console.log("Password: " + password);

  database.updateUserProfile(username, password, userid, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json({ result: "Updated successfully" });
    }
  });

});



app.get('/get/squat', verifyToken, (req, res) => {
  //console.log("received");
  var userid = req.body.userid;//userid from verify token that is stored in request body
  const { startYear, endYear } = req.query;//extract from GET query URL
  //console.log(startYear, endYear);
  database.getUserSquatData(userid, startYear, endYear, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  });
});


app.get('/get/bench', verifyToken, (req, res) => {
  //console.log("received");
  var userid = req.body.userid;//userid from verify token that is stored in request body
  const { startYear, endYear } = req.query;

  database.getUserBenchData(userid, startYear, endYear, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  });
});


app.get('/get/deadlift', verifyToken, (req, res) => {
  //console.log("received");
  var userid = req.body.userid;//userid from verify token that is stored in request body
  const { startYear, endYear } = req.query;
  database.getUserDeadliftData(userid, startYear, endYear, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  });
});


app.get('/get/all/squat', verifyToken, (req, res) => {
  var userid = req.body.userid;
  const { year, month, limit, offset } = req.query;
  //console.log(limit, offset);

  database.getAllSquat(userid, year, month, limit, offset, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  });
});


app.get('/get/all/bench', verifyToken, (req, res) => {
  var userid = req.body.userid;
  const { year, month, limit, offset } = req.query;

  database.getAllBench(userid, year, month, limit, offset, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  });
});


app.get('/get/all/deadlift', verifyToken, (req, res) => {
  var userid = req.body.userid;
  const { year, month, limit, offset } = req.query;

  database.getAllDeadlift(userid, year, month, limit, offset, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  });
});



app.get('/get/all/squat/:id', verifyToken, (req, res) => {
  //console.log("enter");
  var squatid = req.params.id;
  var userid = req.body.userid;
  //console.log(squatid);
  //console.log(limit, offset);

  database.getSpecificSquat(userid, squatid, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  });
});



app.get('/get/all/bench/:id', verifyToken, (req, res) => {
  //console.log("enter");
  var benchid = req.params.id;
  var userid = req.body.userid;
  //console.log(squatid);
  //console.log(limit, offset);

  database.getSpecificBench(userid, benchid, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  });
});



app.get('/get/all/deadlift/:id', verifyToken, (req, res) => {
  //console.log("enter");
  var deadliftid = req.params.id;
  var userid = req.body.userid;
  //console.log(squatid);
  //console.log(limit, offset);

  database.getSpecificDeadlift(userid, deadliftid, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  });
});


app.put('/squat/update', verifyToken, (req,res) => {
  //console.log("ENTER UPDATE SQUAT");
  var userid = req.body.userid;
  var liftid = req.body.liftid;
  var weight = req.body.weight;
  var year = req.body.year;
  var month = req.body.month;
  console.log(liftid,weight,year,month);

  database.updateSquatRecord(userid, liftid, weight, year, month, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json({result: "Successfully updated"});
    }
  });
});


app.put('/bench/update', verifyToken, (req,res) => {
  var userid = req.body.userid;
  var liftid = req.body.liftid;
  var weight = req.body.weight;
  var year = req.body.year;
  var month = req.body.month;
  console.log(liftid,weight,year,month);

  database.updateBenchRecord(userid, liftid, weight, year, month, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json({result: "Successfully updated"});
    }
  });
});



app.put('/deadlift/update', verifyToken, (req,res) => {
  var userid = req.body.userid;
  var liftid = req.body.liftid;
  var weight = req.body.weight;
  var year = req.body.year;
  var month = req.body.month;
  console.log(liftid,weight,year,month);
  database.updateDeadliftRecord(userid, liftid, weight, year, month, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json({result: "Successfully updated"});
    }
  });
});



app.delete('/squat/delete/:id', verifyToken, (req, res) => {
  var userid = req.body.userid;
  var squatid = req.params.id;

  database.deleteSquatRecord(userid, squatid, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json({result: "Successfully deleted"});
    }
  });

});


app.delete('/bench/delete/:id', verifyToken, (req, res) => {
  var userid = req.body.userid;
  var benchid = req.params.id;

  database.deleteBenchRecord(userid, benchid, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json({result: "Successfully deleted"});
    }
  });

});



app.delete('/deadlift/delete/:id', verifyToken, (req, res) => {
  var userid = req.body.userid;
  var deadliftid = req.params.id;

  database.deleteDeadliftRecord(userid, deadliftid, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json({result: "Successfully deleted"});
    }
  });

});


app.post('/insert/feedback', (req, res) => {
  //console.log("Squat has received");
  var name = req.body.name;
  var email = req.body.email;
  var feedback = req.body.feedback;

  database.insertFeedback(name, email, feedback, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });

    } else {
      res.json({ result: "Successfully added feedback" });
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
