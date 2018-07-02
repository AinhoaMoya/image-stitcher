function getPreviewImages(images, props) {

  return new Promise((resolve) => {

    let previewImages = [];

    for (var i = 0; i < images.length; i++) {
      let image = images[i];

      const reader = new FileReader();

      reader.onload = (function (currentImg) {
          return function (e) {
            let previewImage = {
              imgName: image.name,
              imgURI: e.target.result,
              imgObject: image
            }
            previewImages.push(previewImage);
          };
      })(image);

      // Read in the image file as a data URL.
      reader.readAsDataURL(image);
    }
    resolve(previewImages);

  })

}

export default getPreviewImages;
