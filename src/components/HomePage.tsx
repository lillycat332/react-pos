import * as React from 'react';
import Masonry from '@mui/lab/Masonry';
import { fetchProds, fetchProdsWithStock } from '../lib';
import { Currency, ProductDisplay } from '../types';
import ProductCard from './ProductCard';

/**
 * The home page of the application. Displays a grid of all the available products.
 * @param props.listItems - an array of react components to display. Typically, these will be cards.
 */
export default function HomePage(props: { cartChanger: Function, currencyType: Currency }) {
	const [prods, setProds] = React.useState([]);
	const [prodsInStock, setProdsInStock] = React.useState([]);

	// Fetch data on load
	React.useEffect(() => {
		fetchProds(setProds);
		fetchProdsWithStock(setProdsInStock);
	}, [])

	const listItems = prods.map((product: any) => {
		const prod: ProductDisplay = {
			p: product,
			handler: props.cartChanger,
			currency: props.currencyType.symbol
		}

		const productIndex = prodsInStock.findIndex(elem => {
			return elem.prod.productId === prod.p.productId
		});

		if (productIndex !== -1) {
			const prodStock = prodsInStock[productIndex].pInStock
			return prodStock > 0 && <ProductCard prod={prod} stateChanger={props.cartChanger} />
		}
		return null
	})

	return (
		<Masonry
			columns={4}
			spacing={2}
			defaultHeight={450}
			defaultColumns={4}
			defaultSpacing={1}
		>{listItems}
		</Masonry>
	);
}
