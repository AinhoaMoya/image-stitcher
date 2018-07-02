import React, { Component } from 'react';
import './FileDrop.css';
import axios from 'axios';
import Dropzone from 'react-dropzone'
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

class FileDrop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dropzoneActive: false
    }
  }

  onDragEnter() {
    this.setState({dropzoneActive: true})
  }

  onDragLeave() {
    this.setState({dropzoneActive: false})
  }

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


  uploadHandler(files) {
    let previewImages = getPreviewImages(files);
    if (files.length > 4 || files.length > (4 - this.props.imgCounter)) {
      alert('There is a 4 images limit!')
    } else if (files.length === 4 || files.length === (4 - this.props.imgCounter)) {
      this.props.imageActions.increaseCounter(files.length);
      this.handleImages(files);
    } else {
      this.props.imageActions.addImages(previewImages);
      this.props.imageActions.increaseCounter(files.length);
    }
  }

  render() {
    return (
      <div className="fileDrop">
        <Dropzone
          className={"dropzone " + (this.state.dropzoneActive ? 'active' : 'inactive')}
          multiple={true}
          accept="image/*"
          onDragEnter={this.onDragEnter.bind(this)}
          onDragLeave={this.onDragLeave.bind(this)}
          onDrop={this.uploadHandler.bind(this)}
        >
        <span>Drag and Drop up to 4 images here to upload</span>
        </Dropzone>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileDrop);
