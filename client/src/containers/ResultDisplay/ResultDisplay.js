import React, { Component } from 'react';
import './ResultDisplay.css';
import PreviewUploads from '../PreviewUploads/PreviewUploads';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  state = state.images;
  return {
    isReady: state.isReady,
    mergedImg: state.mergedImg
  };
}

// BUG Download link not working (Network failure): the problem might be the size of the image
class ResultDisplay extends Component {
  render() {
    return (
      <div className="resultDisplay">
        {this.props.isReady &&
          <div>
            <PreviewUploads />
            <img className="mergedImg" src={this.props.mergedImg} alt="Merged result" />
            <a href="/">Refresh</a>
            <span>or</span>
            <a href={this.props.mergedImg} download="mergedImg.jpg">Download</a>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(ResultDisplay);
