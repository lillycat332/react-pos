import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { User, Product } from '../types';
import { sendObject, fetchProds } from '../lib';
import MUIDataTable from 'mui-datatables';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const modalStyle = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const userDefaults: User = {
	user_id: 0,
	user_name: "",
	user_password: "",
	user_privilege: 0
}

const userCols = [{ name: 'cuser_id', label: 'ID' },
{ name: 'cuser_name', label: 'Name' },
{ name: 'cuser_privilege', label: 'Privilege' }]

// The page which shows a list of users and options to manage them.
export default function UsersPage() {
	const handleSubmit = (event: any) => {
			if (submit == true) { return 0 }
			sendObject(formVal, "users");
		setFormVal(userDefaults)
		event.preventDefault();
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

	const [open, setOpen] = React.useState(false);
	const [formVal, setFormVal] = React.useState(userDefaults);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [Users, setUsers] = useState([]);
	const [submit, setSubmit] = useState(false);
		
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(`${global.window.location.href}users/all`,
					{ method: 'get' });
				const jsoned = await response.json();
				console.log(jsoned);
				setUsers(jsoned);
			}
			catch (err) {
				window.alert(`An error occured when I tried to get users.
Please ensure the server is running.
For advanced users: ${err}`)
			}
		}
		fetchUsers();
	}, []);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						ADD NEW USER
					</Typography>
					<div>
						<form onSubmit={(e) => {setSubmit(true); handleSubmit(e); setSubmit(false)}}>
							<TextField id="name-input"
								name="user_name"
								label="Username"
								type="text" margin="dense"
								variant="outlined"
								value={formVal.user_name}
								onChange={handleInputChange} />
							<TextField id="pw-input"
								name="user_password"
								type='text'
								label="Password" margin="dense"
								variant="outlined"
								value={formVal.user_password}
								onChange={handleInputChange} />
							<div>
								Privilege
								<Slider
									value={formVal.user_privilege}
									onChange={handleSliderChange("user_privilege")}
									defaultValue={1}
									step={1}
									min={1}
									max={3}
									marks={[
										{
											value: 1,
											label: "Basic",
										},
										{
											value: 2,
											label: "Supervisor",
										},
										{
											value: 3,
											label: "Admin",
										},
									]}
									valueLabelDisplay="off"
								/>
							</div>
							<Button variant="contained" color="primary" type="submit">
								Submit
							</Button>
						</form>
					</div>
				</Box >
			</Modal >
			<MUIDataTable columns={userCols} data={Users} title="Users" />
			<Box className="bottom-right" onClick={handleOpen}>
				<Fab color="primary" aria-label="add-user">
					<AddIcon/>
				</Fab>
			</Box>
		</div >
	);
}

async function sendUser(user: User) {
	const response = await fetch(`${global.window.location.href}users`,
		{
			method: 'post',
			body: JSON.stringify(user)
		})
	return response
}
