import React from 'react';

class App extends React.Component {
  render(){
    return (
    <div>
      <h1>{this.props.txt}</h1>
      hello to you
    </div>
    )
  }
}

App.propTypes = {
  txt: React.PropTypes.string
}

App.defaultProps ={
  txt : "hellooooooo"
}

export default App;