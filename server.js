const express = require('express');
const app = express();
const port = 3000;  

app.get('/', (req, res) => {
    res.send('Testing server response');
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Press Ctrl+C to stop the server`);
    console.log(`You can test the server by visiting http://localhost:${port} in your browser`);    
});