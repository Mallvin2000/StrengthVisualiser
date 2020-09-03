const { Client } = require('pg');
const connectionString = "postgres://utaaqrdi:Gk1V4NlYgHcNlP4RIa0Qqty-YU558CQY@john.db.elephantsql.com:5432/utaaqrdi";
var jwt = require("jsonwebtoken");

function connect() {
    const client = new Client({
        connectionString: connectionString,
    })
    client.connect()

    return client;
}


function resetTable() {
    const client = connect();//create connection to database
    const dropTables = `
    DROP TABLE IF EXISTS squat;
    DROP TABLE IF EXISTS bench;
    DROP TABLE IF EXISTS deadlift;
    DROP TABLE IF EXISTS users;
    `;


    const query1 = `
        CREATE TABLE users (
            userId SERIAL PRIMARY KEY,
            username varchar(50) UNIQUE NOT NULL,
            password varchar(50) NOT NULL,
            age INT NOT NULL,
            weightClass varchar(50) NOT NULL
        );
    `;


    const query2 = `
        CREATE TABLE squat (
            squatId SERIAL PRIMARY KEY,
            weight INT NOT NULL,
            year varchar(4) NOT NULL,
            month varchar(2) NOT NULL,
            timestamp timestamptz default current_timestamp,
            userId INT REFERENCES users (userId)
        );
    `;//delete timestamp column if error when recreating

    const query3 = `
        CREATE TABLE bench (
            benchId SERIAL PRIMARY KEY,
            weight INT NOT NULL,
            year varchar(4) NOT NULL,
            month varchar(2) NOT NULL,
            userId INT REFERENCES users (userId)
        );
    `;


    const query4 = `
        CREATE TABLE deadlift (
            deadliftId SERIAL PRIMARY KEY,
            weight INT NOT NULL,
            year varchar(4) NOT NULL,
            month varchar(2) NOT NULL,
            userId INT REFERENCES users (userId)
        );
    `;

    const query = `${dropTables} ${query1} ${query2} ${query3} ${query4}`;


    client.query(query, (err, res) => {
        console.log(err, res)
        client.end()
    })

}




function addUser(username, password, age, weightClass, callback) {
    let i = 1;
    const template = `($${i++}, $${i++}, $${i++}, $${i++})`
    const values = [username, password, age, weightClass]
    const query = `INSERT INTO users (username, password, age, weightClass) VALUES ${template}`;
    console.log(values, query);

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
}


function addSquatLog(weight, year, month, userId, callback) {
    let i = 1;
    const template = `($${i++}, $${i++}, $${i++}, $${i++})`
    const values = [weight, year, month, userId]
    const query = `INSERT INTO squat (weight, year, month, userId) VALUES ${template}`;
    console.log(values, query);

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
}


function addBenchLog(weight, year, month, userId, callback) {
    let i = 1;
    const template = `($${i++}, $${i++}, $${i++}, $${i++})`
    const values = [weight, year, month, userId]
    const query = `INSERT INTO bench (weight, year, month, userId) VALUES ${template}`;
    console.log(values, query);

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
}

//this function can handle multiple inserts but probably wont need it as we are only going to be taking 1 at a time from frontend
/* function addBenchLog(datas, callback) {
    let i = 1;
    const template = datas.map(data => `($${i++}, $${i++}, $${i++}, $${i++})`).join(',');//search up postgresql insert multiple rows documentation
    const values = datas.reduce((reduced, data) => [...reduced, data.weight, data.year, data.month, data.userId], []);//reduce/compress to 1 value array
    const query = `INSERT INTO bench (weight, year, month, userId) VALUES ${template}`;
    console.log(values, query);

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
} */




function addDeadliftLog(weight, year, month, userId, callback) {
    let i = 1;
    const template = `($${i++}, $${i++}, $${i++}, $${i++})`
    const values = [weight, year, month, userId]
    const query = `INSERT INTO deadlift (weight, year, month, userId) VALUES ${template}`;
    console.log(values, query);

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
}



function login(username, password, callback) {
    //console.log("In here man");
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`
    //console.log(query);

    const client = connect();
    client.query(query, [], (err, {rows}) => {
        console.log(rows);
        if (rows.length == 1) {//username and password combination exists
            var token = "";
            //console.log(rows[0].userid);
            token = jwt.sign({ "userid": rows[0].userid }, "123", { expiresIn: "1hr" })//payload is an encrypted message hidden in the token(in this case the username), a secret key to encrypt and decrypt this token, options
            console.log(token);
            callback(null, { "token": token });
        } else {
            callback({ "auth": false, "message": "username/password not found" }, null);
        }
        //callback(err, rows)
        client.end();
    });
}


function checkForDuplicateUsername(username, callback) {
        
        const query = `SELECT * FROM users WHERE username = $1`;
        const client = connect();
        client.query(query, [username], (err, { rows }) => {
            //console.log(rows.length);
            /*if (rows.length > 0) {
               // count++;
                //console.log("Duplicates: "+count);
            }*/
            callback(err, rows.length);
            client.end();
        });
}



function getUserData(userid, callback) {
    const query = `SELECT * FROM users WHERE userId = $1;`
    const client = connect();
    client.query(query, [userid], (err, { rows }) => {
        callback(err, rows);
        client.end();
    });
}



function updateUserProfile(username, password, userid, callback) {
    const query = `UPDATE users SET username = $1, password = $2 WHERE userId = $3;`
    const client = connect();
    client.query(query, [username, password, userid], (err, { rows }) => {
        callback(err, rows);
        client.end();
    });
    
}



module.exports = {
    resetTable,
    addUser,
    addSquatLog,
    addBenchLog,
    addDeadliftLog,
    login,
    checkForDuplicateUsername,
    getUserData,
    updateUserProfile,
};