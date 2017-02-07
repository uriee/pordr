import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import FormControl from 'react-bootstrap/lib/FormControl';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export const Ordi = React.createClass({
  displayname: "Ordi",

  getInitialState() {
    return { showModal: false ,
             startDate: moment(),
             text:''
           };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  },

  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  },


  handleApprove: function(e){
    e.preventDefault();
    var This = this;
    this.serverRequest = axios.get("http://192.168.7.223:4000/approve/"+this.props.value.ORDI).then(function (result) {
    This.props.remove(This.props.value.ORDI);
    });    
  },

  handleReject: function(e){
    e.preventDefault();
    this.setState({ showModal: true })
  }, 

   reject: function(){
    var This = this;
    console.log(this.state.startDate.unix());
    this.setState({ showModal: false });    
    this.serverRequest = axios.get("http://192.168.7.223:4000/reject/"+this.props.value.ORDI+"/"+this.state.text+"/"+(this.state.startDate.unix()/60-567993600/60)).then(function (result) {
    This.props.remove(This.props.value.ORDI);
    }); 
   },

   mnf: function(x){
    if(x) return <ListGroupItem>Manufacture Part Name : {this.props.value.MNFPARTNAME}</ListGroupItem>  
   },

  debug: function(x){
    console.log(this,x);
  },

    render: function render() { 
        return (
          <Panel ref={this.props.value.ORDI} header={this.props.value.PARTNAME} bsStyle="primary">
            <ListGroup fill>
              {this.mnf(this.props.value.MNFPARTNAME)}             
              <ListGroupItem>Order : {this.props.value.ORDNAME}-{this.props.value.LINE}</ListGroupItem>
              <ListGroupItem>Due Date : {this.props.value.DATE}</ListGroupItem>
              <ListGroupItem>Balance : {this.props.value.BAL}</ListGroupItem>
              <ListGroupItem>
                <Button className='approve' bsStyle="primary" bsSize="large" onClick={this.handleApprove} block> Approve </Button>
                <Button className='reject' bsSize="xsmall" onClick={this.handleReject}  block> Change Status </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Arrival Data For {this.props.value.PARTNAME}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h4>Please enter youre comments here:</h4>
                    <FormControl
                      id="formControlsText"
                      type="text"
                      label="Text"
                      placeholder="Enter text"
                      onChange={this.handleTextChange}
                    />
                    <h4>Please enter the new Due Date:</h4>                
                    <DatePicker
                      id="datepicker"
                      selected={this.state.startDate}
                      onChange={this.handleDateChange}
                    />                
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.reject}>Update</Button>
                    <Button onClick={this.close}>Close</Button>
                  </Modal.Footer>
                </Modal>                 
              </ListGroupItem>                                           
            </ListGroup>
           
        </Panel>
        ) 
  }
})

