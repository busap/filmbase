import React, { FC } from "react";
import Button from '@material-ui/core/Button';
import { signOut, useLoggedInUser } from "../utils/firebase";
import { Card, Typography } from "@material-ui/core";

const Profile: FC = () => {
  const isLoggedIn = useLoggedInUser();

  return <div>
      <h1>Profile</h1>
      {isLoggedIn &&
        <Card>
          <Typography variant="subtitle1">Logged in User: {isLoggedIn.email}</Typography>
          <Button
          variant='contained'
          size='large'
          color='primary'
          onClick={async () => {
            try {
              await signOut();
            } catch (err) {
              alert(err.message);
            }
          }}
        >
          Sign Out
        </Button>
        </Card>
        }
    </div>
};

export default Profile;
