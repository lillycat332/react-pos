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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AddToCartFAB from './FAB';
import Masonry from '@mui/lab/Masonry';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const drawerWidth = 240;
const ProductCard = React.lazy(() => import('./ProductCard'))

export default function MainView(props: { window: any; }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [Page, setPage] = React.useState("Home");
  const [Users, setUsers] = React.useState([]);
  const [currencyType, setCurrencyType] = React.useState('GBP');
  //const [Products, setProducts] = React.useState([]);
  const Products = [['Water', 1.0], ['Cola', 2.0], ['Lemonade', 2.0], ['Orange Juice', 1.5]];
  const [Cart, setCart] = React.useState([]);

  const listItems = Products.map((Product) =>
      <ProductCard name      ={Product[0] as string}
		   price     ={Product[1] as number}
		   imagePath ="logo512.png"
		   currency  ={currencyTypeCheck()}
		   addToCart ={() => {console.log("helloworld")}}
      />
  );

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  React.useEffect(() => {
    fetch(`${global.window.location.href}prods/all`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          var tmp = []
          for (var i in result)
            tmp.push(result[i]);
          var r = Object.entries(tmp);
          console.log(r);
          setUsers(r);
        });
  }, [])
		
    function HandlePages() {
	// Lazy load this stuff - saves on bundle size
	const CartPage = React.lazy( () => import('./CartPage'))
	const SalesPage = React.lazy(() => import('./SalesPage'))
	const UsersPage = React.lazy(() => import('./UsersPage'))
	
	const ManagePage = () => {
	    return (
		<FormControl size='small'>
		  <InputLabel id="currency-select-label">Currency Type</InputLabel>
		  <Select
		      labelId="currency-select-label"
		      id="currency-select"
		      value={currencyType}
		      label="Currency Type"
		      onChange={handleChangeCurrency}
		  >
		    <MenuItem value={"GBP"}>British Pounds</MenuItem>
		    <MenuItem value={"USD"}>US Dollars</MenuItem>
		    <MenuItem value={"EUR"}>Euros</MenuItem>
		  </Select>
		</FormControl>
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
		return <Suspense><CartPage cart={Cart} currency={currencyTypeCheck()} /></Suspense>;
	    case "Sales":
		return <Suspense><SalesPage /></Suspense>;
	    default:
		return <Suspense><HomePage /></Suspense>;
	}
    }
    
  function currencyTypeCheck() {
      if (currencyType === 'USD') {
	  return '$';
      } else if (currencyType === 'EUR') {
	  return '€';
      } else if (currencyType === 'GBP') {
	  return '£';
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
      >
        {listItems}
      </Masonry>
    )
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
            <ListItemIcon>
              {index === 0 && <HomeIcon />}
              {index === 1 && <ShoppingCartIcon />}
              {index === 2 && <AttachMoneyIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Users', 'Products', 'Manage', 'Login', 'Logout'].map((text: string, index) => (
          <ListItem button key={text} onClick={() => setPage(text)}>
            <ListItemIcon>
              {index === 0 && <PersonIcon />}
              {index === 1 && <Inventory2Icon />}
              {index === 2 && <SettingsIcon />}
              {index === 3 && <LoginIcon />}
              {index === 4 && <ExitToAppIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
        { }
        <Drawer
          container={container}
          variant="permanent"
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
        <div className="bottom-right">
          <AddToCartFAB />
        </div>
        <HandlePages />
      </Box>
    </Box>
  );
}
