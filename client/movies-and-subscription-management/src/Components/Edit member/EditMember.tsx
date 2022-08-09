import React from "react";
import "./editMember.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { updateItem } from "../../Services/requests";

interface IProps {
  open: boolean;
  selectedMemberDetails: any;
  setSelectedMemberDetails: React.Dispatch<React.SetStateAction<{}>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

const EditMember: React.FC<IProps> = ({
  open,
  setOpen,
  selectedMemberDetails,
  setSelectedMemberDetails,
}) => {
  const handleEdit = async (id: string, movieObj: object) => {
    await updateItem(`http://localhost:5000/api/members`, id, movieObj);
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
              setSelectedMemberDetails({
                ...selectedMemberDetails,
                Name: e.target.value,
              })
            }
            defaultValue={selectedMemberDetails.Name}
            autoFocus
            margin="dense"
            id="Name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setSelectedMemberDetails({
                ...selectedMemberDetails,
                Email: e.target.value,
              })
            }
            defaultValue={selectedMemberDetails.Email}
            autoFocus
            margin="dense"
            id="Email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setSelectedMemberDetails({
                ...selectedMemberDetails,
                City: e.target.value,
              })
            }
            defaultValue={selectedMemberDetails.City}
            autoFocus
            margin="dense"
            id="City"
            label="City"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() =>
              handleEdit(selectedMemberDetails._id, {
                member: selectedMemberDetails,
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

export default EditMember;
