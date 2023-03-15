import React, { useState } from "react";
import UserList from "./userList/UserList";
import UserDetail from "./userDetail/UserDetail";

function User() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();

  const getuserInfo = (id) => {
    setUser(id);
    setUserId(id.uid);
  };
  return (
    <React.Fragment>
      <UserList getuserInfo={getuserInfo} />
      <UserDetail user={user} userId={userId} />
    </React.Fragment>
  );
}

export default User;
