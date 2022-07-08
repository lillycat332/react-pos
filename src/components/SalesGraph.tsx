import * as React from 'react';
import Typography from '@mui/material/Typography';

async function a() {
	const x = await fetch("http://localhost:3000/sales/2022-07/0", { method: 'get' })
		.then((response: { text: () => any; }) => response.text())
		.then((data: any) => {
			return data;
		}
		)
		.catch((err: any) => {
			console.log(err);
		}
		);

	return x as number;
}

export default function SalesPage() {
	const [sales, setSales] = React.useState(0);

	React.useEffect(() => {
		a().then((data) => setSales(data)
		);
	}, [sales]);

	return (
		<Typography variant="h5" component="h2">
			{sales} water sold in this month
		</Typography>
	);
}