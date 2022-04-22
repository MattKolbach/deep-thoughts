const express = require('express');
const { ApolloServer } = require('apollo-server-express');//import ApolloServer
const { typeDefs, resolvers } = require('./schemas');//import typeDefs and resolvers
const { authMiddleware } = require('./utils/auth');
const path = require('path');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  //create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  //start the Apollo server
  await server.start();

  //integreate our Apollo server witht he Express application as middleware
  server.applyMiddleware({ app });

  //log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

//initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
