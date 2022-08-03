const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return User.findOne({
        $or: [{ _id: context.user._id }, { username: context.user.username }],
      });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        return "Something is wrong!";
      }
      const token = signToken(user);
      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({
        $or: [{ email: email }, { password: password }],
      });
      if (!user) {
        return "Can't find this user";
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return "Wrong password!";
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookToSave }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: bookToSave } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    deleteBook: async (parent, { bookId }, context) => {
      console.log(context.user._id);
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );

      console.log(updatedUser);
      if (!updatedUser) {
        return "Couldn't find user with this id!";
      }
      console.log(updatedUser);
      return updatedUser;
    },
  },
};

module.exports = resolvers;
