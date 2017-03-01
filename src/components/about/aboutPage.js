"use strict";

var React = require('react');

var About = React.createClass({
    statics: {
        willTransitionTo: function (transition, params, query, callback) {
            if (!confirm("Do you want to read this boring page")) {
                transition.abort();
            } else {
                callback();
            }
        },
        willTransitionFrom: function (transition, component) {
            if (!confirm("Do you want to leave this interesting page")) {
                transition.abort();
            }
        }
    },
    render: function () {
        return (
            <div>
                <h1>About</h1>
                <p>
                    This application uses following technologies async
                    <ul>
                        <li>React</li>
                        <li>React-router</li>
                        <li>Flux</li>
                        <li>gulp</li>
                        <li>Node</li>
                        <li>Browserify</li>
                        <li>Reactify</li>
                    </ul>

                </p>
            </div>
        );
    }
});

module.exports = About;