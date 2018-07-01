import React, { Component } from 'react';
import './FileDrop.css';

import Dropzone from 'react-dropzone'

class FileDrop extends Component {

  onImageDrop(files) {
    console.log(files)
  }

  render() {
    return (
      <div className="fileDrop">
        <Dropzone
          multiple={true}
          accept="image/*"
          onDrop={this.onImageDrop.bind(this)}
        >
        <span>Drag and Drop 4 images here to upload</span>
        </Dropzone>
      </div>
    );
  }
}

export default FileDrop;
