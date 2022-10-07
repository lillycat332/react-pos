import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function HelpPage() {
	return (
		<Box sx={{ width: '100%' }}>
			<Typography variant='h4' component='div' gutterBottom>
				Help
			</Typography>
			<Typography variant='h5' component='div' gutterBottom>
				How to use this app
			</Typography>
			<Typography variant='body1' gutterBottom component='div'>
				<ul>
					<li>
						Click on the 'Home'	tab to view the products. <br />You can add products to the cart by clicking on the 'Add to cart' button. <br />Once you have added products to the cart, you can view the cart by clicking on the 'Cart' tab.
					</li>
					<li>
						Click on the 'Cart' tab to view the cart. <br />Use the 'Make sale' button to empty the cart and make a sale. <br />The cart will be emptied and the sale will be recorded in the database. <br />You can view the sales data by clicking on the 'Sales' tab.
					</li>
					<li>
						Click on the 'Sales' tab to view sales data. <br />You can view the sales data for a specific date by clicking on the 'Select date' button. <br />You can also view the sales data for a specific product by clicking on the 'Select product' button.<br />
					</li>
					<li>
						Click on the 'Analysis' tab to view sales data analysis. <br />Here, the system will make some suggestions on how to improve sales and efficiency, based on the sales data.<br />
					</li>
					<li>
						Click on the 'Stock' tab to view the stock data. <br />You can edit stock data for a specific product by clicking on the pencil icon.<br />
					</li>
					<li>
						Click on the 'Users' tab to view user data. <br />Here, you can add, remove and edit users.<br />
					</li>
					<li>
						Click on the 'Products' tab to view the products. <br />Here, you can add new products to the database, or edit existing products. <br />You can also delete products from the database.<br />
					</li>
					<li>
						Click on the 'Manage' tab to view the management page. <br />Here, you can reset
						the database to its default state. <br />This will delete all data from the database, allowing you to start from scratch.<br />
					</li>
					<li>
						Click on the 'Help' tab to view this page.<br />
					</li>
					<li>
						Click on the 'Logout' tab to logout of the system.<br />
					</li>
				</ul>
			</Typography>
			<Typography variant='h5' component='div' gutterBottom>
				How to use the cart
			</Typography>
			<Typography variant='body1' gutterBottom component='div'>
				<ul>
					<li>Click on the 'Add to cart' button to add a product to the cart</li>
					<li>Click on the 'Make sale' button to make a sale</li>
				</ul>
			</Typography>
		</Box>
	);
}