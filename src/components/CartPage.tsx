import { Typography } from '@mui/material';
import * as React from 'react';
import { ProductDisplay } from '../types';

const Button = React.lazy(() => import('@mui/material/Button'))

/**
 * Shows the cart page. Allows the operator to view the cart and checkout.
 * @param props.prod - list of products to display
 * @param props.currency - the currency to display the price in
 * @param props.emptier - a function to call when the make sale button is clicked. (ie. when the cart is emptied)
 * @param props.canceller - a function to call to cancel the sale. (ie. when the cancel sale button is clicked)
 * @returns A react component that displays a product
 */
export default function CartPage(props: { cart: ProductDisplay[], currency: string, emptier: Function, canceller: Function }) {
	const total = () => {
		let cartPrices = props.cart.map((prod) => prod.p.productPrice);
		return cartPrices.reduce((cur, prev) => { return cur + prev })
	}

	if (typeof props.cart == 'undefined' || props.cart.length === 0) { return (<div></div>); }
	else {
		return (
			<div>
				<Typography variant='h4'>Cart</Typography>
				<ul>
					{props.cart.map((prod) => {
						console.log(prod); return (
							<li key={prod.p.productId}>
								{prod.p.productName} - {props.currency}{prod.p.productPrice}
							</li>
						)
					})}
				</ul>
				<Typography variant='h5'>
					Total cost: {props.currency}{total()} <br />
				</Typography >
				<Button
					variant='contained'
					color='primary'
					onClick={() => { props.emptier() }}
					sx={{ m: '1%' }}
				>
					Make sale
				</Button>
				<Button
					variant='contained'
					color='error'
					onClick={() => { props.canceller() }}
					sx={{ m: '1%' }}>
					Cancel sale
				</Button>
			</div >
		);
	}
}
