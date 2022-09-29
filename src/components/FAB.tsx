import * as React from "react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import '../index.css';

/**
 * A generalised floating action button.
 * Can be used for anything!
 * @param props.callback - a function to call when the FAB is clicked
 * @param props.icon - the icon to display on the FAB (or any other component)
 * @returns A react component that renders a floating action button
 */
export default function FAB(props: { callback: Function, icon: React.Component }) {
	return (
		<Box className="bottom-right">
			<Fab color="primary"
				aria-label="search-fab"
				className="bottom-right">
				<React.Component {...props.icon} />
			</Fab>
		</Box>
	)
}
