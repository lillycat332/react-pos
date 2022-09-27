import { LoginRequest } from '../types';
import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { loginUser } from '../lib';
import centeredBox from '../styles'

interface LoginProps {
	setToken: Function
}

export default function Login(props: { setToken: Function }) {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const req: LoginRequest = { requestName: username, requestPass: password }
		
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const token = await loginUser(req);
		props.setToken(token);
		window.location.reload()
	}

	return (
		<Box sx={centeredBox}
		>
			<Box sx={{ margin: '5%' }}>
				<Typography variant="h5"
					sx={{ textAlign: 'center' }}>Welcome!</Typography>
				<Typography variant="h6"
					sx={{ textAlign: 'center' }}> Please Log In.</Typography>
			</Box>

			<Box>
				<form onSubmit={handleSubmit}>
					<label>
						<Typography variant="body1">Username</Typography>
						<TextField sx={{ margin: '5%' }}
							type="text"
							onChange={e => setUserName(e.target.value)} />
					</label>
					<label>
						<Typography>Password</Typography>
						<TextField sx={{ margin: '5%' }}
							type="password"
							onChange={e => setPassword(e.target.value)} />
					</label>
					<div>
						<Button variant="contained"
							color="primary"
							type="submit">Submit</Button>
					</div>
				</form>
			</Box>
		</Box>
	)
}
