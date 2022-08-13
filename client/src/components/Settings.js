import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";
import { PinkButton, YellowButton } from "./styledComponents";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER } from "../utils/mutations";
import { GET_ME } from "../utils/queries";


const Settings = () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const navigate = useNavigate();
    const [deleteMu, { error }] = useMutation(DELETE_USER);
    
    if (!token) {
        return <div id="instructions">
        You must be logged in.
      </div>
    };

    const deleteUser = async () => {

        try {const { data } = await deleteMu({
            variables: { _id: Auth.getProfile().data._id }
        })}catch (err){
        console.err(err);
        }
        navigate("/signup", { replace: true }, [navigate]);

    };

    return (
    <div id="game-screen">
      <div id="instructions">
        Welcome to Settings.

        <PinkButton onClick={deleteUser}>Delete</PinkButton>
      </div>
    </div>
    );
    
};

export default Settings;