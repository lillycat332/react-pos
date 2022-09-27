import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { motion } from 'framer-motion';
import centeredBox from '../styles'
import modalStyle from '../styles';
import { User } from '../types';
import { sendObject } from '../lib';

const MotionBox = motion(Box)

const userDefaults: User = {
	userId: 0,
	userName: "",
	userPassword: "",
	userPrivilege: 3
}

export default function Onboard() {
	const [page, setPage] = React.useState('initial');
	const [formVal, setFormVal] = React.useState(userDefaults);

	const handleSubmit = (event: any) => {
		sendObject(formVal, "users");
		setFormVal(userDefaults)
			event.preventDefault();
			window.location.reload()
	};

	const handleSliderChange = (name: string) => (e: any, value: number) => {
		setFormVal({
			...formVal,
			[name]: value,
		});
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
			initial={{ x: "-300px", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
		>
			{page === 'initial' && (
				<Box>
					<Typography>
						Welcome! Let's get you set up.
					</Typography>
					<Button>
						Next ➡️
					</Button>
				</Box>
			)}

			{page === 'createUser' && (
				<Box>
					<Typography variant="h6">
						Let's create your admin account.
					</Typography>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						ADD NEW USER
					</Typography>
					<div>
						<form onSubmit={handleSubmit}>
							<TextField id="name-input"
								name="userName"
								label="Username"
								type="text" margin="dense"
								variant="outlined"
								value={formVal.userName}
								onChange={handleInputChange} />
							<TextField id="pw-input"
								name="userPassword"
								type='text'
								label="Password" margin="dense"
								variant="outlined"
								value={formVal.userPassword}
								onChange={handleInputChange} />
							<Typography>
								You can create users of lower privilige later.
							</Typography>
							<Button variant="contained" color="primary" type="submit">
								Submit
							</Button>
						</form>
					</div>
				</Box >
			)}
		</MotionBox>
	);
}

// function OnboardPart1() {
//
// }
