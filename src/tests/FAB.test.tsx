import React from 'react';
import renderer from 'react-test-renderer';
import FAB from '../components/FAB';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom';
import { Add } from '@mui/icons-material';

describe('FAB', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(<FAB callback={() => { }} icon={new React.Component(Add)} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	})

	it('handles click', () => {
		console.log = jest.fn();
		const fab = shallow(<FAB callback={() => { console.log('handled') }} icon={new React.Component(Add)} />);
		fab.find('button').simulate('click');
		expect(fab).toMatchSnapshot();
		expect(console.log).toHaveBeenCalledWith('handled');
	})
})