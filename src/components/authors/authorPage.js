"use strict";

var React = require('react');
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/authorActions');
var AuthorList = require('./authorList');
var Link = require('react-router').Link;

var AuthorPage = React.createClass({

    getInitialState: function () {
        return {
            authors: AuthorStore.getAllAuthors()
        };
    },
    /*componentDidMount: function () {
        if(this.isMounted()) {
            this.setState({
                //authors: AuthorApi.getAllAuthors()
                authors: AuthorStore.getAllAuthors()
            });
        }
    },*/
    componentWillMount: function() {
      AuthorStore.addChangeListener(this._onChanges);
    },

    //clean up when this component is unmounted
    componentWillUnmount: function() {
      AuthorStore.removeChangeListener(this._onChanges);
    },

    _onChanges: function() {
        this.setState({
            authors: AuthorStore.getAllAuthors()
        });
    },

    render: function () {

        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors={this.state.authors}/>
            </div>
        );
    }
});

module.exports = AuthorPage;