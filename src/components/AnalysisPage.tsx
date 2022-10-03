import {
	List
	, ListItem
	, Typography
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Product } from '../types';

type SaleAnalysisData = {
	topProd: Product,
	bottomProd: Product,
}

export default function AnalysisPage() {
	const [analysisData, setAnalysis] = useState<SaleAnalysisData | undefined>(undefined)
	const [loaded, setLoaded] = useState(false)

	const getAnalysisData = async () => {
		const top = await fetch(`${window.location.href}prods/top`)
			.then(data => data.json() as unknown as Product)
		const bottom = await fetch(`${window.location.href}prods/bottom`)
			.then(data => data.json() as unknown as Product)
		setAnalysis({ topProd: top, bottomProd: bottom })
		console.error(top, bottom)
		setLoaded(true)
	}

	React.useEffect(() => {
		getAnalysisData()
	}, [])

	return (
		<div>
			<Typography variant='h6'>
				Based on my analysis:
			</Typography>
			<List>
				<ListItem>
					<Typography>
						✨ Consider: ordering more {loaded ? analysisData.topProd.productName : "loading..."} - It's your top product!
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						✨ It seems that {loaded ? analysisData.bottomProd.productName : "loading..."} is not selling well - your least selling product.
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						✨ It seems that [INSERT PRODUCT HERE] is selling well, especially on [INSERT DAY HERE].
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						✨ Overall, you're [up/down] [INSERT PERCENTAGE HERE] on sales this month.
					</Typography>
				</ListItem>
			</List>
		</div>
	)
}