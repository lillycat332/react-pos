import renderer from 'react-test-renderer';
import ProductCard from '../components/ProductCard';
import { ProductDisplay } from '../types';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom';
import React from 'react';

const props: ProductDisplay = {
	p: {
		productId: 1,
		productName: 'Product 1',
		productPrice: 100,
	},
	currency: '$',
	handler: undefined
}

const propWithFun: ProductDisplay = {
	p: {
		productId: 1,
		productName: 'Product 1',
		productPrice: 100,
	},
	currency: '$',
	handler: () => { console.log('handled') }
}

describe('ProductCard', () => {
	it('renders correctly without a handler', () => {
		const tree = renderer
			.create(<ProductCard prod={props} stateChanger={() => { }} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('renders correctly with handler', () => {
		const tree = renderer
			.create(<ProductCard prod={propWithFun} stateChanger={() => { }} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('handles click', () => {
		console.log = jest.fn();
		const card = shallow(<ProductCard prod={propWithFun} stateChanger={() => { }} />);
		card.find('button').simulate('click');
		expect(card).toMatchSnapshot();
		expect(card.find('button').text()).toEqual('Add to Cart');
		expect(console.log).toHaveBeenCalled();
	})
})