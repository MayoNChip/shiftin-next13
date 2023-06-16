"use client";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
	Snackbar,
	ClickAwayListener,
	Select,
	FormControlLabel,
	Checkbox,
} from "@mui/material";
import { useSnackbar } from "@mui/base";
import { ChangeEvent, useState } from "react";
import React from "react";
// import { trpc } from "../utils/trpc";
// import MySnackbar from "./MySnackbar";
// import { TRPCClient } from "@trpc/client";
// import { QueryClient } from "@tanstack/react-query";
import { Employee } from "@prisma/client";

interface Props {
	isOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	createEmployee: (employee: {
		firstName: string;
		lastName: string;
		roleId: number;
	}) => void;
}

interface newUserType {
	firstName: string;
	lastName: string;
	roleId: number;
}

// interface CreateEmployee

function Modal({ isOpen, setIsModalOpen, createEmployee }: Props) {
	const [newUserDetails, setNewUserDetails] = React.useState<newUserType>({
		firstName: "",
		lastName: "",
		roleId: 1,
	});
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
	// const employeeMutation = trpc.employeeRouter.addEmployee.useMutation();

	// const { getRootProps, onClickAway } = useSnackbar({
	// 	autoHideDuration: 6000,
	// 	open: isSnackbarOpen,
	// });

	const handleFirstNameChange = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		console.log(e.target.value);
		setNewUserDetails({ ...newUserDetails, firstName: e.target.value });
	};
	const handleLastNameChange = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		console.log(e.target.value);
		setNewUserDetails({ ...newUserDetails, lastName: e.target.value });
	};

	const handleRoleChange = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		console.log(e.target.value);
		setNewUserDetails({ ...newUserDetails, roleId: parseInt(e.target.value) });
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};

	console.log(newUserDetails);

	const handleCreateEmployee = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		if (
			!newUserDetails.roleId ||
			!newUserDetails.firstName ||
			!newUserDetails.lastName
		)
			return;

		createEmployee({ ...newUserDetails });
		// employeeMutation.mutate(
		// 	{ ...newUserDetails },
		// 	{
		// 		onSuccess(input) {
		// 			trpc;
		// 		},
		// 	}
		// );
		// setIsSnackbarOpen(true);
		handleClose();
		// employeeMutation.isSuccess && handleClose();
	};

	return (
		<>
			<Dialog open={isOpen} onClose={handleClose}>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent>
					{/* <DialogContentText>First Name</DialogContentText> */}
					<TextField
						autoFocus
						margin="dense"
						id="firstName"
						label="First Name"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => handleFirstNameChange(e)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="lastName"
						label="Last Name"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => handleLastNameChange(e)}
					/>
					{/* <TextField
              autoFocus
              margin="dense"
              id="role"
              label="Role"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleRoleChange(e)}
            /> */}
					<FormControlLabel
						control={
							<Checkbox
								// checked={day.active}
								name="waiter"
								value="1"
								onChange={(e) => handleRoleChange(e)}
							/>
						}
						label="Waiter"
					/>
					{/* <ClickAwayListener onClickAway={onClickAway}>
						<Snackbar {...getRootProps()}>
							<div>Hello</div>
						</Snackbar>
					</ClickAwayListener> */}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleCreateEmployee}>Create</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default Modal;
