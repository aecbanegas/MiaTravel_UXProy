import React, { Component, useContext } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { signInWithGoogle, signOut } from './firebaseConfig';
import { UserContext } from "./Providers/UserProvider";
import Button from "@material-ui/core/Button";

const Login = () => {

  const logInfo = useContext(UserContext);
  return (
    <div>
      {
        logInfo.user
          ? <Button style={{ marginTop: 6, marginLeft: 20, color: "#FFFFFF", borderColor: "#FFFFFF" }}
            variant="outlined"

            onClick={signOut}>{" | Cerrar Sesión"}</Button>

          : <Button style={{ marginTop: 6, marginLeft: 20, color: "#FFFFFF", borderColor: "#FFFFFF" }}
            variant="outlined"
            onClick={signInWithGoogle}>Registrarse con Google</Button>
      }
    </div>
  );
}

export default Login;

