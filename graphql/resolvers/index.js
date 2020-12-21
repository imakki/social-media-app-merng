const postsResolvers = require("./posts");
const usersResolver = require("./users");

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolvers.Mutation,
  },
};
