"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorAPI');
var CourseAPI = require('../api/courseAPI');
var ActionTypes = require('../constants/actionTypes');

var InitializeActions = {
   initApp: function() {
       Dispatcher.dispatch({
           actionType: ActionTypes.INITIALIZE,
           initialData: {
               authors: AuthorApi.getAllAuthors(),
               courses: CourseAPI.getAllCourses(),
               categories: [
                   'Software Practices',
                   'Software Architecture',
                   'HTML5',
                   'Career'
               ]
           }
       });
   }
};

module.exports = InitializeActions;