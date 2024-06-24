// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by either their id or their username
  async getSingleUser({ context }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: context.user._id }],
    });

    if (!foundUser) {
      return ({ message: 'Cannot find a user with this id!' });
    }

    return (foundUser);
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser({ username, email, password }, res) {
    const user = await User.create({
      username, 
      email,
      password
    });
    console.log(user)
    if (!user) {
      return ({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    return { token, user };
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ email, password }, res) {
    const user = await User.findOne({ $or: [{ email: email}] });
    if (!user) {
      return ({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      return ({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    return { token, user };
  },
  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
  async saveBook({ bookInput, context }, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: bookInput } },
        { new: true, runValidators: true }
      );
      return (updatedUser);
    } catch (err) {
      console.log(err);
      return (err);
    }
  },
  // remove a book from `savedBooks`
  async deleteBook({bookId, context}, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: context.user._id },
      { $pull: { savedBooks: { bookId: bookId} } },
      { new: true }
    );
    if (!updatedUser) {
      return ({ message: "Couldn't find user with this id!" });
    }
    return (updatedUser);
  },
};
