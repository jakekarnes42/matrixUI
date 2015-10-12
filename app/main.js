import React from 'react'
import ReactDOM from 'react-dom';

//Getting components from a separate file.
import Inbox from './component.js';

//React-router common components
import { Router, Route, Link, IndexRoute } from 'react-router'

const About = React.createClass({
  render() {
    return <h2>About</h2>
  }
})

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
})

//High level app
const App = React.createClass({
  render() {
    return (
     <div> 
      <div className="header">
        <div className="container">
          <h1 className="header-heading">Matrix UI</h1>
        </div>
      </div>
      <div className="nav-bar">
        <div className="container">
          <ul className="nav">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
          </ul>
        </div>
      </div>
      <div className="content">
        <div className="container">
          <div className="main">
            {/*
              the router will figure out the children for us
            */}
            {this.props.children}
          </div>
         </div>
      </div>
    </div>
   )
  }
})

// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.

ReactDOM.render(
  <Router>
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} /> //Default to Dashboard component.
    <Route path="about" component={About} />
    <Route path="inbox" component={Inbox} />
  </Route>
  </Router>,
  document.getElementById('app')
  );
