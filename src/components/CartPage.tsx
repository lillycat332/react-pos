import * as React from 'react';
const ProductCard = React.lazy(() => import('./ProductCard'))
export default function CartPage(props: { cart: any[], currency: string }) {
    const cartItems = props.cart.map((product) => {
	return (
	    <ProductCard name={product}
			 price={1}
			 imagePath="logo512.png"
			 currency={props.currency}
			 addToCart={undefined} />
	);}
    );
    return (
	<ul>{cartItems}</ul>
    );
}
