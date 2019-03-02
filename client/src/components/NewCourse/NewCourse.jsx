import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

import {
	instructorsQuery,
	coursesQuery,
	addCourseMutation
} from "../../queries/queries";

class NewCourse extends Component {
	state = {
		name: "",
		instructorId: ""
	};
	displayInstructors = () => {
		const { loading, instructors } = this.props.instructorsQuery;
		if (loading) {
			return null;
		} else {
			return instructors.map(({ id, name }) => (
				<option key={id} value={id}>
					{name}
				</option>
			));
		}
	};
	validate = () => {
		if (this.state.name === "") {
			alert("Course Name couldn't be empty");
			return false;
		} else if (this.state.instructorId === "") {
			alert("You must choose an Instructor");
			return false;
		}
		alert("Course Added!");
		return true;
	};
	handleSubmit = e => {
		e.preventDefault();
		const { name, instructorId } = this.state;
		if (this.validate()) {
			// Add it to the database
			this.props.addCourseMutation({
				variables: { name, instructorId },
				// Refetching the queries to update the dom
				refetchQueries: [{ query: coursesQuery }]
			});
			// Clear the field
			this.setState({ name: "", instructorId: "" });
		}
	};
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Course name:</label>
					</div>
					<div>
						<input
							type="text"
							value={this.state.name}
							onChange={e =>
								this.setState({ name: e.target.value })
							}
						/>
					</div>
					<div>
						<select
							value={this.state.instructorId}
							onChange={e =>
								this.setState({ instructorId: e.target.value })
							}
						>
							<option value="">Choose an Instructor</option>
							{this.displayInstructors()}
						</select>
					</div>
					<button>Add</button>
				</form>
			</div>
		);
	}
}
export default compose(
	graphql(instructorsQuery, { name: "instructorsQuery" }),
	graphql(addCourseMutation, { name: "addCourseMutation" })
)(NewCourse);
