"use strict";

var React = require('react');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var CourseActions = require('../../actions/courseActions');
var CourseList = require('./courseList');
var Link = require('react-router').Link;



var CoursePage = React.createClass({

    getInitialState: function () {
        return {
            courses: CourseStore.getAllCourses()
        };
    },

    componentWillMount: function() {
        CourseStore.addChangeListener(this._onChanges);
        AuthorStore.addChangeListener(this._onChanges);
    },

    //clean up when this component is unmounted
    componentWillUnmount: function() {
        CourseStore.removeChangeListener(this._onChanges);
        AuthorStore.removeChangeListener(this._onChanges);
    },

    _onChanges: function() {
        this.setState({
            courses: CourseStore.getAllCourses()
        });
    },

    render: function () {

        return (
            <div>
                <h1>Courses</h1>
                <Link to="addCourse" className="btn btn-default">Add Course</Link>
                <CourseList courses={this.state.courses}/>
            </div>
        );
    }
});

module.exports = CoursePage;