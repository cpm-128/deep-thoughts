// functions connected to each query or mutation that perform the CRUD actions

const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // GET all thoughts
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find().sort({ createdAt: -1 });
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
    }
};

module.exports = resolvers;