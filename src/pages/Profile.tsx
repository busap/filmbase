import React, { FC } from "react";
import Button from '@material-ui/core/Button';
import { signOut, useLoggedInUser } from "../utils/firebase";

const Profile: FC = () => {
  const isLoggedIn = useLoggedInUser();

  return <div>
      <h1>Profile</h1>
      {isLoggedIn && <Button
          variant='text'
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
        }
    </div>
};

export default Profile;
