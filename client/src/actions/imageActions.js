import * as types from './actionTypes';

export function addImages(image) {
    return {
        type: types.ADD_IMAGE,
        image: image
    }
}

// export function deleteImage(img) {
//     return {
//         type: types.DELETE_IMAGE,
//         image: img
//     }
// }

export function deleteAll() {
    return {
        type: types.DELETE_ALL
    }
}

export function increaseCounter(amount) {
    return {
        type: types.INCREASE_COUNTER,
        amount: amount
    }
}

export function toggleStatus() {
    return {
        type: types.TOGGLE_STATUS
    }
}

export function setMergedImg(imgUrl) {
    return {
        type: types.SET_MERGEDIMG,
        imgUrl: imgUrl
    }
}
