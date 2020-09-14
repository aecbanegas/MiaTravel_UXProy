import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import ProductList from "./Components/ProductList/ProductList";
import { Switch, Route } from "react-router-dom";
import CartDialog from "./Components/CartDialog/CartDialog";
import Menu from "./Components/Menu/Menu";
import Details from "./Components/Details/Details";
import Login from "./Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";


class App extends Component {
  render() {
    return (
      <div className="app">
        <Header 
        >
        </Header>  
        <div className="app-body">
          <Menu />
          <div className="content">
          <CartDialog />
            <Switch>
              <Route path="/" exact component={ProductList} />
              <Route path="/details/:id" component={Details} />
              <Route path="/login" component={Login} />
            
              <Route
                component={() => (
                  <div style={{ padding: 20 }}>Page not found</div>
                )}
              />
            </Switch>
          </div>
        </div>
      
      </div>
    );
  }
}

export default App;
