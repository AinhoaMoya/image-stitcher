import initialState from './initialState';
import { ADD_IMAGE, SET_MERGEDIMG } from '../actions/actionTypes';

export default function images(state = initialState, action) {

    let updatedState;

    switch (action.type) {

        case ADD_IMAGE:
            return {
              images: [...state.images, action.image],
              imgCounter: state.imgCounter + 1,
              isReady: state.isReady,
              mergedImg: state.mergedImg
            }

        case SET_MERGEDIMG:
            return {
                images: state.images,
                imgCounter: state.imgCounter,
                isReady: true,
                mergedImg: action.imgUrl
            }

        default:
            return state;
    }
}
