const {ApolloServer} = require("apollo-server-express");
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { typeDefs, resolvers } = require("./schema");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// create Server
const server = new ApolloServer({typeDefs,resolvers});

(async () => {
  await server.start()
  server.applyMiddleware({
    app,path: "/graphql"
  })
})()
// app.use(routes);

// updated message
app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}${server.graphqlPath}`));

// db.once('open', () => {
// });

