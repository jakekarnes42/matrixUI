var React = require('react');

var DisplayImage = React.createClass({
  render: function() {
    return (
      <img src={'images/fry.png'} className="displayImage"/>
      );
  }
});

var MatrixGrid = React.createClass({
  componentDidMount: function(){
   var context = React.findDOMNode(this.refs.canvas).getContext('2d');
   context.moveTo(0, 0);
   var cellSize = this.props.size / this.props.pixels;
     //vertical lines
     for (var i = 0; i < this.props.pixels; i++) {
      context.moveTo(cellSize * i, 0);
      context.lineTo(cellSize * i, this.props.size);
      context.stroke();
    }

     //horizontal lines
     for (var j = 0; j < this.props.pixels; j++) {
      context.moveTo(0, cellSize * j);
      context.lineTo(this.props.size, cellSize * j);
      context.stroke();
    }
  },

  render: function() {
    return (
      <canvas
        ref="canvas"
        width={this.props.size}
        height={this.props.size}
        style = {{border : '1px solid #000000'}}>
      </canvas>
      );
  }
});

class Current extends React.Component {
	render() {
		return (
			<div>
     <MatrixGrid size={480} pixels={32} />
     <DisplayImage />
     </div>
     );
	}
}

export default Current;
