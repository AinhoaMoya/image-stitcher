import React, { Component } from 'react';
import './ProgressNotification.css';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  state = state.images;
  return {
    imgCounter: state.imgCounter,
  };
}

class ProgressNotification extends Component {
  render() {
    return (
      <div className="progressNotification">
        <span>You have uploaded {this.props.imgCounter} out of 4 images</span><br/>
        {this.props.imgCounter === 4 &&
          <span>Upload complete! We are preparing your image...</span>
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(ProgressNotification);
