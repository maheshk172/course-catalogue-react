"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseAPI = require('../api/courseAPI');
var ActionTypes = require('../constants/actionTypes');

var CourseActions = {
    createCourse: function (course) {
        var newCourse = CourseAPI.saveCourse(course);
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_COURSE,
            course: newCourse
        });
    },

    updateCourse: function (course) {
        var updatedCourse = CourseAPI.saveCourse(course);
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_COURSE,
            course: updatedCourse
        });
    },

    deleteCourse: function (id) {
        CourseAPI.deleteCourse(id);
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_COURSE,
            id: id
        });
    }
};

module.exports = CourseActions;