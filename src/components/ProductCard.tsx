import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Product, ProductDisplay } from '../types.js';

export default function ProductCard(props: { prod: ProductDisplay, stateChanger: Function}) {
	const prod = props.prod
	const shouldShowButton = typeof (props.stateChanger) == 'function'
	const stateChanger = () => {props.stateChanger(prod)}
	return (
		<Card>
			<CardContent>
				<Typography gutterBottom
					variant="h5"
					component="h2">
					{prod.p.product_name}
				</Typography>
				<Typography variant="body2"
					color="textSecondary"
					component="p">
					{prod.currency}{prod.p.product_price}
				</Typography>
			</CardContent>
			<CardActions>
				{shouldShowButton ? <Button size="small" variant="contained" color="primary"
					onClick={stateChanger}>Add to Cart</Button> : null}
			</CardActions>
		</Card>
	);
}
