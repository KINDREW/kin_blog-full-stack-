const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");
const app = express();
const port = process.env.PORT || 3000;

//connect to mongodb
const dbURI =
  "mongodb+srv://kin:kin1234@kinblog.xcy8kiu.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((results) => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    console.log("connect to db");
  })
  .catch((err) => {
    console.log(err);
  });
//Register view engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  // res.redirect("index");
  res.redirect("/all-blogs");
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/blogs/create", (req, res) => {
  res.render("create");
});

//posting to db
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(req.body);
});

//retrieving from db
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id).then((result) => {
    res.render("details", { blog: result, title: "Blog details" });
  });
});

//delete from db
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/all-blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});
