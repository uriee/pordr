import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';

var value = document.getElementById('root').getAttribute("ordi");

ReactDOM.render(
  <List value={value}/>,
  document.getElementById('root')
);
