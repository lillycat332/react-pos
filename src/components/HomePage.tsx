import * as React from 'react';
import Masonry from '@mui/lab/Masonry';

/**
 * The home page of the application. Displays a grid of all the available products.
 * @param props.listItems - an array of react components to display. Typically, these will be cards.
 */
export default function HomePage(props: { listItems: JSX.Element[] }) {
	return (
		<Masonry
			columns={4}
			spacing={2}
			defaultHeight={450}
			defaultColumns={4}
			defaultSpacing={1}
		>{props.listItems}
		</Masonry>
	);
}
