import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getToken } from "../../Services/AuthService";
import { getAllItems } from "../../Services/requests";
import { MemberType } from "../../Types/member";
import Member from "../Member/Member";
import "./members.scss";

const Members: React.FC = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);

  const getMembers = async () => {
    let resp = await getAllItems("http://localhost:5000/api/members");
    let allMembers = resp.data.allMembers;
    setMembers(allMembers);
  };

  useEffect(() => {
    let token = getToken();
    if (token === null) {
      navigate("/");
    }
    getMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members]);
  return (
    <>
      {members.map((member: MemberType) => {
        return (
          <Member key={member._id} member={member} getMembers={getMembers} />
        );
      })}
    </>
  );
};

export default Members;
