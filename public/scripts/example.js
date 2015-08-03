var MatrixGrid = React.createClass({


  componentDidMount: function(){
     var context = React.findDOMNode(this.refs.canvas).getContext("2d");
     context.moveTo(0,0);
     var cell_size = this.props.size / 32;
     //vertical lines
     for (var i = 0; i < 32; i++) {
      context.moveTo(cell_size * i,0);
      context.lineTo(cell_size * i,this.props.size);
      context.stroke();
     };

     //horizontal lines
     for (var i = 0; i < 32; i++) {
      context.moveTo(0,cell_size * i);
      context.lineTo(this.props.size,cell_size * i);
      context.stroke();
     };



  },

  render: function() {
    return (
      <canvas ref="canvas" width={this.props.size} height={this.props.size}
      style={{border:'1px solid #000000'}}>
      </canvas> 
      );
  }
});

React.render(
  <MatrixGrid size={480} />,
  document.getElementById('content')
);
