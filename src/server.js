import { buildSchema, graphql } from 'graphql';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

const app = express();

const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String! 
  }

  type Query {
    links: [Link!]!
  }
`;

const links = [
  { id: 0, url: 'https://google.com', description: 'Google' },
  { id: 1, url: 'https://github.com', description: 'GitHub' },
];

const resolvers = {
  Query: {
    links: () => links,
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
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    // rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);

console.log('server up and running on localhost:4000/graphql');
