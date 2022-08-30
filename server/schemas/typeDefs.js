// define every piece of data that the client can expect to work with

// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create out typeDefs
const typeDefs = gql`
    type Query {
        helloWorld: String
    }
`;

// export the typeDefs
module.exports=typeDefs;