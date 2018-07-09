async function getPreviewImages(inputFile) {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException("Problem parsing input file"));
    };
    fileReader.onload = () => {
      resolve({
        imgName: inputFile.name,
        imgURI: fileReader.result,
        imgObject: inputFile
      });
    };
    fileReader.readAsDataURL(inputFile)
  })
}

export default getPreviewImages;
