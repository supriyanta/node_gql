import React, { Component } from "react";
import { graphql } from "react-apollo";
import { coursesQuery } from "../../queries/queries";

// Components
import CourseDetails from "../CourseDetails/CourseDetails";

class CourseList extends Component {
	state = {
		selected: null
	};
	displayCourses = () => {
		const { courses, loading } = this.props.data;
		if (loading) {
			return <div>Loading....</div>;
		} else {
			return courses.map(({ id, name }) => (
				<li key={id} onClick={() => this.setState({ selected: id })}>
					{name}
				</li>
			));
		}
	};
	render() {
		return (
			<div>
				<h4>Courses List</h4>
				<ul>{this.displayCourses()}</ul>
				<CourseDetails selected={this.state.selected} />
			</div>
		);
	}
}
export default graphql(coursesQuery)(CourseList);
