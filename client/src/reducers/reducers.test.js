import reducer from './imagesReducer';
import * as types from '../actions/actionTypes';

describe('Images reducers', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        images: [],
        imgCounter: 0,
        isReady: false,
        mergedImg: null
      }
    )
  })

  it('should add an image', () => {
    expect(
      reducer(
        {
          images: [],
          imgCounter: 0,
          isReady: false,
          mergedImg: null
        },
        {
          type: types.ADD_IMAGE,
          image: {
            imgName: 'someName',
            imgURI: 'someURI',
          }
        }
      )
    ).toEqual(
      {
        images: [{
          imgName: 'someName',
          imgURI: 'someURI',
        }],
        imgCounter: 1,
        isReady: false,
        mergedImg: null
      }
    )
  })

  it('should set image upload as complete and return merged image data', () => {
    expect(
      reducer(
        {
          images: [],
          imgCounter: 0,
          isReady: false,
          mergedImg: null
        },
        {
          type: types.SET_MERGEDIMG,
          imgUrl: 'someUrl'
        }
      )
    ).toEqual(
      {
        images: [],
        imgCounter: 0,
        isReady: true,
        mergedImg: 'someUrl'
      }
    )
  })

})
