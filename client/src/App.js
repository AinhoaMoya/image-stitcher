import React, { Component } from 'react';
import './App.css';
import FileUpload from './containers/FileUpload/FileUpload';
import PreviewUploads from './containers/PreviewUploads/PreviewUploads';
import ResultDisplay from './containers/ResultDisplay/ResultDisplay';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FileUpload />
        <PreviewUploads />
        <ResultDisplay />
      </div>
    );
  }
}

export default App;
