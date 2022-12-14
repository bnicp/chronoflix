const { AuthenticationError } = require("apollo-server-express");
const { User, Highscores, Score } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    allUsers: async (parent, args) => {
      const highscoreData = await User.find({}).sort([
        ["highScore", "descending"],
      ]);
      return highscoreData;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        return "Can't find this user";
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return "Incorrect password.";
      }

      const token = signToken(user);

      return { token, user };
    },
    newScore: async (parent, { highScore }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $set: { highScore } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeUser: async (parent, { _id }, context) => {
      const userToRemove = await User.findOneAndDelete({
        _id: context.user._id,
      });
      return userToRemove;

      // throw new AuthenticationError('You are not logged in!')
    },
  },
};

module.exports = resolvers;
