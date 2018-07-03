import { mount } from 'enzyme';
import ResultDisplay from './ResultDisplay';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import configureStore from '../../store/configureStore';
import * as actions from '../../actions/imageActions'


Enzyme.configure({ adapter: new Adapter() });

describe('<ResultDisplay>', () => {
  it('renders the merged image for download', () => {
    let store = configureStore();

    const root = mount(<ResultDisplay store={store}/>);

    expect(root.find('div').hasClass('resultDisplay')).toBe(true);
  });
});
