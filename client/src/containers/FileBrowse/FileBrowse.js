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

// Makes Redux actions available to component, which is necessary to update Redux's store
function mapDispatchToProps(dispatch) {
  return {
    imageActions: bindActionCreators(imageActions, dispatch)
  };
}

class FileBrowse extends Component {

// getDerivedStateFromProps requires the component to be initialised with state
  constructor(props) {
   super(props)
   this.state = {
     images: props.images,
     imgCounter: props.imgCounter,
     isReady: props.isReady,
     mergedImg: props.mergedImg
   };
 }

// getDerivedStateFromProps will re-render its component as props updates
  static getDerivedStateFromProps(nextProps, prevState) {
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
    return nextProps;
  }

  async inputHandler(e) {

    let images = e.target.files;

    if (images.length > 4 || images.length > (4 - this.props.imgCounter)) {
      e.target.value = null;
      alert('There is a 4 images limit!')
    } else {

      Array.from(images).forEach(async (image) => {
        const imageContents = await getPreviewImages(image);
        this.props.imageActions.addImage(imageContents);
        console.log(imageContents);
       });

    }
  }

  render() {
    return (
      <div className="fileBrowse">
        <form>
          <label htmlFor="imageUploader">Browse and choose up to 4 images</label>
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
