'use strict';

var MatrixUiApp = require('./MatrixUiApp');
var Browse = require('./Browse');
var TextSetter = require('./TextSetter');
var Current = require('./Current');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var content = document.getElementById('content');

var Routes = (
  <Route name="matrixUI" path="/" handler={MatrixUiApp}>
    <Route name="current" handler={Current}/>
    <Route name="browse" handler={Browse}/>
    <Route name="textSetter" handler={TextSetter}/>
    <DefaultRoute handler={Current}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
