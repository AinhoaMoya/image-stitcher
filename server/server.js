const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mergeImg = require('merge-img');
const cloudinary = require('cloudinary');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());

app.use(fileUpload());

app.post('/upload', (req, res) => {

    let keys = Object.keys(req.files);
    let images = [];

    keys.map((key) => {
        let imgObj = req.files[key].data;
        images.push(imgObj);
    });

    mergeImg(images)
    .then((img) => {
        img.write('result.jpg', () => console.log('Image has been successfully merged'));

        cloudinary.v2.uploader.unsigned_upload(
            "result.jpg",
            "nwaybmkn",
            { cloud_name: "dqrlyqzr2" },
            function(error, result) {
                if (error) {
                    console.log(error)
                } else {
                    res.json({imgUrl: result.url})
                }
            }
        );

    })
    .catch((err) => {
        console.log(err);
    })
});

app.listen(3001);

console.log('Image Stitcher server listening on port 3001');
