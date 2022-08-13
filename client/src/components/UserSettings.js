import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PinkButton } from "./styledComponents";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

const UserSettings = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const { loading, data } = useQuery(GET_ME);

  return (
    <div style={{ color: "white", margin: "2rem 0" }}>
      {!loading ? (
        <>
          <h1>SETTINGS</h1>
          <h2>Username: {data.me.username}</h2>
          <h2>Current High Score: {data.me.highScore}</h2>
          <PinkButton>DELETE ACCOUNT</PinkButton>
        </>
      ) : (
        <>waiting</>
      )}
    </div>
  );
};

export default UserSettings;
