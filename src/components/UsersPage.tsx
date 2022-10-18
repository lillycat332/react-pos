import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { User } from '../types';
import { fetchUsers } from '../lib';
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
	userId: 0,
	userName: '',
	userPassword: '',
	userPrivilege: 1
}

const userCols = [{ name: 'cuserId', label: 'ID' },
{ name: 'cuserName', label: 'Name' },
{ name: 'cuserPrivilege', label: 'Privilege' }]

/**
 * The page which shows a list of users and options to manage them.
 * @param props.priv - Privilege level of the user. Used to determine what options are available. 
 */
export default function UsersPage(props: { priv: number }) {
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		event.stopPropagation()
		try {
			let response =
				await fetch(`${global.window.location.href}users`, {
					method: 'post',
					body: JSON.stringify(formVal)
				})
			if (response.status === 200) {
				setFormVal(userDefaults)
			} else if (response.status === 400) {
				const invalidData = 'Invalid user data was provided';
				throw invalidData
			} else {
				const unknownError = 'Unknown error';
				throw unknownError
			}
		} catch (err) {
			window.alert(`An error occured when I tried to add product.
Please ensure the server is running.
For advanced users: ${err}`)
		}
		fetchUsers(setUsers);
		handleClose();
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

	useEffect(() => {
		fetchUsers(setUsers);
	}, []);

	// If the user is not a supervisor or admin, show a blank page. 
	if (props.priv < 2) { console.error('privilege too low: ' + props.priv); return null }

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={modalStyle}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						ADD NEW USER
					</Typography>
					<div>
						<form onSubmit={handleSubmit}>
							<TextField id='name-input'
								name='userName'
								label='Username'
								type='text' margin='dense'
								variant='outlined'
								value={formVal.userName}
								onChange={handleInputChange} />
							<TextField id='pw-input'
								name='userPassword'
								type='text'
								label='Password' margin='dense'
								variant='outlined'
								value={formVal.userPassword}
								onChange={handleInputChange} />
							<div>
								Privilege
								<Slider
									value={formVal.userPrivilege}
									onChange={handleSliderChange('userPrivilege')}
									defaultValue={1}
									step={1}
									min={1}
									max={3}
									marks={[
										{
											value: 1,
											label: 'Basic',
										},
										{
											value: 2,
											label: 'Supervisor',
										},
										{
											value: 3,
											label: 'Admin',
										},
									]}
									valueLabelDisplay='off'
								/>
							</div>
							<Button variant='contained' color='primary' type='submit'>
								Submit
							</Button>
						</form>
					</div>
				</Box >
			</Modal >
			<MUIDataTable
				columns={userCols}
				data={Users}
				options={{
					onRowsDelete: (rowsDeleted: any) => {
						rowsDeleted.data.forEach((row: any) => {
							fetch(`/users/${Users[row.index].cuserId}`, { method: 'delete' });
						})
					}
				}}
				title='Users' />
			<Box onClick={handleOpen} sx={{ position: 'fixed', bottom: 0, right: 0, margin: '2%' }}>
				<Fab color='primary' aria-label='add-user'>
					<AddIcon />
				</Fab>
			</Box>
		</div >
	);
}