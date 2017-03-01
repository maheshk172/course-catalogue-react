"use strict";
// Controller view for Manage Author form
var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorAPI');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    statics: {
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm('Leave without saving')) {
                transition.abort();
            }
        }
    },

    mixins: [
        Router.Navigation
    ],
    getInitialState: function () {
        return {
            author: {
                id: '',
                firstName: '',
                lastName: ''
            },
            errors: {},
            dirty: false
        };
    },
    componentWillMount: function()  {
        var authorId = this.props.params.id;  //this is from the Path Author Id
        if(authorId) {
            this.setState({author: AuthorApi.getAuthorById(authorId)});
        }
    },
    setAuthorSet: function (event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;

        return this.setState({
            author: this.state.author,
            dirty: true
        });
    },
    authorFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {};

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First Name must be at least 3 letters';
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last Name must be at least 3 letters';
            formIsValid = false;
        }
        this.setState({errors: this.state.errors});
        return formIsValid;
    },
    saveAuthor: function (event) {
        event.preventDefault();

        if (!this.authorFormIsValid()) {
            return;
        }
        AuthorApi.saveAuthor(this.state.author);
        toastr.success('Author Saved');
        this.setState({dirty: false});
        //coming from Router.Navigation Mixin
        this.transitionTo('authors');
    },
    render: function () {
        return (
            <AuthorForm
                author={this.state.author}
                onChange={this.setAuthorSet}
                onSave={this.saveAuthor}
                errors={this.state.errors}
            />
        );
    }
});

module.exports = ManageAuthorPage;