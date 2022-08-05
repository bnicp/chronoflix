const { AuthenticationError } = require('apollo-server-express');
const { User, Highscores, Score } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    allUsers: async (parent, args) => {
      
        const highscoreData = await User.find({});
        return highscoreData
      
    },
    highscores: async (parent, args) => {
      const highscoreData = await Score.find({}).sort([['score', 'descending']]);
        return highscoreData
    },

    // med_highscores: async (parent, args) => {
    //   const highscoreData = await Score.find({ difficulty: "medium" }).sort([['score', 'descending']]);
    //     return highscoreData
    // },

    // hard_highscores: async (parent, args) => {
    //   const highscoreData = await Score.find({ difficulty: "hard" }).sort([['score', 'descending']]);
    //     return highscoreData
    // }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { newBook }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: newBook }},
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId }}},
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
