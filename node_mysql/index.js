const express = require('express');
const mysql = require('mysql');

 // create connection
const db = mysql.createConnection({
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  host: 'localhost',
  user: 'muhyideenelias',
  password: '8800deen536@',
  database: 'node_mysql'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Mysql connected');
})

const app = express();

// create database
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE node_mysql';
  db.query(sql, err => {
    if (err) {
      throw err;
    }
    res.send('Database Created');
  });
});

app.get('/createemployee', (req, res) => {
  let sql = 'CREATE TABLE employee(id INT AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(ID))';
  db.query(sql, err => {
    if (err) {
      throw err
    }
    res.send('Employee table created')
  })
})

app.get('/employee1', (req, res) => {
  let post = { name: 'Jake Smith', designation: 'Chief Executive Officer' }
  let sql = 'INSERT INTO employee SET ?'
  let query = db.query(sql, post, err => {
    if (err) {
      throw err;
    }
    res.send('Employee added');
  });
});

app.get('/getemployee', (req, res) => {
  let sql = 'SELECT * FROM employee';
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send('Employee details fetched');
  });
});

app.get('/updateemployee/:id', (req, res) => {
  let newName = 'Muhyideen Elias';
  let sql = `UPDATE employee SET name = '${newName}' where id = ${req.params.id}`
  let query = db.query(sql, err => {
    if (err) {
      throw err;
    }
    res.send('Employee updated');
  });
});

app.get('/deleteemployee/:id', (req, res) => {
  let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
  let query = db.query(sql, err => {
    if (err) {
      throw err;
    }
    res.send('Employee deleted!')
  });
});

app.listen(3000, () => {
  console.log('App started on port 3000!')
});