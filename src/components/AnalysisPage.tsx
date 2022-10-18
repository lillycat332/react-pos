import {
	Box,
	FormControl,
	InputLabel,
	List
	, ListItem
	, MenuItem, Select, TextField, Typography
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Product } from '../types';

type SaleAnalysisData = {
	topProd: Product,
	bottomProd: Product,
	percentDiff: [number, boolean]
}

export default function AnalysisPage() {
	const [analysisData, setAnalysis] = useState<SaleAnalysisData | undefined>(undefined)
	const [loaded, setLoaded] = useState(false)
	const [prods, setProds] = useState<Product[]>([])
	const [currentProd, setProd] = useState<Product | undefined>(undefined)
	const [stockNum, setStockNum] = useState(0)

	const getAnalysisData = async () => {
		const top = await fetch('/prods/top')
			.then(data => data.json() as unknown as Product)
		const bottom = await fetch('/prods/bottom')
			.then(data => data.json() as unknown as Product)
		const percentDiff = await fetch('/sales/percent - diff')
			.then(data => data.json() as unknown as [number, boolean])
		const products = await fetch('/prods/all')
			.then(data => data.json() as unknown as Product[])
		console.log(products)
		setAnalysis({ topProd: top, bottomProd: bottom, percentDiff: percentDiff })
		setProds(products)
		console.error(top, bottom)
		setLoaded(true)
	}

	const handleChange = (e: any) => {
		setProd(e.target.value)
	}

	const handleChangeNum = (e: any) => {
		setStockNum(e.target.value)
	}

	React.useEffect(() => {
		getAnalysisData()
		if (stockNum != 0 && currentProd != undefined) {
			fetch(`/analysis/${currentProd.productId} / ${stockNum}', {
				method: 'post'
			})
}
	}, [])

return (
	<Box>
		<Typography variant='h6'>
			Basic Information:
		</Typography>
		<List>
			<ListItem>
				<Typography>
					✨ Consider: ordering more {loaded ? analysisData.topProd.productName : 'loading...'} - It's your top product!
				</Typography>
			</ListItem>
			<ListItem>
				<Typography>
					✨ It seems that {loaded ? analysisData.bottomProd.productName : 'loading...'} is not selling well - your least selling product.
				</Typography>
			</ListItem>
			<ListItem>
				<Typography>
					✨ Overall, you're {loaded ?
						`${ analysisData.percentDiff[1] ? 'up' : 'down' } ${ analysisData.percentDiff[0] } % `
						: 'loading...'} on sales this month.
				</Typography>
			</ListItem>
		</List>

		<Typography variant='h6'>
			Advanced Sales Analysis:
		</Typography>
		<Box sx={{
			width: '50%'
		}}>
			<FormControl fullWidth>
				<Select
					value={currentProd}
					onChange={handleChange}
					labelId="product-select-label"
					id="product-select"
					label='Product'
					sx={{ margin: '1rem 0' }}
				>
					{prods.map((prod) => {
						// @ts-ignore -- MUI doesn't like the value prop
						return <MenuItem value={prod}>{prod.productName}</MenuItem>
					})}
				</Select>
				<TextField
					value={stockNum}
					onChange={handleChangeNum}
					type='number'
					label='Intended restock amount'
					sx={{ margin: '1rem 0' }}
				/>
			</FormControl>
		</Box>
	</Box >
)
}