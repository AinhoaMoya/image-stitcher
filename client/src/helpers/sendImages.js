import axios from 'axios';


async function sendImages(images) {
  return new Promise((resolve, reject) => {
    let formData = new FormData();

    for (var i = 0; i < images.length; i++) {
      let image = images[i].imgObject;
      formData.append(`browsedImage${i}`, image)
    }

    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log('Successfully uploaded image to server!');
      resolve(response.data.imgUrl);
    })
    .catch((error) => {
      reject(error);
    })
  })
}

export default sendImages;
