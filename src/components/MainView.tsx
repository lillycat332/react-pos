import { Suspense } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CartPage from './CartPage';
import { ProductDisplay, Product, Currency, GBP } from '../types';
import { fetchProds, makeSale, purge, getToken, setToken, fetchProdsWithStock } from '../lib';
import Login from './Login';

const drawerWidth = 240;
// Lazy load pages and icons for performance reasons
const AnalysisPage = React.lazy(() => import('./AnalysisPage'));
const HomePage = React.lazy(() => import('./HomePage'));
const ManagePage = React.lazy(() => import('./ManagePage'));
const ProductCard = React.lazy(() => import('./ProductCard'))
const ProductPage = React.lazy(() => import('./ProductPage'))
const SalesPage = React.lazy(() => import('./SalesPage'))
const StockPage = React.lazy(() => import('./StockPage'));
const UsersPage = React.lazy(() => import('./UsersPage'));
const HelpPage = React.lazy(() => import('./HelpPage'));

const AttachMoneyIcon = React.lazy(() => import('@mui/icons-material/AttachMoney'));
const ExitToAppIcon = React.lazy(() => import('@mui/icons-material/ExitToApp'));
const HomeIcon = React.lazy(() => import('@mui/icons-material/Home'));
const InsightsIcon = React.lazy(() => import('@mui/icons-material/Insights'))
const InventoryIcon = React.lazy(() => import('@mui/icons-material/Inventory'))
const MenuBook = React.lazy(() => import('@mui/icons-material/MenuBook'));
const PersonIcon = React.lazy(() => import('@mui/icons-material/Person'));
const SettingsIcon = React.lazy(() => import('@mui/icons-material/Settings'));
const ShoppingCartIcon = React.lazy(() => import('@mui/icons-material/ShoppingCart'));
const HelpCenterIcon = React.lazy(() => import('@mui/icons-material/HelpCenter'));

export default function MainView() {
	const token = getToken();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [Page, setPage] = React.useState('Home');

	// So, this used to have a setter, because I was going to support multiple currencies.
	// Then I changed... something, and it broke. Leaving it here in case I want to add it back.
	const [currencyType,] = React.useState({ kind: 'GBP', symbol: '£' } as GBP as Currency);
	const [prods, setProds] = React.useState([]);
	const [Cart, setCart] = React.useState([]);
	const [prodsInStock, setProdsInStock] = React.useState([])

	const addToCart = (prod: Product) => {
		setCart([...Cart, prod])
	}

	const cartChanger = (newProd: Product) => {
		addToCart(newProd)
	}

	const emptyCart = () => {
		Cart.forEach((prod) => { makeSale(prod.p) })
		setCart([])
	}

	// Eww
	const listItems = prods.map((product) => {
		const prod: ProductDisplay = {
			p: product,
			handler: cartChanger,
			currency: currencyType.symbol
		}

		console.log(prodsInStock)

		const productIndex = prodsInStock.findIndex(elem => {
			return elem.prod.productId === prod.p.productId
		});

		if (productIndex !== -1) {
			const prodStock = prodsInStock[productIndex].pInStock
			return prodStock > 0 && <ProductCard prod={prod} stateChanger={cartChanger} />
		}
		return null
	});

	// What do when the user toggles the drawer (only on mobile)
	const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

	// Fetch data on load
	React.useEffect(() => {
		fetchProds(setProds);
		fetchProdsWithStock(setProdsInStock);
	}, [])

	// Go to the login page if the user isn't logged in
	if (!token) {
		return <Login setToken={setToken} />
	}

	// The drawer is a list of links to different pages
	// This match expression decides which page to show
	// based on the contents of the state variable Page
	// (which is set by the drawer).
	function HandlePages() {
		switch (Page) {
			case 'Home':
				return (
					<Suspense>
						<HomePage listItems={listItems} />
					</Suspense>);
			case 'Users':
				return (
					<Suspense>
						<UsersPage priv={getToken().sessionUser.cuserPrivilege} />
					</Suspense>);
			case 'Manage':
				return (
					<Suspense>
						<ManagePage
							sesh={getToken()}
							purge={purge}
						/>
					</Suspense>
				);
			case 'Cart':
				return (
					<Suspense>
						<CartPage
							cart={Cart}
							currency={currencyType.symbol}
							emptier={emptyCart}
							canceller={() => setCart([])}
						/>
					</Suspense>
				);
			case 'Sales':
				return (
					<Suspense>
						<SalesPage />
					</Suspense>
				);
			case 'Stock':
				return (
					<Suspense>
						<StockPage />
					</Suspense>
				);
			case 'Analysis':
				return (
					<Suspense>
						<AnalysisPage />
					</Suspense>
				);
			case 'Products':
				return (
					<Suspense>
						<ProductPage setProds={setProds} />
					</Suspense>
				);
			case 'Help':
				return (
					<Suspense>
						<HelpPage />
					</Suspense>
				);
			default:
				return null;
		}
	}

	const drawer = (
		<div>
			<Toolbar />
			<List>
				{['Home', 'Cart'].map((text, index) => (
					<ListItem button key={text} onClick={() => setPage(text)}>
						<Suspense>
							<ListItemIcon>
								{index === 0 && <HomeIcon />}
								{index === 1 && <ShoppingCartIcon />}
							</ListItemIcon>
						</Suspense>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['Sales'
					, 'Analysis'
					, 'Stock'
					, 'Users'
					, 'Products'
					, 'Manage'
					, 'Help'
				].map((text: string, index) => (
					<ListItem button key={text} onClick={() => setPage(text)}>
						<Suspense>
							<ListItemIcon>
								{index === 0 && <AttachMoneyIcon />}
								{index === 1 && <InsightsIcon />}
								{index === 2 && <InventoryIcon />}
								{index === 3 && <PersonIcon />}
								{index === 4 && <MenuBook />}
								{index === 5 && <SettingsIcon />}
								{index === 6 && <HelpCenterIcon />}
							</ListItemIcon>
						</Suspense>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				<ListItem button onClick={() => { sessionStorage.clear(); global.window.location.reload() }}>
					<ListItemIcon>
						<ExitToAppIcon />
					</ListItemIcon>
					<ListItemText>Logout</ListItemText>
				</ListItem>
			</List>
		</div >
	);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						{Page}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'
			>
				<Drawer
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
			>
				<Toolbar />
				{/*<div className='bottom-right'>
					<FAB />
				</div>*/}
				<HandlePages />
			</Box>
		</Box>
	);
}
