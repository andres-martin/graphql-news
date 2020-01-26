import { buildSchema, graphql } from 'graphql';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { find } from 'lodash';

const typeDefs = `
  type Link {
    id: Int!
    url: String!
    description: String
  }
  
  type User {
    id: Int!
    username: String!
    about: String
  }

  type Query {
    allLinks: [Link],
    link(id: Int!): Link
    allUsers: [User]
    user(id: Int!): User
  }
`;

const links = [
  { id: 0, url: 'https://google.com', description: 'Google' },
  { id: 1, url: 'https://github.com', description: 'GitHub' },
];

const users = [
  { id: 0, username: 'user1', about: 'The first user' },
  { id: 1, username: 'user2', about: 'The second user' },
];

const resolvers = {
  Query: {
    allLinks: () => links,
    link: (_, { id }) => find(links, { id }),
    allUsers: () => users,
    user: (_, { id }) => find(users, { id }),
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// const root = {
//   hello: () => 'Hello, World!',
// };

// graphql(schema, '{ hello }', root).then(response => {
//   console.log(response);
// });

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    // rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => console.log('server up and running on localhost:4000/graphql'));
