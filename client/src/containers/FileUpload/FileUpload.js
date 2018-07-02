import React, { Component } from 'react';
import './FileUpload.css';

import FileDrop from '../FileDrop/FileDrop';
import FileBrowse from '../FileBrowse/FileBrowse';
import PreviewUploads from '../PreviewUploads/PreviewUploads';

class FileUpload extends Component {
  render() {
    return (
      <div className="fileUpload">
        <FileDrop />
        <FileBrowse />
        <PreviewUploads />
      </div>
    );
  }
}

export default FileUpload;
