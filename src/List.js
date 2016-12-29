import React from 'react';
import axios from 'axios';
import './App.css';
import {Ordi} from './Ordi.js';


const List = React.createClass({
  displayName: "List",

  getInitialState: function getInitialState() {
    return {
      ordis: [],
      mnf: ''
    };
  },

  componentDidMount: function componentDidMount() {
    var th = this;
    /*this.serverRequest = axios.get("http://192.168.7.223:4000/feedback/"+this.props.value).then(function (result) {*/
    this.serverRequest = axios.get("http://192.168.7.223:4000/feedback/111").then(function (result) { 
      //console.log(result.data)     ;
      th.setState({
        ordis: result.data,
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
      {this.state.ordis.map(function(ordi) {
        return (
            <Ordi key={ordi.ORDI} value={ordi} remove={THIS.remove}></Ordi>
          )}
        )}
      </div>
    )
  }
  
});


export default List;
