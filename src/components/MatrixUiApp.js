'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

// CSS
require('normalize.css');
require('../styles/main.css');


class MatrixUiApp extends React.Component {
	render() {
		return (
			<div>
				<header>
					<ul>
						<li><Link to="current">Current</Link></li>
						<li><Link to="browse">Browse</Link></li>
						<li><Link to="textSetter">Text</Link></li>
					</ul> 
				</header>

        		<RouteHandler/>
			</div>
		);
	}
}

export default MatrixUiApp;
