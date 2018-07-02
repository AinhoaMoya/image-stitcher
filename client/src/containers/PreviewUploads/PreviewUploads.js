import React, { Component } from 'react';
import './PreviewUploads.css';

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

class PreviewUploads extends Component {
  render() {
    return (
      <div className="previewUploads">
        <span>You have uploaded {this.props.imgCounter} out of 4 images</span>
        <ul className="previewImages">
        {this.props.images.map((image, key) => {
          return (
            <li key={key}>
              <img src={image.imgURI} alt={image.imgName} />
            </li>
          )
        })}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(PreviewUploads);
