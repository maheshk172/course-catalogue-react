"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

// private data store
var _courses = [];


// This is similar to extending a class, so AuthorStore will have all features of EventEmitter
var CourseStore = assign({}, EventEmitter.prototype, {
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
    getAllCourses: function() {
        return _courses;
    },

    getCourseById: function(id) {
        return _.find(_courses, {id: id});
    }
});

// Registers store with the dispatcher
Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.INITIALIZE :
            _courses = action.initialData.courses;
            CourseStore.emitChange();
            break;
        case ActionTypes.CREATE_COURSE :
            _courses.push(action.course);
            CourseStore.emitChange();
            break;
        case ActionTypes.UPDATE_COURSE :
            var existingCourse = _.find(_courses, {id: action.course.id});
            var existingCourseIndex = _.indexOf(_courses, existingCourse);
            _courses.splice(existingCourseIndex, 1, action.course);
            CourseStore.emitChange();
            break;
        case ActionTypes.DELETE_COURSE :
            _.remove(_courses, function(course){
                return course.id === action.id;
            });
            CourseStore.emitChange();
            break;
        default:
            console.log(action.actionType + ' , is received and no action taken from CourseStore');
            break;
    }
});

module.exports = CourseStore;