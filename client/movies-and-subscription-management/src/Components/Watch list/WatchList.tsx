import React, { useState } from "react";
import SubscribeMovie from "../Subscribe movie/SubscribeMovie";

interface memberProps {
  member: {
    _id: string;
    Name: string;
    Email: string;
    City: string;
  };
  getMembers: () => void;
}

const WatchList: React.FC<memberProps> = ({ member }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1>Movies Watched</h1>
      <button onClick={() => setOpen(!open)}>Subscribe to a new movie</button>
      {open && <SubscribeMovie />}
      {/* <button onClick={() => subscribeHandlre({ memberID: member._id })}>
        Subscribe to a new movie
      </button> */}
    </div>
  );
};

export default WatchList;
