import React, { Component } from 'react';
import './FileDrop.css';

import axios from 'axios';
import Dropzone from 'react-dropzone'

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

  //TODO: Clean up repeated code
  handleImages(images) {
    let previewImages = [];

    let formData = new FormData();

    for (var i = 0; i < images.length; i++) {
      let image = images[i];
      formData.append(`droppedImage${i}`, image)

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


  uploadHandler(files) {

    if (files.length > 4 || files.length > (4 - this.props.imgCounter)) {
      alert('There is a 4 images limit!')
    } else if (files.length === 4 || files.length === (4 - this.props.imgCounter)) {
      this.handleImages(files);
    } else {
      console.log('Add more images!')
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
