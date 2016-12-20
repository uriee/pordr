import React from 'react';



var Ordi = React.createClass({
	displayname: "Ordi",

	handleClick: function(e){
	  e.preventDefault();
	  console.log('The link was clicked.',this.props);
	},

    render: function render() {  
        return (
          <div className="job" key={this.props.key}>
        	  <span>Order {this.props.value.ORDNAME}-{this.props.value.LINE} has {this.props.value.BAL} pieces of {this.props.value.PARTNAME} that need to arrive at {this.props.value.DATE}
          		<button> Approved </button>
          		<button> There is a Problem </button>          
          	</span>
          </div>
        ) 
	}
})

export default Ordi;