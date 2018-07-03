import * as types from './actionTypes';

export function addImage(image) {
    return {
        type: types.ADD_IMAGE,
        image: image
    }
}

export function setMergedImg(imgUrl) {
    return {
        type: types.SET_MERGEDIMG,
        imgUrl: imgUrl
    }
}
