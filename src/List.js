import React from 'react';
import axios from 'axios';
import './App.css';
import './Ordi.js';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import FormControl from 'react-bootstrap/lib/FormControl';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

var Ordi = React.createClass({
  displayname: "Ordi",

  getInitialState() {
    return { showModal: false ,
             startDate: moment()
           };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  handleChange(date) {
    this.setState({
      startDate: date
    });
  },

  handleApprove: function(e){
    e.preventDefault();
    var This = this;
    this.serverRequest = axios.get("http://192.168.7.223:4000/updateordi/"+this.props.value.ORDI+"/A").then(function (result) {
    This.props.remove(This.props.value.ORDI);
    });    
  },

  handleReject: function(e){
    e.preventDefault();
    this.setState({ showModal: true })
  }, 

   reject: function(){
    var This = this;
    this.setState({ showModal: false });    
    this.serverRequest = axios.get("http://192.168.7.223:4000/updateordi/"+this.props.value.ORDI+"/R").then(function (result) {
    This.props.remove(This.props.value.ORDI);
    }); 
   },

    render: function render() {  
        return (
          <tr ref={this.props.value.ORDI} >
          <td>{this.props.value.PARTNAME}</td>
          <td>{this.props.value.BAL}</td>
          <td>{this.props.value.ORDNAME}-{this.props.value.LINE}</td>
          <td>{this.props.value.DATE}</td>
          <td><Button className='approve' bsStyle="primary" bsSize="large" onClick={this.handleApprove} block> Approve </Button>
          <Button className='reject' bsSize="xsmall" onClick={this.handleReject}  block> Change Status </Button></td>   
<Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Update Arrival Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Please enter youre comments here:</h4>
                <FormControl
                  id="formControlsText"
                  type="text"
                  label="Text"
                  placeholder="Enter text"
                />
            <h4>Please enter the new Due Date:</h4>                
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />                
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.reject}>Update</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>                     
          </tr>
        ) 
  }
})


var List = React.createClass({
  displayName: "List",

  getInitialState: function getInitialState() {
    return {
      ordis: []
    };
  },

  componentDidMount: function componentDidMount() {
    var th = this;
    /*this.serverRequest = axios.get("http://192.168.7.223:4000/feedback/"+this.props.value).then(function (result) {*/
    this.serverRequest = axios.get("http://192.168.7.223:4000/feedback/22").then(function (result) {      
      th.setState({
        ordis: result.data
      });
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    this.serverRequest.abort();
  },

  remove(id){
  this.setState({
    ordis: this.state.ordis.filter((el) => id !== el.ORDI)
  }) 
},

  render: function render() {
    var THIS = this;
    return (
      <div>
      <h1>Due to arrive to Silora R&D in the next Week:</h1>
      <Table>
          <thead>
          <tr>

            <th>Part Name</th>
            <th>Quantity</th>
            <th>Order Name</th>
            <th>Due Date</th>
            </tr>
          </thead>      
          <tbody>
      {this.state.ordis.map(function(ordi) {
        return (
            <Ordi key={ordi.ORDI} value={ordi} remove={THIS.remove}></Ordi>
          )}
        )}
      </tbody>
      </Table>
      </div>
    )
  }
  
});


export default List;

/*
        return (
          <div className="job" key={this.props.value.ordi}>
            <span>Order {this.props.value.ORDNAME}-{this.props.value.LINE} has {this.props.value.BAL} pieces of {this.props.value.PARTNAME} that need to arrive at {this.props.value.DATE}
              <button className='approve' onClick={this.handleClick} value='A'> Approved </button>
              <button className='reject' onClick={this.handleClick} value='R'> There is a Problem </button>          
            </span>
          </div>
        ) 
        */