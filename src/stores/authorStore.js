"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

// private data store
var _authors = [];


// This is similar to extending a class, so AuthorStore will have all features of EventEmitter
var AuthorStore = assign({}, EventEmitter.prototype, {
    // when things change in store, call callback
    addChangeListener: function (callabck) {
        this.on(CHANGE_EVENT, callabck);
    },
    // Remove listener
    removeChangeListener: function (callabck) {
        this.removeListener(CHANGE_EVENT, callabck);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    // Public methods specific to this data store to interact with Data
    getAllAuthors: function() {
        return _authors;
    },

    getAuthorById: function(id) {
        return _.find(_authors, {id: id});
    }
});

// Registers store with the dispatcher
Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.INITIALIZE :
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
            break;
        case ActionTypes.CREATE_AUTHOR :
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;
        case ActionTypes.UPDATE_AUTHOR :
            var existingAuthor = _.find(_authors, {id: action.author.id});
            var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
            _authors.splice(existingAuthorIndex, 1, action.author);
            AuthorStore.emitChange();
            break;
        case ActionTypes.DELETE_AUTHOR :
             /*_.remove(_authors, { id: action.id});*/
            _.remove(_authors, function(author){
               return author.id === action.id;
            });
            AuthorStore.emitChange();
            break;
        default:
            console.log(action.actionType + ' , is received and no action taken from AuthorStore');
            break;
    }
});

module.exports = AuthorStore;