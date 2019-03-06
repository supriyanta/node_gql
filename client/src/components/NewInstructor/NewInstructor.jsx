import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { addInstructorMutation, instructorsQuery } from "../../queries/queries";

class NewInstructor extends Component {
	state = {
		name: "",
		age: ""
	};

	validate = () => {
		const { name, age } = this.state;
		if (name === "") {
			alert("Name can't be empty");
			return false;
		}
		let ageInt = parseInt(age);
		if (!ageInt || ageInt < 18 || ageInt > 99) {
			alert("Age must be a number & more than equal to 18");
			return false;
		}

		alert("Course Added!");
		return true;
	};
	handleSubmit = e => {
		e.preventDefault();
		console.log(this.state);
		if (this.validate()) {
			const { name, age } = this.state;
			this.props.addInstructorMutation({
				variables: { name, age },
				refetchQueries: [{ query: instructorsQuery }]
			});
			this.setState({ name: "", age: "" });
		}
	};
	render() {
		console.log(this.props);
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input
							type="text"
							placeholder="Name"
							value={this.state.name}
							onChange={e =>
								this.setState({ name: e.target.value })
							}
						/>
					</div>
					<div>
						<input
							type="text"
							placeholder="Age"
							value={this.state.age}
							onChange={e =>
								this.setState({
									age: e.target.value
								})
							}
						/>
					</div>
					<div>
						<button>Add</button>
					</div>
				</form>
			</div>
		);
	}
}
export default compose(
	graphql(addInstructorMutation, { name: "addInstructorMutation" })
)(NewInstructor);
