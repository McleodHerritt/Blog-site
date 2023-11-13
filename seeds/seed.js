const sequelize = require("../config/connection");
const { Users, Blogs, Comments } = require("../models");

const userData = require("./userData.json");
const blogData = require("./userData.json");
const commentsData = require("./commentsData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogData = await Blogs.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  const commentsData = await Comments.bulkCreate(commentsData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
