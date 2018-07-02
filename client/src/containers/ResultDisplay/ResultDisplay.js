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

class ResultDisplay extends Component {
  render() {
    return (
      <div className="resultDisplay">
        {this.props.isReady &&
          <div>
            <PreviewUploads />
            <img className="mergedImg" src={this.props.mergedImg} alt="Merged result" />
          </div>
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(ResultDisplay);
