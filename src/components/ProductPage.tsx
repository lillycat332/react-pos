import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {sendObject, fetchProds} from '../lib';
import { Product } from '../types';

const modalStyle = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const productDefaults: Product = {
	product_id: 0,
	product_name: "",
	product_price: 0
}

// The page which shows a list of products and options to manage them.
export default function ProductPage() {
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		await sendObject(formVal, "prods");
		handleOpen()
		handleClose();
		setFormVal(productDefaults)
	};

	const handleSliderChange = (name: string) => (e: any, value: number) => {
		setFormVal({
			...formVal,
			[name]: value,
		});
	};

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormVal({
			...formVal,
			[name]: value,
		});
	};

	const handleInputNumericChange = (e: any) => {
		const { name, value } = e.target;
		setFormVal({
			...formVal,
			[name]: Number(value),
		});
	};

	const [open, setOpen] = React.useState(false);
	const [formVal, setFormVal] = React.useState(productDefaults);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [prods, setProds] = useState([]);

	useEffect(() => {
		fetchProds(setProds);
	}, []);

	return (
		<div>
			<Button variant="contained" onClick={handleOpen}>
				Add new product
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						ADD NEW PRODUCT
					</Typography>
					<div>
						<form onSubmit={handleSubmit}>
							<TextField
									id="name-input"
								name="product_name"
								label="Productname"
								type="text" margin="dense"
								variant="outlined"
								value={formVal.product_name}
							onChange={handleInputChange} />
							
							<TextField id="price-input"
								name="product_price"
							inputProps={{ inputMode: 'numeric', pattern: '[0-9]*(.)?[0-9]*' }}
							label="Price" margin="dense"
							variant="outlined"
							value={formVal.product_price}
							onChange={handleInputNumericChange} />
							<Button variant="contained" color="primary" type="submit">
								Submit
							</Button>
						</form>
					</div>
				</Box >
			</Modal >
			<ul>
				{prods.map((product) => (
					<li key={product.product_id}>
						{product.product_name} - Price: {product.product_price}
					</li>
				))}
			</ul>
		</div >
	);
}

async function removeProduct(product: Product): Promise<void> {
		
}
