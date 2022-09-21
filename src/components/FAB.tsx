import * as React from "react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import '../index.css';

export default function AddToCartFAB() {
    return (
	<Box className="bottom-right">
	  <Fab color="primary" aria-label="add" className="bottom-right">
	    <AddShoppingCartIcon />
	  </Fab>
	</Box>
    )
}
