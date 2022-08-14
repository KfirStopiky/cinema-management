import React, { useState } from "react";
import "./editUser.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import { updateItem } from "../../Services/requests";
import { useDispatch } from "react-redux";
import { UPDATE } from "../../Redux/userSlice";

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
  const dispatch = useDispatch();

  const [updatedPermissions, setUpdatedPermissions] = useState({
    viewSubscriptions: selectedUserDeatils.permissions.viewSubscriptions,
    createSubscriptions: selectedUserDeatils.permissions.createSubscriptions,
    deleteSubscriptions: selectedUserDeatils.permissions.deleteSubscriptions,
    updateSubscriptions: selectedUserDeatils.permissions.updateSubscriptions,
    viewMovies: selectedUserDeatils.permissions.viewMovies,
    createMovies: selectedUserDeatils.permissions.createMovies,
    deleteMovies: selectedUserDeatils.permissions.deleteMovies,
    updateMovie: selectedUserDeatils.permissions.updateMovie,
  });

  const handleEdit = async (id: string, userObj: any) => {
    console.log(userObj.user);
    let resp = await updateItem(`http://localhost:5000/api/users`, id, {
      userObj,
    });
    if (resp.data.error === true) alert(resp.data.message);
    dispatch(UPDATE({ permissions: userObj.user.permissions }));
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
            <Checkbox
              checked={updatedPermissions.viewSubscriptions}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdatedPermissions({
                  ...updatedPermissions,
                  viewSubscriptions: e.target.checked,
                })
              }
            />
            View Subscription
            <br />
            <Checkbox
              checked={updatedPermissions.createSubscriptions}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdatedPermissions({
                  ...updatedPermissions,
                  createSubscriptions: e.target.checked,
                })
              }
            />
            Create subscription <br />
            <Checkbox
              checked={updatedPermissions.deleteSubscriptions}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdatedPermissions({
                  ...updatedPermissions,
                  deleteSubscriptions: e.target.checked,
                })
              }
            />
            Delete subscription <br />
            <Checkbox
              checked={updatedPermissions.updateSubscriptions}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdatedPermissions({
                  ...updatedPermissions,
                  updateSubscriptions: e.target.checked,
                })
              }
            />
            Update subscription <br />
            <Checkbox
              checked={updatedPermissions.viewMovies}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdatedPermissions({
                  ...updatedPermissions,
                  viewMovies: e.target.checked,
                })
              }
            />
            View movies <br />
            <Checkbox
              checked={updatedPermissions.createMovies}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdatedPermissions({
                  ...updatedPermissions,
                  createMovies: e.target.checked,
                })
              }
            />
            Create movies <br />
            <Checkbox
              checked={updatedPermissions.updateMovie}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdatedPermissions({
                  ...updatedPermissions,
                  updateMovie: e.target.checked,
                })
              }
            />
            Update movies <br />
            <Checkbox
              checked={updatedPermissions.deleteMovies}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdatedPermissions({
                  ...updatedPermissions,
                  deleteMovies: e.target.checked,
                })
              }
            />
            Delete movies <br />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() =>
              handleEdit(selectedUserDeatils._id, {
                user: {
                  ...selectedUserDeatils,
                  permissions: updatedPermissions,
                },
              })
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
