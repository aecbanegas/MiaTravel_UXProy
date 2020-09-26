import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import ProductList from "./Components/ProductList/ProductList";
import { Switch, Route } from "react-router-dom";
import CartDialog from "./Components/CartDialog/CartDialog";
import Details from "./Components/Details/Details";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Carrousel from "./Components/Carrousel/Carrousel.js";
import Footer from "./Components/Footer/Footer.js";
import ProductListPromo from "./Components/ProductListPromo/ProductListPromo";
import PromoDetails from "./Components/PromoDetails/PromoDetails";


class App extends Component {
  render() {
    //const user = firebase.auth().currentUser.displayName;;
    return (
      <div className="app">
        <Header/>  
        <div className="app-body">
          
          <div className="content">
          <CartDialog/>
            <Switch>
              <Route path="/" exact component={Carrousel} />
              <Route path="/details/:id" component={Details} />
              <Route path="/promodetails/:id" component={PromoDetails} />
              <Route path="/viajes" component={ProductList}/>
              <Route path="/promociones" component={ProductListPromo}/>
              <Route
                component={() => (
                  <div style={{ padding: 20 }}>Page not found</div>
                )}
              />
            </Switch>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
//<Menu />

//El primer path antes apuntaba a este componenete
//<Route path="/" exact component={ProductList} />

//<Route path="/login" component={Login} />