import React, { Component } from 'react';
import './FileUpload.css';

import FileDrop from '../FileDrop/FileDrop';
import FileBrowse from '../FileBrowse/FileBrowse';

class FileUpload extends Component {
  render() {
    return (
      <div className="fileUpload">
        <FileDrop />
        <FileBrowse />
      </div>
    );
  }
}

export default FileUpload;
