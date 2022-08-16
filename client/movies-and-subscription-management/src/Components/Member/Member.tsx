import { Button } from "@mui/material";
import React from "react";
import { deleteItem, getItemById } from "../../Services/requests";
import EditMember from "../Edit member/EditMember";
import WatchList from "../Watch list/WatchList";
import "./member.scss";

interface memberProps {
  member: {
    _id: string;
    Name: string;
    Email: string;
    City: string;
  };
  getMembers: () => void;
}

const Member: React.FC<memberProps> = ({ member, getMembers }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedMemberDetails, setSelectedMemberDetails] = React.useState({});

  const deleteMember = async () => {
    console.log("delet member");
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
      <div className="member">
        Name:{member.Name} <br />
        Email:{member.Email} <br />
        City:{member.City} <br />
        <div>
          <Button onClick={() => editMember(member._id)} variant="outlined">
            Edit
          </Button>
          {open && (
            <EditMember
              open={open}
              setOpen={setOpen}
              handleClose={handleClose}
              selectedMemberDetails={selectedMemberDetails}
              setSelectedMemberDetails={setSelectedMemberDetails}
            />
          )}
          <Button onClick={deleteMember} variant="outlined">
            Delete
          </Button>
        </div>
        <WatchList getMembers={getMembers} member={member} />
      </div>
    </div>
  );
};

export default Member;
