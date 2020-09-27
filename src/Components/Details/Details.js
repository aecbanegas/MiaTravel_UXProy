import React, { Component } from "react";
import Modal from 'react-modal'
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addItemInCart } from "../../Redux/Actions";
import Api from "../../Api";
import Item from "../Item/Item";
import "./Details.css"
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Login from "../../Login";
import UserProvider, { UserContext } from "../../Providers/UserProvider";
//import Modal from "../Modal/ReserveModal";

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
    top: '25%',
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
  /*content : {
    top                   : '50',
    left                  : '50px',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '50%',
    transform             : 'translate(-50%,-50%)'
  }*/
};

Modal.setAppElement('#root')

class ConnectedDetails extends Component {
  constructor(props) {
    super(props);

    this.isCompMounted = false;


    console.log(this.context);

    this.state = {
      relatedItems: [],
      quantity: 1,
      item: null,
      itemLoading: false,
      feedback: "", name: "", email: "renatovarela13@gmail.com",
      show: false,
    };
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal = () => {
    this.setState({
      ...this.state,
      show: !this.state.show
    });
  }

  handleChange = (event) => {
    this.setState({ feedback: event.target.value })
  }

  handleSubmit = (name, email) => {
    //console.log(name, email)
    const templateId = 'template_ji1ib2c';

    this.sendFeedback(templateId, { message_html: this.state.item.name, from_name: name, reply_to: email, email, precio: this.state.item.price, imagen: this.state.item.imageUrls })
  }

  sendFeedback(templateId, variables) {
    window.emailjs.send(
      'miaTravel', templateId,
      variables
    ).then(res => {
      console.log('Email successfully sent!')
    })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }



  async fetchProductAndRelatedItems(productId) {
    this.setState({ itemLoading: true });

    let item = await Api.getItemUsingID(productId);

    let relatedItems = await Api.searchItems({
      category: item.category
    });

    // Make sure this component is still mounted before we set state..
    if (this.isCompMounted) {
      this.setState({
        item,
        quantity: 1,
        relatedItems: relatedItems.data.filter(x => x.id !== item.id),
        itemLoading: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If ID of product changed in URL, refetch details for that product
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchProductAndRelatedItems(this.props.match.params.id);
    }
  }

  componentDidMount() {
    this.isCompMounted = true;
    this.fetchProductAndRelatedItems(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.isCompMounted = false;
  }

  render() {
    if (this.state.itemLoading) {
      return <CircularProgress className="circular" />;
    }

    if (!this.state.item) {
      return null;
    }

    return (
      <div>
        <Modal 
        isOpen={this.state.show}
        style={customStyles}
        >
          <h2 className="title">Mia Travel</h2>
          <hr/>
          <p className="text">Su reserva fue exitosa!!! <br/> revise su correo :D</p>
          <Button
            style={{ width: 170, marginTop: 5, fontFamily: 'Karla', borderColor: "#36D1DC"}}
            color="inherit"
            variant="outlined"
            onClick={() => { this.showModal() }}
          >
            Close
          </Button>
        </Modal>
      <UserContext.Consumer>
        {context => (
          <div style={{ padding: 10 }}>
            
            <div
              style={{
                marginBottom: 20,
                marginTop: 10,
                fontSize: 22
              }}
            >
              {this.state.item.name}
            </div>
            <div style={{ display: "flex" }}>
              <img
                src={this.state.item.imageUrls[0]}
                alt=""
                width={250}
                height={250}
                style={{
                  border: "1px solid lightgray",
                  borderRadius: "5px",
                  objectFit: "cover"
                }}
              />
              <div
                style={{
                  flex: 1,
                  marginLeft: 20,
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    fontSize: 16
                  }}
                >
                  Price: {this.state.item.price} $
              </div>
                {this.state.item.popular && (
                  <div style={{ fontSize: 14, marginTop: 5, color: "#228B22" }}>
                    (Popular product)
                  </div>
                )}
                  <Button
                  style={{ width: 170, marginTop: 5, borderColor:"#36D1DC"}}
                  color="inherit"
                  variant="outlined"
                  onClick={() => {
                    this.props.dispatch(
                      addItemInCart({
                        ...this.state.item,
                        quantity: this.state.quantity
                      })
                    );
                    //this.handleSubmit(context.name, context.email);
                    this.showModal();
                  }}
                >
                  Reservar
                </Button>

              </div>
            </div>

            {/* Product description */}
            <div
              style={{
                marginTop: 20,
                marginBottom: 20,
                fontSize: 22
              }}
            >
              Product Description
          </div>
            <div
              style={{
                maxHeight: 200,
                fontSize: 13,
                overflow: "auto"
              }}
            >
              {this.state.item.description
                ? this.state.item.description
                : "Not available"}
            </div>

            {/* Relateditems */}
            <div
              style={{
                marginTop: 20,
                marginBottom: 10,
                fontSize: 22
              }}
            >



            </div>
            {this.state.relatedItems.slice(0, 3).map(x => {
              return <Item key={x.id} item={x} />;
            })}
            
          </div>
        )}
      </UserContext.Consumer>
      </div>
    );
  }


}
// ConnectedDetails.contextType = UserContext;

let Details = connect()(ConnectedDetails);
export default Details;
