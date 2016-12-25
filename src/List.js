import React from 'react';
import axios from 'axios';
import './App.css';
import './Ordi.js';


var Ordi = React.createClass({
  displayname: "Ordi",

  handleClick: function(e){
    e.preventDefault();
    if((e.target.value)==='A') {this.props.remove(this.props.value.ORDI)}
    console.log(this.props.value.ORDI,e.target.value);

    this.serverRequest = axios.get("http://192.168.7.223:4000/updateordi/"+this.props.value.ORDI+"/"+e.target.value).then(function (result) {

    });    
  },

    render: function render() {  
        return (
          <tr ref={this.props.value.ORDI} >
          <td>{this.props.value.PARTNAME}</td>
          <td>{this.props.value.BAL}</td>
          <td>{this.props.value.ORDNAME}-{this.props.value.LINE}</td>
          <td>{this.props.value.DATE}</td>
          <td><button className='approve' onClick={this.handleClick} value='A'> Approve </button>
          <button className='reject' onClick={this.handleClick} value='R'> There is a Problem </button></td>
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
      <table>
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
      </table>
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