import * as React from 'react';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { ResponsiveLine, Serie } from '@nivo/line';

// async function fetchSales(id: number, date: string) {
// 	const x = await fetch("http://localhost:3000/sales/2022-07/0"
//                       , { method: 'get' })
// 		.then((response: { text: () => any; }) => response.text())
// 		.then((data: any) => {
// 			return data;
// 		}
// 		)
// 		.catch((err: any) => {
// 			console.log(err);
// 		}
// 		);

// 	return x as number;
// }

async function getData(date: String, id: Number) {
    return JSON.stringify(
        await fetch(`http://localhost:3000/sales/${date}/${id}`
                    , { method: 'get' })
	.then((response: { text: () => any; }) => response.text())
	.then((data: any) => {return data}))
}

export default function SalePage() {
    const [date, setDate] = React.useState("2022-07");
    const [id, setId] = React.useState(0);
    
    return (
	<div>
	    <Typography variant="h4" component="div" gutterBottom>
		Sales
	    </Typography>
	    <SalesGraph date={date} id={id} />
	</div>
    );
}

export function SalesGraph(props: { id: number, date: string }) {
		const [salesData, setSalesData] = React.useState([]);
    useEffect(() => {
				const Data = getData(props.date, props.id)
						.catch((reason) => {
								window.alert
(`An error occured when I tried to get the sales data.
Please ensure the server is running
For advanced users: ${reason}`);
								return [{ 0: 0 }]})
						.then((data) => setSalesData(
                [JSON.stringify({ x: data, y: props.date, })]));
    }, [props.date]);

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
