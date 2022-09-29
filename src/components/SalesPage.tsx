import * as React from 'react';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { ResponsiveLine } from '@nivo/line';

/**
 * 
 * @param date - an object, like {y: 2022, m: 5}
 * @param id - product id to fetch. number.
 * @returns json from the server
 */
async function getData(date: { y: String, m: String }, id: Number) {
	return JSON.stringify(
		await fetch(`${global.window.location.href}sales/${date.y}/${date.m}/${id}`
			, { method: 'get' })
			.then((response: { text: () => any; }) => response.text())
			.then((data: any) => { return data }))
}

export default function SalePage() {
	const [date, setDate] = React.useState({ y: "2022", m: "09" });
	const [id, setId] = React.useState(1);

	return (
		<div>
			<Typography variant="h4" component="div" gutterBottom>
				Sales
			</Typography>
			<SalesGraph date={date} id={id} />
		</div>
	);
}

export function SalesGraph(props: { id: number, date: { y: string, m: string } }) {
	const [salesData, setSalesData] = React.useState([]);
	useEffect(() => {
		getData(props.date, props.id)
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
		<ResponsiveLine
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
			}} />
	);
}
