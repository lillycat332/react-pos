import { Typography } from '@mui/material';
import * as React from 'react';
import { Product, ProductDisplay } from '../types';

const ProductCard = React.lazy(() => import('./ProductCard'))
const Button = React.lazy(() => import('@mui/material/Button'))

export default function CartPage(props: { cart: ProductDisplay[], currency: string, emptier: Function }) {
	const total = () => {
		let cartPrices = props.cart.map((prod) => prod.p.productPrice);
		return cartPrices.reduce((cur, prev) => { return cur + prev })
	}

		
		
	if (typeof props.cart == 'undefined' || props.cart.length == 0) { return (<div></div>); }
	else {
		return (
			<div>
				<Typography variant="h3">Cart</Typography>
				<ul>
					{props.cart.map((prod) => {
						console.log(prod); return (
							<li key={prod.p.productId}>
								{prod.p.productName} - {props.currency}{prod.p.productPrice}
							</li>
						)
					})}
				</ul>
				<Typography variant="h5">
					Total cost: {props.currency}{total()} <br/>
				</Typography >
				<Button variant="contained" color="primary" onClick={() => { props.emptier() }}>
					Make sale
				</Button>
			</div >
		);
	}
}
