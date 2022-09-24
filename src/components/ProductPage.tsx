import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { sendObject, fetchProds } from '../lib';
import { Product } from '../types';
import MUIDataTable from 'mui-datatables';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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

const prodCols = [{ name: 'product_id', label: 'ID' },
{ name: 'product_name', label: 'Name' },
{ name: 'product_price', label: 'Price' }]

// The page which shows a list of products and options to manage them.
export default function ProductPage() {
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		event.stopPropagation()
		try {
			let response =
				await fetch(`${global.window.location.href}prods`, {
					method: 'post',
					body: JSON.stringify(formVal)
				})
			let jsoned = await response.json()
			if (response.status === 200) {
				setFormVal(productDefaults)
			}
		} catch (err) {
			console.log(err)
		}
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
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Add New Product
					</Typography>
					<div>
						<form onSubmit={handleSubmit}>
							<TextField
								id="name-input"
								name="product_name"
								label="Product Name"
								type="text" margin="dense"
								variant="outlined"
								value={formVal.product_name}
								onChange={handleInputChange} />

							<TextField id="price-input"
								name="product_price"
								type="number"
								label="Price" margin="dense"
								variant="outlined"
								value={formVal.product_price}
								onChange={handleInputNumericChange} />
							<br />
							<Button variant="contained" color="primary" type="submit">
								Submit
							</Button>
						</form>
					</div>
				</Box >
			</Modal >
			
			<MUIDataTable columns={prodCols} data={prods} title="Products" />
			<Box className="bottom-right" onClick={handleOpen}>
				<Fab color="primary" aria-label="add-user">
					<AddIcon />
				</Fab>
			</Box>

		</div >
	);
}

async function removeProduct(product: Product): Promise<void> {

}

async function sendProd(toSend: Product, location: string) {
	await fetch(`${global.window.location.href}${location}`,
		{
			method: 'post',
			body: JSON.stringify(toSend)
		})
}
