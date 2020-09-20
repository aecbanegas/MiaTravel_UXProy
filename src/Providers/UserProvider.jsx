import React, { Component, createContext } from "react";
import { auth, getDisplayName } from "../firebaseConfig";

export const UserContext = createContext({ isAuth: false, name: ''});
class UserProvider extends Component {
  state = {
    isAuth: false, name: ''
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(userAuth => {
        //const getName = getDisplayName(userAuth);
        console.log(!!userAuth)
        //console.log(userAuth.displayName)
        /*const user = {
          isAuth: !!userAuth,
          email: userAuth.displayName
        }*/
        this.setState({ isAuth: !!userAuth, name: !!userAuth ? userAuth.displayName : ''});
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;