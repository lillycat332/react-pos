import * as React from 'react';
import {
	useEffect
} from 'react';
import Typography from '@mui/material/Typography';
import {
	BarChart
	, Bar
	, XAxis
	, YAxis
	, CartesianGrid
	, Tooltip
	, Legend
	, ResponsiveContainer
} from 'recharts';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Product } from '../types';
import { Moment } from 'moment';
import { TextField, TextFieldProps } from '@mui/material';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

/**
 * 
 * @param date - an object, like {y: 2022, m: 5}
 * @param id - product id to fetch. number.
 * @returns sales data json from the server
 */

type salesData = {
	prod: {
		productId: 0,
		productName: '',
		productPrice: 0
	},
	startDate: Moment,
	endDate: Moment
}

const defaultSales: salesData = {
	prod: {
		productId: 0,
		productName: '',
		productPrice: 0
	},
	startDate: moment(),
	endDate: moment()
}

async function getSalesData(date: { y: String, m: String }, id: Number) {
	return await fetch(`/sales/${date.y}/${date.m}/${id}`
		, { method: 'get' })
		.then((data: any) => data.json() as unknown as { numberSold: number, salesDate: string, salesId: number }[])
}

export default function SalesPage() {
	const [formVal, setFormVal] = React.useState(defaultSales);
	const [prods, setProds] = React.useState<Product[]>([])

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormVal({
			...formVal,
			[name]: value,
		});
	};

	const handleStartDateChange = (e: any) => {
		setFormVal({
			...formVal,
			startDate: e
		})
	}

	const handleEndDateChange = (e: any) => {
		setFormVal({
			...formVal,
			endDate: e
		})
	}

	React.useEffect(() => {
		fetch('/prods/all')
			.then(data => data.json() as unknown as Product[])
			.then(data => setProds(data))
	}, [])

	return (
		<div>
			<Typography variant='h4' component='div' gutterBottom>
				Sales
			</Typography>
			<SalesGraph startDate={formVal.startDate} endDate={formVal.endDate} id={formVal.prod.productId} />
			<Box sx={{
				width: '50%'
			}}>
				<FormControl fullWidth>
					<Select
						labelId='stock-modal-product-label'
						id='stock-modal-product-select'
						label='Product'
						name='prod'
						autoWidth={true}
						margin='dense'
						value={formVal.prod}
						placeholder='Select a product'
						onChange={handleInputChange}
						sx={{ margin: '2em 0' }}
					>
						{prods.map((prod) => {
							return (
								// @ts-ignore -- necessary because value won't accept Products
								<MenuItem
									value={prod}
									key={prod.productId}
								>{prod.productName}</MenuItem>
							)
						})}
					</Select>
					{!(window.matchMedia("only screen and (max-width: 760px)").matches) ?
						<>
							<Box sx={{ margin: '2em 0' }}>
								<DesktopDatePicker
									label="Start Date"
									inputFormat="YYYY/MM"
									value={formVal.startDate}
									onChange={handleStartDateChange}
									renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
								/>
							</Box>
							<Box>
								<DesktopDatePicker
									label="End Date"
									inputFormat="YYYY/MM"
									value={formVal.endDate}
									onChange={handleEndDateChange}
									renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
								/>
							</Box>
						</> : // Screen is small, use mobile date picker
						<>
							<Box sx={{ margin: '2em 0' }}>
								<MobileDatePicker
									label="Start Date"
									inputFormat="YYYY/MM"
									value={formVal.startDate}
									onChange={handleStartDateChange}
									renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
								/>
							</Box>
							<Box sx={{ margin: '2em 0' }}>
								<MobileDatePicker
									label="End Date"
									inputFormat="YYYY/MM"
									value={formVal.endDate}
									onChange={handleEndDateChange}
									renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
								/>
							</Box>
						</>
					}
				</FormControl>
			</Box>
		</div>
	);
}

export function SalesGraph(props: { id: number, startDate: Moment, endDate: Moment }) {
	const [salesData, setSalesData] = React.useState([]);
	let prod: Product;

	useEffect(() => {
		fetch(`/prods/${props.id}`)
			.then(data => data.json() as unknown as Product)
			.then(data => prod = data)

		getSalesRange(props.startDate, props.endDate, props.id)
			.then(data => setSalesData(data))
	}, [props.startDate, props.endDate, props.id]);

	return (
		<Box sx={{ margin: '2.5 em 0' }}>
			<ResponsiveContainer width="55%" height={400}>
				<BarChart data={salesData}  >
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="salesDate" />
					<YAxis dataKey='numberSold' />
					<Tooltip />
					<Legend />
					<Bar fill="#3874cb" dataKey="numberSold" />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
}

const getSalesRange = async (start: Moment, end: Moment, id: number) => {
	return await fetch(`/sales/${start.year()}/${start.month()}/to/${end.year()}/${end.month()}/${id}/`)
		.then(data => data.json())
		.then(data => data as unknown as { numberSold: number, salesDate: string, salesId: number }[])
}