import * as React from 'react';
import { SessionToken } from '../types';
import Button from '@mui/material/Button';

const ManagePage = (props: { sesh: SessionToken, purge: () => void }) => {
	if (props.sesh.sessionUser.cuserPrivilege < 2) { return null }
	return (
		<div>
			<Button
				onClick={props.purge}
				variant="contained"
				color="error"
				sx={{ m: '2%' }}
			>
				Wipe database (factory reset)
			</Button>
		</div>
	)
}

export default ManagePage
