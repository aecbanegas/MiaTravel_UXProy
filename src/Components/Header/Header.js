import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { showCartDlg, toggleMenu, logout } from "../../Redux/Actions";
import cartImage from "../../Images/logo2.png";
import Auth from "../../Auth";
import { categories } from "../../Data";
import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { lightBlue } from "@material-ui/core/colors";
import { light } from "@material-ui/core/styles/createPalette";
import Login from "../../Login";

const mapStateToProps = state => {
  return {
    nrOfItemsInCard: state.cartItems.length,
    loggedInUser: state.loggedInUser
  };
};

// Option items for product categories.
const categoryOptions = categories.map(x => {
  return (
    <MenuItem key={x.name} value={x.name}>
      {x.name}
    </MenuItem>
  );
});

class ConnectedHeader extends Component {
  state = {
    searchTerm: "",
    anchorEl: null,
    categoryFilterValue: categories[0].name
  };

  render() {
    let { anchorEl } = this.state;
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (

      <AppBar
        position="static"
        style={{ background: "linear-gradient(90deg, #36D1DC 0%, #5E83E5 100%)", padding: 10 }}>
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand title" href="#">MiaTravel</a>
          <div className="disp">
            <ul className="nav justify-content-end">
              <li className="nav-item ">
                <a className="nav-link nav-item-font" href="#">Viajes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-item-font" href="#">Promociones</a>
              </li>
              <li className="nav-item">
                <Login />
              </li>
            </ul>
          </div>
        </nav>
      </AppBar>
    );
  }
}

const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default Header;


/*<IconButton
  onClick={() => {
    this.props.dispatch(toggleMenu());
  }}
>
  <MenuIcon size="medium" />
</IconButton>*/


/* LEGACY
<Toolbar>
          <div className="left-part">
            <TextField
              label="Buscar Productos"

              value={this.state.searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}

              style={{ marginLeft: 30, width: 250, marginBottom: 15 }}
            />

            <Select
              style={{ maxWidth: 200, marginLeft: 20 }}
              value={this.state.categoryFilterValue}
              MenuProps={{
                style: {
                  maxHeight: 500
                }
              }}
              onChange={e => {
                this.setState({ categoryFilterValue: e.target.value });
              }}
            >
              {categoryOptions}
            </Select>

            <Button
              style={{ marginLeft: 20 }}
              variant="outlined"
              color="primary"
              onClick={() => {
                this.props.history.push(
                  "/?category=" +
                    this.state.categoryFilterValue +
                    "&term=" +
                    this.state.searchTerm
                );
              }}
            >
              {" "}
              Buscar
            </Button>
          </div>
          <div className="right-part">

            <Login />
            <IconButton
              aria-label="Cart"
              onClick={() => {
                this.props.dispatch(showCartDlg(true));
              }}
            >
              <Badge badgeContent={this.props.nrOfItemsInCard} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>

*/