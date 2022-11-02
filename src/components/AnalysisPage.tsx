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

const productDefaults: Product = {
	productId: 0,
	productName: '',
	productPrice: 0
}

export default function AnalysisPage() {
	const [analysisData, setAnalysis] = useState<SaleAnalysisData | undefined>(undefined)
	const [loaded, setLoaded] = useState(false)
	const [prods, setProds] = useState<Product[]>([])
	const [currentProd, setProd] = useState<Product>(productDefaults)
	const [stockNum, setStockNum] = useState(0)
	const [leastSq, setLeastSq] = useState(undefined)

	const getAnalysisData = async () => {
		const top = await fetch('/prods/top')
			.then(data => data.json() as unknown as Product)
		const bottom = await fetch('/prods/bottom')
			.then(data => data.json() as unknown as Product)
		const percentDiff = 0//await fetch('/sales/percent-diff')
		// .then(data => data.json() as unknown as [number, boolean])
		await fetch('/prods/all')
			.then(data => data.json() as unknown as Product[])
			.then(data => setProds(data))
		setAnalysis({ topProd: top, bottomProd: bottom, percentDiff: [0, true] })
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
	}, [stockNum, currentProd])

	const getName = () => {
		if (currentProd != undefined) {
			return currentProd.productName
		}
		return ''
	}

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
				{/*<ListItem>
					<Typography>
						✨ Overall, you're {loaded ?
							`${analysisData.percentDiff[1] ? 'up' : 'down'} ${analysisData.percentDiff[0]} % `
							: 'loading...'} on sales this month.
						</Typography>
				</ListItem>*/}
			</List>

			<Typography variant='h6'>
				Advanced Sales Analysis:
			</Typography>
			<Box>
				{(stockNum && (leastSq != undefined)) ?
					<Typography variant='body1'>
						{leastSq === undefined || /* Make damn sure it's not somehow invalid */
							leastSq === null ||
							leastSq === '' ||
							leastSq === Infinity ||
							leastSq === -Infinity ||
							isNaN(leastSq) ?
							'Insufficient data points to predict sales, or the data failed to load.' : (
								leastSq != 0 ? `For ${currentProd?.productName} with \
								${stockNum} units in stock, based on previous data, it would \
								take ${Math.round(leastSq).toFixed(2)} days for the stock to sell out.` :
									'Please enter a number greater than 0.')}
					</Typography>
					: 'Enter a product to see sales predictions.'}
			</Box>
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
						value={currentProd}
						placeholder='Select a product'
						onChange={handleChange}
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
					<TextField
						value={stockNum}
						onChange={handleChangeNum}
						type='number'
						label='Intended restock amount'
						placeholder='Enter a number of units'
						sx={{ margin: '1rem 0' }}
					/>
				</FormControl>
			</Box>
		</Box >
	)
}