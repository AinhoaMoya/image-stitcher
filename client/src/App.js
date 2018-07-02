import React, { Component } from 'react';
import './App.css';
import FileUpload from './containers/FileUpload/FileUpload';
import ResultDisplay from './containers/ResultDisplay/ResultDisplay';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FileUpload />
        <ResultDisplay />
      </div>
    );
  }
}

export default App;
