import React from "react";
import { deleteItem, getItemById } from "../../Services/requests";
import EditMember from "../Edit member/EditMember";
import WatchList from "../Watch list/WatchList";
import "./member.scss";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface memberProps {
  member: {
    _id: string;
    Name: string;
    Email: string;
    City: string;
    Watched_movies: [];
  };
  getMembers: () => void;
}

const Member: React.FC<memberProps> = ({ member, getMembers }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedMemberDetails, setSelectedMemberDetails] = React.useState({});

  const deleteMember = async () => {
    await deleteItem(`http://localhost:5000/api/members`, member._id);
    getMembers();
  };

  const editMember = async (id: string) => {
    let resp = await getItemById(`http://localhost:5000/api/members`, id);
    setSelectedMemberDetails(resp.data.member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            {member.Name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Email: {member.Email}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            City: {member.City}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => editMember(member._id)} size="small">
            Edit
          </Button>
          <Button onClick={deleteMember} size="small">
            Delete
          </Button>
        </CardActions>
      </Card>
      {open && (
        <EditMember
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          selectedMemberDetails={selectedMemberDetails}
          setSelectedMemberDetails={setSelectedMemberDetails}
        />
      )}
      <div className="member">
        <WatchList getMembers={getMembers} member={member} />
      </div>
    </div>
  );
};

export default Member;
