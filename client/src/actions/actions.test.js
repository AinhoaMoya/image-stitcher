import * as actions from './imageActions';
import * as types from './actionTypes';

describe('actions', () => {

  it('should add an image', () => {
    const image = {
      imgName: 'imgName',
      imgURI: 'someURI',
      imgObject: {}
    }
    const expectedAction = {
      type: types.ADD_IMAGE,
      image
    }
    expect(actions.addImage(image)).toEqual(expectedAction)
  })

  it('update status and return resuling image data', () => {
    const imgUrl = 'some url'
    const expectedAction = {
      type: types.SET_MERGEDIMG,
      imgUrl
    }
    expect(actions.setMergedImg(imgUrl)).toEqual(expectedAction)
  })

})
