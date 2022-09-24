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
import Masonry from '@mui/lab/Masonry';
import CartPage from './CartPage';
import { ProductDisplay, Product, Currency, GBP } from '../types';
import { fetchProds, makeSale, purge } from '../lib';

const drawerWidth = 240;
// Lazy load all the pages and icons for performance reasons
const ProductCard = React.lazy(() => import('./ProductCard'))
const SalesPage = React.lazy(() => import('./SalesPage'))
const UsersPage = React.lazy(() => import('./UsersPage'))
const ProductPage = React.lazy(() => import('./ProductPage'))
const Button = React.lazy(() => import('@mui/material/Button'));

const ShoppingCartIcon = React.lazy(() => import('@mui/icons-material/ShoppingCart'));
const HomeIcon = React.lazy(() => import('@mui/icons-material/Home'));
const AttachMoneyIcon = React.lazy(() => import('@mui/icons-material/AttachMoney'));
const PersonIcon = React.lazy(() => import('@mui/icons-material/Person'));
const SettingsIcon = React.lazy(() => import('@mui/icons-material/Settings'));
const LoginIcon = React.lazy(() => import('@mui/icons-material/Login'));
const ExitToAppIcon = React.lazy(() => import('@mui/icons-material/ExitToApp'));
const Inventory2Icon = React.lazy(() => import('@mui/icons-material/Inventory2'));

export default function MainView() {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [Page, setPage] = React.useState("Home");
	const [Users, setUsers] = React.useState([]);
	const [currencyType, setCurrencyType] = React.useState({ kind: 'GBP', symbol: '£' } as GBP as Currency);
	const [prods, setProds] = React.useState([]);
	const [Cart, setCart] = React.useState([]);

	const addToCart = (prod: Product) => {
		setCart([...Cart, prod])
		console.log(Cart);
	}

	const cartChanger = (newProd: Product) => {
		addToCart(newProd)
	}

		const emptyCart = () => {
				Cart.map((prod) => { makeSale(prod.p) })
				setCart([])
		}

	const listItems = prods.map((product) => {
		const prod: ProductDisplay = {
			p: product,
			handler: cartChanger,
			currency: currencyType.symbol
		}
		return (<ProductCard prod={prod} stateChanger={cartChanger} />)
	});

	console.log(listItems);
		
	const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

	React.useEffect(() => {
		fetchProds(setProds);
	}, [])

	function HandlePages() {
		const ManagePage = () => {
			return (
				<div>
					<Button onClick={purge} variant="contained" color="warning" style={{ marginTop: "2%" }}>
						Purge (FULLY WIPE) database
					</Button>
				</div>
			)
		}

		switch (Page) {
			case "Home":
				return <Suspense><HomePage /></Suspense>;
			case "Users":
				return <Suspense><UsersPage /></Suspense>;
			case "Manage":
				return <Suspense><ManagePage /></Suspense>;
			case "Cart":
				return <Suspense><CartPage cart={Cart} currency={currencyType.symbol} emptier={emptyCart} /></Suspense>;
			case "Sales":
				return <Suspense><SalesPage /></Suspense>;
			case "Products":
				return <Suspense><ProductPage /></Suspense>;
			default:
				return <Suspense><HomePage /></Suspense>;
		}
	}

	function HomePage() {
		return (
			<Masonry
				columns={4}
				spacing={2}
				defaultHeight={450}
				defaultColumns={4}
				defaultSpacing={1}
			>{listItems}
			</Masonry>
		);
	}

	function handleChangeCurrency(event: any) {
		setCurrencyType(event.target.value);
	}

	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				{['Home', 'Cart', 'Sales'].map((text, index) => (
					<ListItem button key={text} onClick={() => setPage(text)}>
						<Suspense>
							<ListItemIcon>
								{index === 0 && <HomeIcon />}
								{index === 1 && <ShoppingCartIcon />}
								{index === 2 && <AttachMoneyIcon />}
							</ListItemIcon>
						</Suspense>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['Users', 'Products', 'Manage', 'Login', 'Logout'].map((text: string, index) => (
					<ListItem button key={text} onClick={() => setPage(text)}>
						<Suspense>
							<ListItemIcon>
								{index === 0 && <PersonIcon />}
								{index === 1 && <Inventory2Icon />}
								{index === 2 && <SettingsIcon />}
								{index === 3 && <LoginIcon />}
								{index === 4 && <ExitToAppIcon />}
							</ListItemIcon>
						</Suspense>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Triangle
					</Typography>
				</Toolbar>
			</AppBar>
			<Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
				{}
				<Drawer
					variant="temporary"
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
					variant="permanent"
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
				component="main"
				sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
			>
				<Toolbar />
				{/*<div className="bottom-right">
					<FAB />
				</div>*/}
				<HandlePages />
			</Box>
		</Box>
	);
}
