import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PinkButton } from "./styledComponents";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { DELETE_USER } from "../utils/mutations";
import AuthService from "../utils/auth";

const UserSettings = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const { loading, data } = useQuery(GET_ME);
  const [deleteMu, { error }] = useMutation(DELETE_USER);
  const navigate = useNavigate();

  if (!token) {
    return <div id="instructions">You must be logged in.</div>;
  }

  const deleteUser = async () => {
    try {
      const { data } = await deleteMu({
        variables: { _id: Auth.getProfile().data._id },
      });
    } catch (err) {
      console.err(err);
    }
    AuthService.logout();
    navigate("/signup", { replace: true }, [navigate]);
  };

  return (
    <div style={{ color: "white", margin: "2rem 0" }}>
      {!loading ? (
        <>
          <h1>SETTINGS</h1>
          <h2>Username: {data.me.username}</h2>
          <h2>Current High Score: {data.me.highScore}</h2>
          <PinkButton onClick={deleteUser}>DELETE ACCOUNT</PinkButton>
        </>
      ) : (
        <>waiting</>
      )}
    </div>
  );
};

export default UserSettings;
