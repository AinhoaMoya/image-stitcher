import React, { Component } from 'react';
import './FileBrowse.css';
import axios from 'axios';

import { connect } from 'react-redux';
import * as imageActions from '../../actions/imageActions';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  state = state.images;
  return {
    images: state.images,
    imgCounter: state.imgCounter,
    isReady: state.isReady,
    mergedImg: state.mergedImg
  };
}

function mapDispatchToProps(dispatch) {
  return {
    imageActions: bindActionCreators(imageActions, dispatch)
  };
}

class FileBrowse extends Component {

  handleImages(images) {
    let previewImages = [];

    let formData = new FormData();

    for (var i = 0; i < images.length; i++) {
      let image = images[i];
      formData.append(`browsedImage${i}`, image)

      const reader = new FileReader();

      reader.onload = (function (currentImg) {
          return function (e) {
            let previewImage = {
              imgName: image.name,
              imgURI: e.target.result
            }
            previewImages.push(previewImage);
          };
      })(image);

      // Read in the image file as a data URL.
      reader.readAsDataURL(image);

    }

    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log('Successfully uploaded image to server!');
      this.props.imageActions.increaseCounter(images.length);
      this.props.imageActions.addImages(previewImages);
    })
    .catch((error) => {
      console.log(error)
    })
  }


  uploadHandler(e) {

    let inputImages = e.target.files;

    if (inputImages.length > 4 || inputImages.length > (4 - this.props.imgCounter)) {
      alert('There is a 4 images limit!')
    } else if (inputImages.length === 4 || inputImages.length === (4 - this.props.imgCounter)) {
      this.props.imageActions.toggleStatus();
      this.handleImages(inputImages);
    } else {
      this.handleImages(inputImages);
    }
  }




  render() {
    return (
      <div className="fileBrowse">
        <form>
          <input type="file" multiple accept="image/*" onChange={this.uploadHandler.bind(this)} />
        </form>
        <span>{this.props.imgCounter}</span>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileBrowse);
