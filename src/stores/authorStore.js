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
var AuthorStore = asign({}, EventEmitter.prototype, {
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
        case ActionTypes.CREATE_AUTHOR :
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;
    }
});

module.exports = AuthorStore;