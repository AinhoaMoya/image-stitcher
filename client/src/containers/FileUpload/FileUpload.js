import React, { Component } from 'react';
import './FileUpload.css';
import ProgressNotification from '../ProgressNotification/ProgressNotification';
import FileDrop from '../FileDrop/FileDrop';
import FileBrowse from '../FileBrowse/FileBrowse';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  state = state.images;
  return {
    isReady: state.isReady,
  };
}

class FileUpload extends Component {
  render() {
    return (
      <div className={this.props.isReady ? "inactive" : "active"}>
        {!this.props.isReady &&
          <div className="fileUpload">
            <FileDrop />
            <FileBrowse />
            <ProgressNotification />
          </div>
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(FileUpload);
