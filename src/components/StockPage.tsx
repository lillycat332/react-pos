import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Product, ProductWithStock } from '../types';
import MUIDataTable from 'mui-datatables';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { MenuItem, Select } from '@mui/material';

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
	productId: 0,
	productName: '',
	productPrice: 0
}

const productWithStockDefaults: ProductWithStock = {
	prod: productDefaults,
	pInStock: 0,
}

const prodCols = [
	{ name: 'prod.productId', label: 'ID' },
	{ name: 'prod.productName', label: 'Name' },
	{ name: 'prod.productPrice', label: 'Price' },
	{ name: 'pInStock', label: 'Stock' }
]

async function fetchProdsWithSales(callback: (data: ProductWithStock[]) => void) {
	try {
		const response = await fetch(
			`${window.location.href}stock/all/`,
			{ method: 'get' }
		)
		if (response.status === 200) {
			const data = await response.json() as unknown as ProductWithStock[]
			callback(data)
		} else {
			throw new Error('Something went wrong')
		}
	} catch (error) {
		console.error(error)
	}
}

function EditStockModal(props: { onSubmit: (event: React.FormEvent, prod: ProductWithStock) => void, prods: ProductWithStock[] }) {
	const [formVal, setFormVal] = React.useState(productWithStockDefaults);
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

	return (
		<Box sx={modalStyle}>
			<Typography id='modal-modal-title' variant='h6' component='h2'>
				Modify Stock Data
			</Typography>
			<div>
				<form onSubmit={(e) => { props.onSubmit(e, formVal) }}>
					<Select
						labelId='stock-modal-product-label'
						id='stock-modal-product-select'
						label='Product'
						name='prod'
						autoWidth={true}
						margin='dense'
						value={formVal.prod}
						onChange={handleInputChange}
					>
						{props.prods.map((prod) => {
							return (
								// @ts-ignore -- necessary because value won't accept ProductWithStock
								<MenuItem
									value={prod.prod}
									key={prod.prod.productId}
								>{prod.prod.productName}</MenuItem>
							)
						})}
					</Select>
					<br />

					<TextField id='stock-input'
						name='pInStock'
						type='number'
						label='Stock'
						margin='dense'
						variant='outlined'
						value={formVal.pInStock}
						onChange={handleInputNumericChange} />
					<br />
					<Button variant='contained' color='primary' type='submit'>
						Submit
					</Button>
				</form>
			</div>
		</Box >
	)
}

// The page which shows a list of products and options to manage them.
export default function StockPage() {
	const [prods, setProds] = useState([])
	const [open, setOpen] = React.useState(false);

	// const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		fetchProdsWithSales(setProds);
	}, []);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<EditStockModal onSubmit={(e, prod) => {
					e.preventDefault();
					fetch(`${window.location.href}stock/${prod.prod.productId}/${prod.pInStock}`, {
						method: 'put'
					})
					handleClose();
				}} prods={prods}
				/>
			</Modal>
			<MUIDataTable
				columns={prodCols}
				data={prods}
				title='Stock'
				options={{
					enableNestedDataAccess: '.',
				}} />
			<Box className='bottom-right' onClick={() => { setOpen(true) }}>
				<Fab color='primary' aria-label='add-user'>
					<AddIcon />
				</Fab>
			</Box>
		</div >
	);
}