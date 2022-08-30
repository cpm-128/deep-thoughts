# Deep Thoughts

Combine all four technologies of the MERN stack (MongoDB, Express.js, React, and Node.js) to build a social media application called Deep Thoughts. Users will be able to sign up and create an account, post their thoughts, and interact with other users, just like you might find in the social media apps you use day in and day out in real life.

## Tools
- GraphQL is a query language for APIs and a runtime for fulfilling queries with your existing data, giving clients the power to ask for exactly what they need and nothing more. For this module’s application, you’ll use the graphql package to parse GraphQL syntax in both your front-end and back-end codebase.

- Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client, the client you’ll use in your MERN application. You’ll use the apollo-server-express package to integrate GraphQL into your Express.js server, and the @apollo/client package to make requests from your React front end to the GraphQL API.

- React Router is a collection of navigational components that compose declaratively with your application, allowing you to make your single-page React applications behave more like multi-page applications. You’ll use the react-router-dom npm package to work with React Router in your applications.

- The concurrently npm package allows you to run multiple processes, or servers, from a single command-line interface. Rather than opening multiple terminals to start the multiple servers, you can run them both at the same time. It also allows you to keep track of different outputs in one place, and will stop all of your processes if even one of them fails.

- JSON Web Tokens, or JWTs, are an alternative to using session cookies for authentication. You’ll use the jsonwebtoken package in your MERN applications.

- jwt-decode is an npm package that helps decode JWTs from their Base64Url encoding. You’ll use it to extract non-sensitive data such as the token’s expiration date to see if it’s expired before making a request to the server.

- The faker npm package allows you to generate massive amounts of fake data in the development environment of your Node.js applications.

- The nodemon package simplifies your development environment by automatically restarting your Node.js applications when file changes in the directory are detected.