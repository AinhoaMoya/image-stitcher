import React, { Component } from 'react';
import './FileDrop.css';
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux';
import * as imageActions from '../../actions/imageActions';
import { bindActionCreators } from 'redux';
import getPreviewImages from '../../helpers/getPreviewImages';
import sendImages from '../../helpers/sendImages';

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
   super(props)
   this.state = {
     images: props.images,
     imgCounter: props.imgCounter,
     isReady: props.isReady,
     mergedImg: props.mergedImg
   };
 }

 static getDerivedStateFromProps(nextProps, prevState) {
   let images = nextProps.images;
   if (nextProps.imgCounter === 4) {
         sendImages(images)
         .then((result) => {
             nextProps.imageActions.setMergedImg(result);
         })
   }
   return nextProps;
 }

  dropHandler(images) {
    if (images.length > 4 || images.length > (4 - this.props.imgCounter)) {
      alert('There is a 4 images limit!')
    } else {

      Array.from(images).forEach(async (image) => {
        const imageContents = await getPreviewImages(image);
        this.props.imageActions.addImage(imageContents);
       });

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
