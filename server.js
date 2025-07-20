const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = 3000;  

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

app.get('/', (req, res) => {
    res.send('Testing server response');
})


app.get('/users', (req, res) => {
    pool.query('SELECT * FROM USER_DATA', (error, results) => {
        if (error) {
            console.error('Error querying DB:', error);
            return res.status(500).send('Database error');
        }
        res.json(results);
    });     
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Press Ctrl+C to stop the server`);
    console.log(`You can test the server by visiting http://localhost:${port} in your browser`);    
});