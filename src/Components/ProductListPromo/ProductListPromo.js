import React, { Component, useContext } from "react";
import ItemPromo from "../ItemPromo/ItemPromo";
import CircularProgress from "@material-ui/core/CircularProgress";
import queryString from "query-string";
import ApiPromo from "../../ApiPromo";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { categories } from "../../Data";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import { UserContext } from "../../Providers/UserProvider";
import ProductsHeader from "../ProductsHeader/ProductsHeader";
import { Link } from "react-router-dom";
import Modal from 'react-modal'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '18%',
    left: '25%',
    right: '25%',
    bottom: 'auto',
    border: '1px solid #ccc', //borderColor: "#36D1DC"
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
};

const categoryOptions = categories.map(x => {
  return (
    <MenuItem key={x.name} value={x.name}>
      {x.name}
    </MenuItem>
  );
});

// This component is responsible for fetching products.
// It determines from query string which products to fetch.
// The URL is checked on initial mount and when URL changes.
class ProductListPromo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      totalItemsCount: null,
      items: [],
      categoryFilterValue: categories[0].name,
      searchTerm: "",
    };
    this.updateQueryStr = this.updateQueryStr.bind(this);
  }

  componentDidMount = () => {
    this.fetchData();
    
  };

  async fetchData() {
    this.setState({ loading: true });

    // Parse the query string
    let qsAsObject = queryString.parse(this.props.location.search);

    let results = await ApiPromo.searchItems(qsAsObject);

    this.setState({
      items: results.data,
      loading: false,
      totalItemsCount: results.totalLength
    });
  }

  /*componentDidMount() {
    this.fetchData();
  }*/

  updateQueryStr(newValues) {
    let current = queryString.parse(this.props.location.search);
    this.props.history.push(
      "/?" + queryString.stringify({ ...current, ...newValues })
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let currentQueryStr = queryString.parse(this.props.location.search);
    let oldQueryStr = queryString.parse(prevProps.location.search);

    let areSameObjects = (a, b) => {
      if (Object.keys(a).length !== Object.keys(b).length) return false;
      for (let key in a) {
        if (a[key] !== b[key]) return false;
      }
      return true;
    };

    // We will refetch products only when query string changes.
    if (!areSameObjects(currentQueryStr, oldQueryStr)) {
      this.fetchData();
    }
  }

  render() {
    let parsedQueryStr = queryString.parse(this.props.location.search);
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }
    return (
      <UserContext.Consumer>
        {context => (
      !context.isAuth 
      ? 
      <Modal 
      isOpen={true}
      style={customStyles}
      >
        <h2 className="title">Mia Travel</h2>
        <hr/>
        <p className="text">Solo los usuarios registrados pueden revisar las promociones! <br/>
        Lo sentimos :(</p>
        <Link to="/" style={{ color: "#36D1DC" }}>Back to Home</Link>
      </Modal> 
      :
      <div style={{minHeight: 750}}>
        <div style={{padding: 20, paddingBottom:0, paddingLeft:25}}>
          <InputLabel>
            Busqueda por Filtros
          </InputLabel>
          <Select
            label="Busqueda por Filtros"
            style={{ maxWidth: 200, marginLeft: 20, color: "#36D1DC"}}
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
            style={{ marginLeft: 20, color: "#36D1DC", borderColor: "#36D1DC" }}
            variant="outlined"
            color="primary"
            onClick={() => {
              this.props.history.push(
                "/viajes/?category=" +
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
        <div style={{ height: "100%", display: "flex", flexDirection: "column", marginLeft: 15}}>
          <ProductsHeader
            parsedQueryStr={parsedQueryStr}
            updateQueryStr={this.updateQueryStr}
            totalItemsCount={this.state.totalItemsCount}
          />

          <div style={{ flex: 1 }}>
            {this.state.items.map(item => {
              return <ItemPromo key={item.id} item={item} />;
            })}
          </div>
        </div>
      </div>
      )}
      </UserContext.Consumer>
    );
  }
}

export default ProductListPromo;

/*
<Button
          style={{ width: 170, marginTop: 5, fontFamily: 'Karla', borderColor: "#36D1DC"}}
          color="inherit"
          variant="outlined"
          onClick={}
        >
          Close
        </Button>
*/
