const express = require('express');
const app = express();
const port = 3000;

app.get('/eyecontact/', (req, res) => {
    res.send('Hello, I am the eye contact server');
});

app.listen(port, () => console.log('Eye conctact server listening at /eyecontact/ on port ${port}!'));
