import React, { Component } from 'react';
import './FileBrowse.css';
import axios from 'axios';

class FileBrowse extends Component {

  uploadHandler(e) {

    let formData = new FormData();

    let images = e.target.files;

    for (var i = 0; i < images.length; i++) {
      let image = images[i];
      formData.append(`browsedImage${i}`, image)
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
      <div className="fileBrowse">
        <form>
          <input type="file" multiple accept="image/*" onChange={this.uploadHandler} />
        </form>
      </div>
    );
  }
}

export default FileBrowse;
