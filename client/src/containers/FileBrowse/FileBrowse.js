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
      this.props.imageActions.setMergedImg(response.data.imgUrl);
    })
    .catch((error) => {
      console.log(error)
    })
  }


  uploadHandler(e) {

    let inputImages = e.target.files;

    if (inputImages.length > 4 || inputImages.length > (4 - this.props.imgCounter)) {
      e.target.value = null;
      alert('There is a 4 images limit!')
    } else if (inputImages.length === 4 || inputImages.length === (4 - this.props.imgCounter)) {
      this.handleImages(inputImages);
    } else {
      console.log('Add more images!')
    }
  }

  render() {
    return (
      <div className="fileBrowse">
        <form>
          <label htmlFor="imageUploader">Choose up to 4 images</label>
            <input type="file" name="imageUploader" multiple accept="image/*" size="60" onChange={this.uploadHandler.bind(this)} />
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileBrowse);
