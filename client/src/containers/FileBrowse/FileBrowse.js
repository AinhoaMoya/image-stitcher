import React, { Component } from 'react';
import './FileBrowse.css';
import axios from 'axios';

class FileBrowse extends Component {

  uploadHandler(e) {

    console.log(e.target.files)

    axios.post('/upload', {test: 'test'})
      .then((response) => {
        console.log('This is my response:')
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="fileBrowse">
        <input type="file"
                onChange={this.uploadHandler}
                mutiple="true"
                id="fileBrowser" name="fileBrowser"
                accept="image/*" />
      </div>
    );
  }
}

export default FileBrowse;
