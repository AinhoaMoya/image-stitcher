function getPreviewImages(images) {

  let previewImages = [];

  for (var i = 0; i < images.length; i++) {
    let image = images[i];

    const reader = new FileReader();

    reader.onload = (function (currentImg) {
        return function (e) {
          let previewImage = {
            imgName: image.name,
            imgURI: e.target.result
          }
          previewImages.push(previewImage);
        };
    })(image);

    // Read in the image file as a data URL.
    reader.readAsDataURL(image);

  }

  return previewImages;
}

export default getPreviewImages;
