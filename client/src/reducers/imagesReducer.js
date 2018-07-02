import initialState from './initialState';
import { ADD_IMAGE, INCREASE_COUNTER, DELETE_ALL, SET_MERGEDIMG, TOGGLE_STATUS } from '../actions/actionTypes';

export default function images(state = initialState, action) {

    let updatedState;

    switch (action.type) {

        case ADD_IMAGE:
            updatedState = Object.assign({}, state);
            updatedState.images = updatedState.images.concat(action.images);

            return updatedState;

        case INCREASE_COUNTER:
            updatedState = Object.assign({}, state)
            updatedState.imgCounter = updatedState.imgCounter + action.amount;
            return updatedState;

        case DELETE_ALL:
            updatedState = Object.assign({}, state)
            updatedState.images = []
            updatedState.imgCounter = 0
            return updatedState;


        case SET_MERGEDIMG:
            updatedState = Object.assign({}, state)
            updatedState.mergedImg = action.img;
            updatedState.isReady = true;
            return updatedState;

        case TOGGLE_STATUS:
            updatedState = Object.assign({}, state)
            updatedState.isReady = !updatedState.isReady
            return updatedState;

        default:
            return state;

    }
}
