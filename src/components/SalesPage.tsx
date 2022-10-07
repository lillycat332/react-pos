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
	date: Date
}

const defaultSales: salesData = {
	prod: {
		productId: 0,
		productName: '',
		productPrice: 0
	},
	date: new Date()
}

async function getSalesData(date: { y: String, m: String }, id: Number) {
	await fetch(`${global.window.location.href}sales/${date.y}/${date.m}/${id}`
		, { method: 'get' })
		.then((data: any) => { return data })
}

export default function SalesPage() {
	const [formVal, setFormVal] = React.useState(defaultSales);

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormVal({
			...formVal,
			[name]: value,
		});
	};

	return (
		<div>
			<Typography variant='h4' component='div' gutterBottom>
				Sales
			</Typography>
			{/* <SalesGraph date={formVal.date} id={formVal.prod.productId} /> */}
			<Select
				labelId='sales-product-label'
				id='sales-product-select'
				label='Product'
				name='prod'
				autoWidth={true}
				margin='dense'
				value={formVal.prod}
				onChange={handleInputChange}
			>
			</Select>
		</div>
	);
}

export function SalesGraph(props: { id: number, date: Date }) {
	const [salesData, setSalesData] = React.useState([]);
	useEffect(() => {
		getSalesData({ m: String(props.date.getMonth), y: String(props.date.getFullYear) }, props.id)
			.catch((reason) => {
				window.alert
					(`An error occured when I tried to get the sales data.
Please ensure the server is running
For advanced users: ${reason}`);
				return [{ 0: 0 }]
			})
			.then((data) => setSalesData(
				[{ x: data, y: props.date, }]));
	}, [props.date, props.id]);

	return (
		<Box>
			{/* <ResponsiveLine
				data={salesData}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				xScale={{ type: 'point' }}
				yScale={{
					type: 'linear',
					min: 'auto',
					max: 'auto',
					stacked: true,
					reverse: false
				}}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'Date',
					legendOffset: 36,
					legendPosition: 'middle'
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'Sales',
					legendOffset: -40,
					legendPosition: 'middle'
				}} /> */}
			<ResponsiveContainer width='100%' height='100%'>
				<BarChart
					width={500}
					height={300}
					data={salesData}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey='pv' fill='#8884d8' />
					<Bar dataKey='uv' fill='#82ca9d' />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
}
