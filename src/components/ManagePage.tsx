import { Suspense } from 'react';
import * as React from 'react';
import { SessionToken } from '../types';
const Button = React.lazy(() => import('@mui/material/Button'));

const ManagePage = (props: { sesh: SessionToken, purge: () => void }) => {
	if (props.sesh.sessionUser.cuserPrivilege < 2) { return null }
	return (
		<div>
			<Suspense>
				<Button onClick={props.purge} variant="contained" color="warning" style={{ marginTop: "2%" }}>
					Purge (FULLY WIPE) database
				</Button>
			</Suspense>
		</div>
	)
}

export default ManagePage
