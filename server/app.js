const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./gql_schema/schema");

const app = express();

mongoose
	.connect("mongodb://localhost/node_gql", { useNewUrlParser: true })
	.then(() => console.log("DB connected!"))
	.catch(() => console.log("DB connection failed!"));
mongoose.set("useCreateIndex", true);

app.use(cors());

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
