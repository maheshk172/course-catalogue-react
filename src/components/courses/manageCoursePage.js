"use strict";
// Controller view for Manage Author form
var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');

var toastr = require('toastr');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');

var AuthorStore = require('../../stores/authorStore');
var CategoryStore = require('../../stores/categoryStore');


var ManageCoursePage = React.createClass({
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
            course: {
                id: '',
                title: '',
                author: {
                    id: '',
                    firstName: '',
                    lastName: ''
                },
                length: '',
                category: ''
            },
            errors: {},
            authors: AuthorStore.getAllAuthors(),
            categories: CategoryStore.getAllCategories(),
            dirty: false
        };
    },
    componentWillMount: function () {
        var courseId = this.props.params.id;  //this is from the Path Author Id
        if (courseId) {
            this.setState({course: CourseStore.getCourseById(courseId)});
        }
    },
    setCourseState: function (event) {
        var field = event.target.name;
        var value = event.target.value;

        if(event.target.type === 'select-one' && event.target.name === 'author') {
            var selectedAuthorId = event.target.options[event.target.selectedIndex].value;
            value = AuthorStore.getAuthorById(selectedAuthorId);
        }

        this.state.course[field] = value;

        return this.setState({
            course: this.state.course,
            dirty: true
        });
    },
    courseFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {};

        if (this.state.course.title < 5) {
            this.state.errors.title = 'Course Title should be atleast 5 letters';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },
    saveCourse: function (event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        if(this.state.course.id) {
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }

        toastr.success('Course Saved');
        this.setState({dirty: false});

        //coming from Router.Navigation Mixin
        this.transitionTo('courses');
    },
    render: function () {
        return (
            <CourseForm
                authors={this.state.authors}
                categories={this.state.categories}
                course={this.state.course}
                onChange={this.setCourseState}
                onSave={this.saveCourse}
                errors={this.state.errors}
            />
        );
    }
});

module.exports = ManageCoursePage;