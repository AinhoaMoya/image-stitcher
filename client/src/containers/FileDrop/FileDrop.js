import React, { Component } from 'react';
import './FileDrop.css';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux';
import * as imageActions from '../../actions/imageActions';
import { bindActionCreators } from 'redux';
import getPreviewImages from '../../helpers/getPreviewImages';

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

  static getDerivedStateFromProps(nextProps, prevState) {
    let images = nextProps.images;
    if (nextProps.imgCounter === 4) {
      let formData = new FormData();

      for (var i = 0; i < images.length; i++) {
        let image = images[i].imgObject;
        formData.append(`droppedImage${i}`, image)
      }

      axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log('Successfully uploaded image to server!');
        nextProps.imageActions.setMergedImg(response.data.imgUrl);
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  dropHandler(files) {
    if (files.length > 4 || files.length > (4 - this.props.imgCounter)) {
      alert('There is a 4 images limit!')
    } else {
      let props = this.props;
      // TODO: REMOVE SETTIMEOUT HACK AND FIX
      getPreviewImages(files, props).then((images) => {
        setTimeout(function(){
          images.map((image) => {
            props.imageActions.addImages(image);
          })
        }, 1000);
      })
    }
  }

  render() {
    return (
      <div className="fileDrop">
        <Dropzone
          className="dropzone"
          multiple={true}
          accept="image/*"
          onDrop={this.dropHandler.bind(this)}
          activeClassName="active"
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
