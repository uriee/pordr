import React from 'react';
import axios from 'axios';
import './App.css';
import './Ordi.js';


var Ordi = React.createClass({
  displayname: "Ordi",

  handleClick: function(e){
    e.preventDefault();
    console.log(this.props.value.ORDI,e.target.value);
    var th = this;
    this.serverRequest = axios.get("http://192.168.7.223:4000/updateordi/"+this.props.value.ORDI+"/"+e.target.value).then(function (result) {
      th.setState({
        ordis: result.data
      });
    });    
  },

    render: function render() {  
        return (
          <div className="job" key={this.props.value.ordi}>
            <span>Order {this.props.value.ORDNAME}-{this.props.value.LINE} has {this.props.value.BAL} pieces of {this.props.value.PARTNAME} that need to arrive at {this.props.value.DATE}
              <button className='approve' onClick={this.handleClick} value='A'> Approved </button>
              <button className='reject' onClick={this.handleClick} value='R'> There is a Problem </button>          
            </span>
          </div>
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
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
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


  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Due to arrive to Silora R&D in the next Week:"
      ),

      this.state.ordis.map(function(ordi) {
        return (<Ordi key={ordi.ORDI} value={ordi}></Ordi>)
        /*
       return React.createElement(
        "Ordi",
        {key: ordi.ORDI ,value: ordi}
      )
      */
      })
  )}

    
});


export default List;

