"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
    render: function() {
        return (
         <div className="jumbotron">
             <h1> Pluralsign Administration</h1>
             <p> React, React Router, Flux for Ultra responsive Web Apps</p>
             <Link className="btn btn-lg btn-primary" to="about">Learn More</Link>
         </div>
        );
    }
});

module.exports = Home;