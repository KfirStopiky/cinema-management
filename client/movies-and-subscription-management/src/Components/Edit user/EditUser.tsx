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
import { updateItem } from "../../Services/requests";

interface IProps {
  open: boolean;
  selectedUserDeatils: any;
  setTelectedUserDeatils: React.Dispatch<React.SetStateAction<{}>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

const EditUser: React.FC<IProps> = ({
  open,
  setOpen,
  selectedUserDeatils,
  setTelectedUserDeatils,
}) => {
  const handleEdit = async (id: string, userObj: object) => {
    let resp = await updateItem(`http://localhost:5000/api/users`, id, userObj);
    if (resp.data.error === true) alert(resp.data.message);
    alert(resp.data.message);
    setOpen(false);
  };

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
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setTelectedUserDeatils({
                ...selectedUserDeatils,
                firstName: e.target.value,
              })
            }
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
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setTelectedUserDeatils({
                ...selectedUserDeatils,
                lastName: e.target.value,
              })
            }
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
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setTelectedUserDeatils({
                ...selectedUserDeatils,
                userName: e.target.value,
              })
            }
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
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setTelectedUserDeatils({
                ...selectedUserDeatils,
                sessionTimeOut: e.target.value,
              })
            }
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
          <Button
            onClick={() =>
              handleEdit(selectedUserDeatils._id, { user: selectedUserDeatils })
            }
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditUser;
