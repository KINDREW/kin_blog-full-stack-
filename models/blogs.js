const mongoose = require("mongoose");
const schemma = mongoose.Schema;

const blogSchemma = schemma(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("kinblog", blogSchemma);
module.exports = Blog;
