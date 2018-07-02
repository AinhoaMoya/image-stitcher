import React, { Component } from 'react';
import './FileBrowse.css';
import axios from 'axios';
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

class FileBrowse extends Component {

  static getDerivedStateFromProps(nextProps, prevState){
    let images = nextProps.images;
    if (nextProps.imgCounter === 4) {
      let formData = new FormData();

      for (var i = 0; i < images.length; i++) {
        let image = images[i].imgObject;
        formData.append(`browsedImage${i}`, image)
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

  async inputHandler(e) {

    let images = e.target.files;

    if (images.length > 4 || images.length > (4 - this.props.imgCounter)) {
      e.target.value = null;
      alert('There is a 4 images limit!')
    } else {
      let props = this.props;
      // TODO: REMOVE SETTIMEOUT HACK AND FIX
      getPreviewImages(images, props).then((images) => {
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
      <div className="fileBrowse">
        <form>
          <label htmlFor="imageUploader">Choose up to 4 images</label>
            <input type="file" name="imageUploader" multiple accept="image/*" size="60" onChange={this.inputHandler.bind(this)} />
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileBrowse);
