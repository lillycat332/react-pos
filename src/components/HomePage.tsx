import * as React from 'react';
import Masonry from '@mui/lab/Masonry';

export default function HomePage(props: {listItems: JSX.Element[]}) {
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
