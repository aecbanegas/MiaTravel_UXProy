import React, { Component, createContext } from "react";
import { auth, getDisplayName } from "../firebaseConfig";

export const UserContext = createContext({ user: false, name: ''});
class UserProvider extends Component {
  state = {
    user: false, 
    name: ''
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(userAuth => {
        //const getName = getDisplayName(userAuth);
        //console.log(userAuth.displayName)
        this.setState({ user: userAuth});
        
      
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;