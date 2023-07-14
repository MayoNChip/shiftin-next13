"use client";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
//   Button,
//   Snackbar,
//   ClickAwayListener,
//   Select,
//   FormControlLabel,
//   Checkbox,
// } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSnackbar } from "@mui/base";
import { ChangeEvent, FormEvent, useState } from "react";
import React from "react";
// import { trpc } from "../utils/trpc";
// import MySnackbar from "./MySnackbar";
// import { TRPCClient } from "@trpc/client";
// import { QueryClient } from "@tanstack/react-query";
import { Employee, ShiftType } from "@prisma/client";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

interface Props {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createEmployee: (employee: {
    firstName: string;
    lastName: string;
    canWorkShiftTypes: number;
  }) => void;
  shiftTypes: ShiftType[];
}

interface newUserType {
  firstName: string;
  lastName: string;
  canWorkShiftTypes: number;
}

// interface CreateEmployee

function Modal({ isOpen, setIsModalOpen, createEmployee, shiftTypes }: Props) {
  const [newUserDetails, setNewUserDetails] = React.useState<newUserType>({
    firstName: "",
    lastName: "",
    canWorkShiftTypes: 1,
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

  const handleRoleChange = (e: FormEvent<HTMLButtonElement>) => {
    // console.log(e.target.);
    setNewUserDetails({
      ...newUserDetails,
      canWorkShiftTypes: 1,
    });
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  console.log(newUserDetails);

  const handleCreateEmployee = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      !newUserDetails.canWorkShiftTypes ||
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

  // return (
  //   <>
  //     <Dialog open={isOpen} onClose={handleClose}>
  //       <DialogTitle>Subscribe</DialogTitle>
  //       <DialogContent>
  //         {/* <DialogContentText>First Name</DialogContentText> */}
  //         <TextField
  //           autoFocus
  //           margin="dense"
  //           id="firstName"
  //           label="First Name"
  //           type="text"
  //           fullWidth
  //           variant="standard"
  //           onChange={(e) => handleFirstNameChange(e)}
  //         />
  //         <TextField
  //           margin="dense"
  //           id="lastName"
  //           label="Last Name"
  //           type="text"
  //           fullWidth
  //           variant="standard"
  //           onChange={(e) => handleLastNameChange(e)}
  //         />
  //         {/* <TextField
  //             autoFocus
  //             margin="dense"
  //             id="role"
  //             label="Role"
  //             type="text"
  //             fullWidth
  //             variant="standard"
  //             onChange={(e) => handleRoleChange(e)}
  //           /> */}
  //         <FormControlLabel
  //           control={
  //             <Checkbox
  //               // checked={day.active}
  //               name="waiter"
  //               value="1"
  //               onChange={(e) => handleRoleChange(e)}
  //             />
  //           }
  //           label="Waiter"
  //         />
  //         {/* <ClickAwayListener onClickAway={onClickAway}>
  // 					<Snackbar {...getRootProps()}>
  // 						<div>Hello</div>
  // 					</Snackbar>
  // 				</ClickAwayListener> */}
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleClose}>Cancel</Button>
  //         <Button onClick={handleCreateEmployee}>Create</Button>
  //       </DialogActions>
  //     </Dialog>
  //   </>
  // );
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Employees</DialogTitle>
            <DialogDescription>
              {/* <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleFirstNameChange(e)}
          /> */}
              <label>Employee First Name</label>
              <Input
                autoFocus
                type="text"
                onChange={(e) => handleFirstNameChange(e)}
              />
              <label>Employee Last Name</label>
              <Input
                autoFocus
                type="text"
                onChange={(e) => handleLastNameChange(e)}
              />
              <div className="flex items-center w-full justify-center py-4 ">
                {shiftTypes &&
                  shiftTypes.map((shiftType) => {
                    return (
                      <div
                        className="flex w-full items-center justify-center gap-2 "
                        key={shiftType.id}
                      >
                        <Checkbox
                          id={`employeeCanWorkShiftType${shiftType.id}`}
                          value={shiftType.id}
                          // onChange={(e)=> handleRoleChange(e)}
                          // onCheckedChange={(e)=> handleRoleChange(e)}
                        />
                        <label
                          htmlFor={`employeeCanWorkShiftType${shiftType.id}`}
                        >
                          {shiftType.shiftType}
                        </label>
                      </div>
                    );
                  })}
              </div>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCreateEmployee}>Create</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Modal;
