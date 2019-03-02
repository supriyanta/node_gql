import { gql } from "apollo-boost";

const instructorsQuery = gql`
	{
		instructors {
			name
			id
		}
	}
`;

const coursesQuery = gql`
	{
		courses {
			name
			id
		}
	}
`;
const getCourseQuery = gql`
	query($id: ID) {
		course(id: $id) {
			name
			instructor {
				name
				courses {
					name
					id
				}
			}
		}
	}
`;

const addCourseMutation = gql`
	mutation($name: String!, $instructorId: ID!) {
		AddCourse(name: $name, instructorId: $instructorId) {
			name
			instructor {
				name
			}
		}
	}
`;
export { instructorsQuery, coursesQuery, getCourseQuery, addCourseMutation };
