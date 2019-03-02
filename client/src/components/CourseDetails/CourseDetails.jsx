import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getCourseQuery } from "../../queries/queries";
import "./CourseDetails.css";

class CourseDetails extends Component {
	displayDetails = () => {
		if (this.props.data.loading) return null;
		const { name, courses } = this.props.data.course.instructor;
		return (
			<div>
				<h3>instructor: {name}</h3>
				<h5>All courses of this instructor -></h5>
				<ul>
					{courses.map(({ name, id }) => (
						<li key={id}>{name}</li>
					))}
				</ul>
			</div>
		);
	};
	render() {
		return (
			<div id="sidebar">
				<h3>SideBar</h3>
				{this.props.selected && this.displayDetails()}
			</div>
		);
	}
}
export default graphql(getCourseQuery, {
	options: ({ selected }) => {
		return {
			variables: {
				id: selected
			}
		};
	}
})(CourseDetails);
