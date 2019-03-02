const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	age: {
		type: Number,
		required: true
	}
});
module.exports = mongoose.model("Instructor", InstructorSchema);
