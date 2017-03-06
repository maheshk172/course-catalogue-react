"use strict";

var React = require('react');
var Input = require('../common/textInput');

var CourseForm = React.createClass({
    propTypes: {
        authors: React.PropTypes.array.isRequired,
        categories: React.PropTypes.array.isRequired,
        course: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    buildAuthorOptionRow: function (author) {

        var optionElement = '';

        if (this.props.course.author.id === author.id && this.props.course.author.name === author.name) {
            optionElement = <option key={author.id} value={author.id} selected>{author.firstName} {author.lastName}</option>;
        } else {
            optionElement = <option value={author.id}>{author.firstName} {author.lastName}</option>;
        }

        return (
            optionElement
        );
    },

    buildCategoryRow: function (category) {
        return (
            <option value={category}>{category}</option>
        );
    },

    render: function () {
        return (
            <form>
                <h1>Manage Course</h1>
                <Input
                    name="title"
                    label="title"
                    value={this.props.course.title}
                    onChange={this.props.onChange}
                    error={this.props.errors.title}>
                </Input>

                <div className="form-group">
                    <label htmlFor="author">Select list:</label>
                    <select name="author"
                            className="form-control"
                            id="author"
                            value={this.props.course.author.name}
                            onChange={this.props.onChange}>
                        {this.props.authors.map(this.buildAuthorOptionRow, this)}
                    </select>
                </div>


                <Input
                    name="length"
                    label="Course Length"
                    value={this.props.course.length}
                    onChange={this.props.onChange}
                    error={this.props.errors.length}>
                </Input>


                <div className="form-group">
                    <label htmlFor="category">Select Category:</label>
                    <select name="category"
                            className="form-control"
                            id="category"
                            value={this.props.course.category}
                            onChange={this.props.onChange}>
                        {this.props.categories.map(this.buildCategoryRow, this)}
                    </select>
                </div>

                <input type="submit"
                       value="Save"
                       className="btn btn-default"
                       onClick={this.props.onSave}/>

            </form>
        );
    }
});

module.exports = CourseForm;