const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json());
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

app.post('/users', (req, res) => {
    const { first_name, last_name, email, job } = req.body;
    if (!first_name || !last_name || !email || !job) {
        return res.status(400).json({error: 'All fields (first_name, last_name, email, job) are required '});
    }
    const query = 'INSERT INTO USER_DATA (first_name, last_name, email, job) VALUES (?,?,?,?)';
    const values = [first_name, last_name, email, job];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Error inserting user:', error);
            return res.status(500).json({error: 'Database error'});
        }
        res.status(201).json({message: 'User created successfully', userId: results.insertId });
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Press Ctrl+C to stop the server`);
    console.log(`You can test the server by visiting http://localhost:${port} in your browser`);    
});