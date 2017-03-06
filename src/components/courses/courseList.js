"use strict";

var React = require('react');
var Link = require('react-router').Link;
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');

var CourseList = React.createClass({
    propTypes: {
        courses: React.PropTypes.array.isRequired
    },
    deleteCourse: function(id, event) {
        event.preventDefault();
        CourseActions.deleteCourse(id);
        toastr.success('course deleted successfully');
    },
    render: function () {
        var createCourseRow = function (course) {
            return (
                <tr key={course.id}>
                    <td><a href="#" onClick={this.deleteCourse.bind(this, course.id)}>Delete</a> </td>
                    <td><Link to="manageCourse" params={{id: course.id}}>{course.id}</Link></td>
                    <td>{course.title}</td>
                    <td>{course.author.id} {course.author.name}</td>
                    <td>{course.length}</td>
                    <td>{course.category}</td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                    <th></th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Author Details</th>
                    <th>Course length</th>
                    <th>Course category</th>
                    </thead>
                    <tbody>
                    {this.props.courses.map(createCourseRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = CourseList;