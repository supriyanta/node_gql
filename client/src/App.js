import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";

// Components
import CourseList from "./components/CourseList/CourseList";
import NewCourse from "./components/NewCourse/NewCourse";
import NewInstructor from "./components/NewInstructor/NewInstructor";

const client = new ApolloClient({
	uri: "http://localhost:8000/graphql"
});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div>
					<h1>gql Courses</h1>
					<CourseList />
					<NewInstructor />
					<NewCourse />
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
