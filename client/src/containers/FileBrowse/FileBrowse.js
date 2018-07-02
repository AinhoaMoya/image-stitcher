import React, { Component } from 'react';
import './FileBrowse.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as imageActions from '../../actions/imageActions';
import { bindActionCreators } from 'redux';
import getPreviewImages from '../../helpers/getPreviewImages';
import getImgFormData from '../../helpers/getImgFormData';

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
    let previewImages = getPreviewImages(images);
    let formData = getImgFormData(images);

    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log('Successfully uploaded image to server!');
      this.props.imageActions.addImages(previewImages);
      this.props.imageActions.setMergedImg(response.data.imgUrl);
    })
    .catch((error) => {
      console.log(error)
    })
  }


  uploadHandler(e) {
    let inputImages = e.target.files;
    console.log(inputImages)
    let previewImages = getPreviewImages(inputImages);
    if (inputImages.length > 4 || inputImages.length > (4 - this.props.imgCounter)) {
      e.target.value = null;
      alert('There is a 4 images limit!')
    } else if (inputImages.length === 4 || inputImages.length === (4 - this.props.imgCounter)) {
      this.props.imageActions.increaseCounter(inputImages.length);
      this.handleImages(inputImages);
    } else {
      this.props.imageActions.addImages(previewImages);
      this.props.imageActions.increaseCounter(inputImages.length);
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
