import * as React from 'react';
import {
	useEffect
	, useState
} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
	fetchProds
} from '../lib';
import {
	Product
} from '../types';
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
	productId: 0,
	productName: '',
	productPrice: 0
}

const prodCols = [
	{ name: 'productId', label: 'ID' },
	{ name: 'productName', label: 'Name' },
	{ name: 'productPrice', label: 'Price' },
]

// The page which shows a list of products and options to manage them.
export default function ProductPage(props: { setProds: (json: object) => void }) {
	const [prods, setProds] = useState([])
	const setBothProds = (prods: any[]) => { setProds(prods); props.setProds(prods) }
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		event.stopPropagation()
		try {
			let response =
				await fetch(`/prods`, {
					method: 'post',
					body: JSON.stringify(formVal)
				})
			if (response.status === 200) {
				setFormVal(productDefaults)
			} else if (response.status === 400) {
				const invalidData = 'Invalid product data was provided';
				throw invalidData
			} else {
				const unknownError = 'Unknown error';
				throw unknownError
			}
		} catch (err) {
			window.alert(`An error occured when I tried to add product.
Please ensure the server is running.
For advanced users: ${err}`)
		}
		fetchProds(setBothProds);
		handleClose();
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
	const handleClose = () => setOpen(false);

	useEffect(() => {
		fetchProds(setProds);
	}, []);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={modalStyle}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Add New Product
					</Typography>
					<div>
						<form onSubmit={handleSubmit}>
							<TextField
								id='name-input'
								name='productName'
								label='Product Name'
								type='text' margin='dense'
								variant='outlined'
								value={formVal.productName}
								onChange={handleInputChange} />

							<TextField id='price-input'
								name='productPrice'
								type='number'
								label='Price' margin='dense'
								variant='outlined'
								value={formVal.productPrice}
								onChange={handleInputNumericChange} />
							<br />
							<Button variant='contained' color='primary' type='submit'>
								Submit
							</Button>
						</form>
					</div>
				</Box >
			</Modal >

			<MUIDataTable
				columns={prodCols}
				data={prods}
				title='Products'
				options={{
					enableNestedDataAccess: '.',
					onRowsDelete: (row: any) => { removeProduct(row, setProds); }
				}} />
			<Box className='bottom-right' onClick={() => { setOpen(true) }}>
				<Fab color='primary' aria-label='add-user'>
					<AddIcon />
				</Fab>
			</Box>
		</div >
	);
}

async function removeProduct(product: Product, callback: (json: object) => void): Promise<void> {
	try {
		let response =
			await fetch(`/prods/${product.productId}`, {
				method: 'delete'
			})
		if (response.status === 200) {
			fetchProds(callback);
		}
		else if (response.status === 400) {
			const invalidData = 'Invalid product id was provided';
			throw invalidData
		}
		else {
			const unknownError = 'Unknown error';
			throw unknownError
		}
	} catch (err) {
		window.alert(`An error occured when I tried to remove that product.
Please ensure the server is running.
For advanced users: ${err}`)
	}
}