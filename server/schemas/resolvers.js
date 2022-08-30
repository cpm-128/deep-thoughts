// functions connected to each query or mutation that perform the CRUD actions

const resolvers = {
    Query: {
        helloWorld: () => {
            return 'Hello, world!'
        }
    }
};

module.exports = resolvers;