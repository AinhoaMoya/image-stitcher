import React, { Component } from 'react';
import './ResultDisplay.css';
import PreviewUploads from '../PreviewUploads/PreviewUploads';
import { connect } from 'react-redux';
import axios from 'axios';

function mapStateToProps(state) {
  state = state.images;
  return {
    isReady: state.isReady,
    mergedImg: state.mergedImg
  };
}

class ResultDisplay extends Component {
  constructor(props) {
   super(props)
   this.state = {
     isReady: props.isReady,
     mergedImg: props.mergedImg,
     downloadReady: false,
     downloadImage: null
   };
 }


 static getDerivedStateFromProps(nextProps, prevState) {
   let mergedImg = nextProps.mergedImg;

   if (nextProps.isReady) {

     var byteString = atob(mergedImg.split(',')[1]);
     var mimeString = mergedImg.split(',')[0].split(':')[1].split(';')[0];
     var arrayBuffer = new ArrayBuffer(byteString.length);
     var _ia = new Uint8Array(arrayBuffer);
     for (var i = 0; i < byteString.length; i++) {
         _ia[i] = byteString.charCodeAt(i);
     }

     var dataView = new DataView(arrayBuffer);
     var blob = new Blob([dataView], { type: mimeString });


     let url = URL.createObjectURL(blob);

     return {
       downloadImage: url,
       downloadReady : true
     }
   } else {
     return null;
   }
 }


  render() {
    return (
      <div className="resultDisplay">
        {this.props.isReady &&
          <div>
            <PreviewUploads />
            <img className="mergedImg" src={this.props.mergedImg} alt="Merged result" />
            <a href="/">Refresh</a>
            <span>or</span>
            {this.state.downloadReady &&
            <a href={this.state.downloadImage} download="mergedImg.jpg">Download</a>
            }
          </div>
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(ResultDisplay);
