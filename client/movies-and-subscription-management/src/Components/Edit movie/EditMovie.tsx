import React, { useEffect } from "react";
import "./editMovie.scss";
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
  selectedMovieDetails: any;
  setSelectedMovieDetails: React.Dispatch<React.SetStateAction<{}>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

const EditMovie: React.FC<IProps> = ({
  open,
  setOpen,
  selectedMovieDetails,
  setSelectedMovieDetails,
}) => {
  const handleEdit = async (id: string, movieObj: object) => {
    await updateItem(`http://localhost:5000/api/movies`, id, movieObj);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let genresArr: string[] = [];

  useEffect(() => {
    selectedMovieDetails.Genres.map((genre: string) => {
      return genresArr.push(genre);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              setSelectedMovieDetails({
                ...selectedMovieDetails,
                Name: e.target.value,
              })
            }
            defaultValue={selectedMovieDetails.Name}
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
            ) => {
              setSelectedMovieDetails({
                ...selectedMovieDetails,
                Geners: e.target.value,
              });
            }}
            defaultValue={genresArr}
            autoFocus
            margin="dense"
            id="Geners"
            label="Geners"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setSelectedMovieDetails({
                ...selectedMovieDetails,
                Image: e.target.value,
              })
            }
            defaultValue={selectedMovieDetails.Image}
            autoFocus
            margin="dense"
            id="Image"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setSelectedMovieDetails({
                ...selectedMovieDetails,
                Premiered: e.target.value,
              })
            }
            defaultValue={selectedMovieDetails.Premiered}
            autoFocus
            margin="dense"
            id="Premiered"
            label="Premiered"
            type="date"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() =>
              handleEdit(selectedMovieDetails._id, {
                movie: selectedMovieDetails,
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

export default EditMovie;
