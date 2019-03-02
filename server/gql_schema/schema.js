const gql = require("graphql");
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = require("graphql");

// Mongoose Models
const Instructor = require("../models/Instructor");
const Course = require("../models/Course");

const CourseType = new GraphQLObjectType({
	name: "Course",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		instructorId: { type: GraphQLString },
		instructor: {
			type: InstructorType,
			args: {},
			resolve({ instructorId }, args) {
				return Instructor.findById(instructorId);
			}
		}
	})
});

const InstructorType = new GraphQLObjectType({
	name: "Instructor",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		courses: {
			type: new GraphQLList(CourseType),
			args: {},
			resolve({ id }, args) {
				return Course.find({ instructorId: id });
			}
		}
	})
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		AddCourse: {
			type: CourseType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				instructorId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, { name, instructorId }) {
				let course = new Course({
					name,
					instructorId
				});
				return course.save();
			}
		},
		AddInstructor: {
			type: InstructorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, { name, age }) {
				let instructor = new Instructor({
					name,
					age
				});
				return instructor.save();
			}
		}
	}
});

const RootQuery = new GraphQLObjectType({
	name: "RootQuery",
	fields: {
		course: {
			type: CourseType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				return Course.findById(id);
			}
		},
		instructor: {
			type: InstructorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				return Instructor.findById(id);
			}
		},
		courses: {
			type: new GraphQLList(CourseType),
			args: {},
			resolve(parent, args) {
				return Course.find({});
			}
		},
		instructors: {
			type: new GraphQLList(InstructorType),
			args: {},
			resolve(parent, args) {
				return Instructor.find({});
			}
		}
	}
});
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
