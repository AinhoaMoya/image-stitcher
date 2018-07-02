import React, { Component } from 'react';
import './FileDrop.css';

import axios from 'axios';
import Dropzone from 'react-dropzone'

class FileDrop extends Component {

  //TODO: Clean up repeated code
  uploadHandler(files) {
    console.log(files)

    let formData = new FormData();

    let images = files;

    for (var i = 0; i < images.length; i++) {
      let image = images[i];
      formData.append(`droppedImage${i}`, image)
    }

    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error)
    })

  }

  render() {
    return (
      <div className="fileDrop">
        <Dropzone
          multiple={true}
          accept="image/*"
          onDrop={this.uploadHandler.bind(this)}
        >
        <span>Drag and Drop 4 images here to upload</span>
        </Dropzone>
      </div>
    );
  }
}

export default FileDrop;
