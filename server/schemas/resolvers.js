// functions connected to each query or mutation that perform the CRUD actions

const { User, Thought } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // GET all thoughts
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        // GET single thought by id
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // GET all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        // GET single user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Credentials are invalid.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Credentials are invalid.');
            }

            return user;
        }
    }
};

module.exports = resolvers;