const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const routes = require("./controller");

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars with default configurations.
const hbs = exphbs.create({});

// Set Handlebars as the view engine for rendering templates.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware to parse incoming request bodies and static files serving.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
