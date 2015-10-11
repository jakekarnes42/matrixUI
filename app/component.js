import React from 'react';


export default class Inbox extends React.Component {
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {/* Render the child route component */}
        {this.props.children || "Welcome to my Inbox"}
      </div>
    )
  }
}
