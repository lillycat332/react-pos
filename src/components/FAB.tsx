import * as React from "react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import '../index.css';

const SearchIcon = React.lazy(() => import ('@mui/icons-material/Search'))

export default function FAB(props: { callback: Function }) {
	return (
		<Box className="bottom-right">
			<Fab color="primary"
					 aria-label="search-fab"
					 className="bottom-right">
				<SearchIcon />
			</Fab>
		</Box>
	)
}
