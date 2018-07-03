const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mergeImg = require('merge-img');
const imageDataURI = require('image-data-uri');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());

app.use(fileUpload());

app.post('/upload', (req, res) => {

    let keys = Object.keys(req.files);
    // This array will hold the images to be merged
    let images = [];

    keys.map((key) => {
        let imgObj = req.files[key].data;
        images.push(imgObj);
    });

    //  Merge images, then write result on disk...
    //  then encode image from file and send image uri back to client.
    mergeImg(images)
    .then((img) => {
        //TODO Probably image does not need to be written on disk at all, find alternative
        img.write('result.jpg', () => console.log('Image has been successfully merged'));
        imageDataURI.encodeFromFile('./result.jpg')
          .then((uri) => {
            res.json({imgUrl: uri})
          })
          .catch((err) => {
            console.log(err);
          })
    })
    .catch((err) => {
        console.log(err);
    })
});

app.listen(3001);

console.log('Image Stitcher server listening on port 3001');
