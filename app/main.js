import React from 'react'
import ReactDOM from 'react-dom';

//Getting components from a separate file.
import Inbox from './component.js';

//React-router common components
import { Router, Route, Link } from 'react-router'

const About = React.createClass({
  render() {
    return <h2>About</h2>
  }
})

//High level app
const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>

        {/*
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
})

// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox} />
    </Route>
  </Router>,
  document.getElementById('app')
);
