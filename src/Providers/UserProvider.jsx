import React, { Component, createContext } from "react";
import { auth, getDisplayName } from "../firebaseConfig";

export const UserContext = createContext({ isAuth: false, name: '', email: ''});
class UserProvider extends Component {
  state = {
    isAuth: false, 
    name: '',
    email: ''
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
        this.setState({ isAuth: !!userAuth, 
          name: !!userAuth ? userAuth.displayName : '',
          email: !!userAuth ? userAuth.email : ''
        });
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