import React, { Component } from 'react';
import './FileBrowse.css';

class FileBrowse extends Component {

  uploadHandler(e) {
    console.log(e.target.files)
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
