import React, { Component } from "react";
import Item from "../Item/Item";
import CircularProgress from "@material-ui/core/CircularProgress";
import queryString from "query-string";
import Api from "../../Api";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { categories } from "../../Data";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';

import ProductsHeader from "../ProductsHeader/ProductsHeader";

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
class ProductList extends Component {
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

  async fetchData() {
    this.setState({ loading: true });

    // Parse the query string
    let qsAsObject = queryString.parse(this.props.location.search);

    let results = await Api.searchItems(qsAsObject);

    this.setState({
      items: results.data,
      loading: false,
      totalItemsCount: results.totalLength
    });
  }

  componentDidMount() {
    this.fetchData();
  }

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
      <div style={{minHeight: 750}}>
        <div style={{padding: 20, paddingBottom:0}}>
          <InputLabel>
            Busqueda por Filtros
          </InputLabel>
          <Select
            label="Busqueda por Filtros"
            style={{ maxWidth: 200, marginLeft: 20, color: "#36D1DC", borderColor: "#36D1DC" }}
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
            style={{ marginLeft: 20, color: "#36D1DC" }}
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
              return <Item key={item.id} item={item} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
