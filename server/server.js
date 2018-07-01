const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))
    
app.use(cors());

app.use(fileUpload());

app.post('/upload', (req, res) => {
    console.log(req.body); 
    res.json({test: 'test'});
});

app.listen(3001);

console.log('Image Stitcher server listening on port 3001');