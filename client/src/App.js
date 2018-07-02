import React, { Component } from 'react';
import './App.css';
import FileUpload from './containers/FileUpload/FileUpload';
import PreviewUploads from './containers/PreviewUploads/PreviewUploads';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FileUpload />
        <PreviewUploads />
      </div>
    );
  }
}

export default App;
