function getImgFormData(images) {
  let formData = new FormData();

  for (var i = 0; i < images.length; i++) {
    let image = images[i];
    formData.append(`browsedImage${i}`, image)
  }
  return formData;
}

export default getImgFormData;
