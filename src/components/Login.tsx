import { LoginRequest } from '../types';
import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { loginUser } from '../lib';
import centeredBox from '../styles'
import Onboard from './Onboard';

// stupid hack because json is dumb
interface isOk {
	ok: boolean
}

/**
 * Send a login request to the server and handle the response using the given callback.
 * @param callback - a function that takes a boolean, true if the login was successful, false otherwise
 * @returns - void promise.
 */
const getShouldOnboard = async (callback: Function) => {
	try {
		const response = await fetch(`${window.location.href}onboard/`,
			{ method: 'get' })
			.then(data => data.json() as unknown as isOk)
			.then(data => data.ok)
		callback(response)
	}
	catch (err) {
		// Yeah, if even this fails, we're in trouble. Bail.
		window.alert('An error occurred. Try restarting the server.');
	}
}

/**
 * The login page.
 * @param props.setToken - a callback function that takes a SessionToken.
 */
export default function Login(props: { setToken: Function }) {
	const [userOk, setUserOk] = useState(false);

	// IIFE to check if the user is onboarded, and set the state accordingly.
	// Hack to work around weird infinite loop behaviour.
	(async () => { await getShouldOnboard((x: boolean) => { setUserOk(x) }) })()

	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const req: LoginRequest = { requestName: username, requestPass: password }
	// set the token then reload the page, sending the user back to the home page
	// as the token is now set.
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const token = await loginUser(req);
		props.setToken(token);
		window.location.reload()
	}

	return (
		<Box>
			{userOk && (
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
			)}
			{!userOk && (
				<Onboard />
			)}
		</Box>
	);
}
