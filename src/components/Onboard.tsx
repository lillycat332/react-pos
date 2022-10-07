import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { motion } from 'framer-motion';
import centeredBox from '../styles'
import { User } from '../types';
import { sendObject } from '../lib';
import Tilt from 'react-parallax-tilt';

const MotionBox = motion(Box)
const MotionButton = motion(Button)
const userDefaults: User = {
	userId: 0,
	userName: '',
	userPassword: '',
	userPrivilege: 3
}

export default function Onboard() {
	const [page, setPage] = React.useState('initial');
	const [formVal, setFormVal] = React.useState(userDefaults);

	const handleSubmit = (event: any) => {
		sendObject(formVal, 'users');
		setFormVal(userDefaults)
		event.preventDefault();
		setPage('done')
	};

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormVal({
			...formVal,
			[name]: value,
		});
	};

	return (
		<MotionBox
			sx={centeredBox}
			initial={{ x: '-300px', opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 100 }}
		>
			{page === 'initial' && (
				<Box>
					<Typography id='welcome-text' variant='h4'>
						Welcome. Let's get you set up.
					</Typography>
					<MotionButton
						onClick={_ => setPage('createUser')}
						initial={{ scale: 1 }}
						whileHover={{ scale: 1.25 }}
					>
						Next ➡️
					</MotionButton>
				</Box>
			)}

			{page === 'createUser' && (
				<MotionBox
					initial={{ x: '-300px', opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ type: 'spring', stiffness: 100 }}>
					<Typography id='add-admin-title' variant='h6'>
						Let's create your admin account.
					</Typography>
					<div>
						<form onSubmit={handleSubmit}>
							<TextField id='name-input'
								name='userName'
								label='Username'
								sx={{ margin: '2%' }}
								type='text' margin='dense'
								variant='outlined'
								value={formVal.userName}
								onChange={handleInputChange} />
							<TextField id='pw-input'
								sx={{ margin: '2%' }}
								name='userPassword'
								type='text'
								label='Password' margin='dense'
								variant='outlined'
								value={formVal.userPassword}
								onChange={handleInputChange} />
							<Typography sx={{ margin: '2%' }}>
								You can create users of lower privilege later. <br />
								Make sure you remember your password!
							</Typography>
							<Tilt>
								<MotionButton
									variant='contained'
									color='primary'
									type='submit'
									initial={{ scale: 1 }}
									whileHover={{ scale: 1.25 }}
								>
									Submit
								</MotionButton>
							</Tilt>
						</form>
					</div>
				</MotionBox >
			)}

			{page === 'done' && (
				<MotionBox
					initial={{ x: '-300px', opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ type: 'spring', stiffness: 100 }}
				>
					<Typography id='add-admin-title' variant='h6'>
						And that's everything you need to get started!
					</Typography>
					<MotionButton
						onClick={_ => window.location.reload()}
						initial={{ scale: 1 }}
						whileHover={{ scale: 1.25 }}
					>
						Proceed to login ➡️
					</MotionButton>
				</MotionBox>
			)}
		</MotionBox>
	);
}

// function OnboardPart1() {
//
// }
