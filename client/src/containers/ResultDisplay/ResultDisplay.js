import React, { Component } from 'react';
import './ResultDisplay.css';

import { connect } from 'react-redux';

function mapStateToProps(state) {
  state = state.images;
  return {
    images: state.images,
    imgCounter: state.imgCounter,
    isReady: state.isReady,
    mergedImg: state.mergedImg
  };
}

class ResultDisplay extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="resultDisplay">
        {this.props.isReady &&
          <img src={this.props.mergedImg} alt="Merged result" />
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(ResultDisplay);
