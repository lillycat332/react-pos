import { DataArrayOutlined } from '@mui/icons-material';
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
	const [leastSq, setLeastSq] = useState(undefined)

	const getAnalysisData = async () => {
		const top = await fetch('/prods/top')
			.then(data => data.json() as unknown as Product)
		const bottom = await fetch('/prods/bottom')
			.then(data => data.json() as unknown as Product)
		const percentDiff = await fetch('/sales/percent-diff')
			.then(data => data.json() as unknown as [number, boolean])
		await fetch('/prods/all')
			.then(data => data.json() as unknown as Product[])
			.then(data => setProds(data))
		setAnalysis({ topProd: top, bottomProd: bottom, percentDiff: percentDiff })
		setLoaded(true)
	}

	const getLeastSq = async () => {
		await fetch(`/sales/predicted/${currentProd.productId}/${stockNum}`)
			.then(data => data.json() as unknown as number)
			.then(data => setLeastSq(data))
		console.log('type: ', typeof leastSq)
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
			(async () => await getLeastSq())()
		}
		console.log(leastSq)
	}, [stockNum, currentProd])

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
							`${analysisData.percentDiff[1] ? 'up' : 'down'} ${analysisData.percentDiff[0]} % `
							: 'loading...'} on sales this month.
					</Typography>
				</ListItem>
			</List>

			<Typography variant='h6'>
				Advanced Sales Analysis:
			</Typography>
			<Box>
				{(stockNum && (leastSq != undefined)) ?
					<Typography>
						{leastSq === undefined ||
							leastSq === null ||
							leastSq === '' ||
							leastSq === 0 ?
							'Insufficient data points to predict sales, or failed to load' :
							`Predicted sales for ${currentProd?.productName} with ${stockNum} in stock: ${leastSq}`
						}
					</Typography>
					: 'Enter a product to see sales predictions.'}
			</Box>
			<Box sx={{
				width: '50%'
			}}>
				<FormControl fullWidth>
					<TextField
						value={stockNum}
						onChange={handleChangeNum}
						type='number'
						label='Intended restock amount'
						placeholder='Enter a number of units'
						sx={{ margin: '1rem 0' }}
					/>
					<Select
						labelId='stock-modal-product-label'
						id='stock-modal-product-select'
						label='Product'
						name='prod'
						autoWidth={true}
						margin='dense'
						value={currentProd ? currentProd.productName : ''}
						placeholder='Select a product'
						onChange={handleChange}
					>
						{prods.map((prod) => {
							return (
								// @ts-ignore -- necessary because value won't accept ProductWithStock
								<MenuItem
									value={prod}
									key={prod.productId}
								>{prod.productName}</MenuItem>
							)
						})}
					</Select>
				</FormControl>
			</Box>
		</Box >
	)
}