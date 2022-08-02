import React from "react";
import "./editUser.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormGroup } from "@mui/material";

interface IProps {
  open: boolean;
  selectedUserDeatils: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

const EditUser: React.FC<IProps> = ({ open, setOpen, selectedUserDeatils }) => {
  // const handleEdit = async (id: string) => {
  //   let resp = await getItemById(`http://localhost:5000/api/users`, id);
  //   setOpen(false);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit user</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit user</DialogContentText>
          <TextField
            defaultValue={selectedUserDeatils.firstName}
            autoFocus
            margin="dense"
            id="fname"
            label="First name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            defaultValue={selectedUserDeatils.lastName}
            autoFocus
            margin="dense"
            id="lname"
            label="Last name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            defaultValue={selectedUserDeatils.userName}
            autoFocus
            margin="dense"
            id="uname"
            label="User name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            defaultValue={selectedUserDeatils.sessionTimeOut}
            autoFocus
            margin="dense"
            id="session"
            label="Session time out(Minutes)"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            defaultValue={selectedUserDeatils.createdAt}
            autoFocus
            margin="dense"
            id="creation"
            label="Creation date"
            type="text"
            fullWidth
            variant="standard"
          />
          <div>
            Permissions: <br />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={selectedUserDeatils.permissions.viewMovies}
                  />
                }
                label="View movies"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={
                      selectedUserDeatils.permissions.createMovies
                    }
                  />
                }
                label="Create movies"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={selectedUserDeatils.permissions.updateMovie}
                  />
                }
                label="Update movies"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={
                      selectedUserDeatils.permissions.deleteMovies
                    }
                  />
                }
                label="Delete movies"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={
                      selectedUserDeatils.permissions.viewSubscriptions
                    }
                  />
                }
                label="View subscriptions"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={
                      selectedUserDeatils.permissions.createSubscriptions
                    }
                  />
                }
                label="Create subscriptions"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={
                      selectedUserDeatils.permissions.updateSubscription
                    }
                  />
                }
                label="Update subscriptions"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={
                      selectedUserDeatils.permissions.deleteSubscriptions
                    }
                  />
                }
                label="Delete subscriptions"
              />
            </FormGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditUser;
