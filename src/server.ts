import { createServer } from 'restify';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';

import corsMiddleware from 'restify-cors-middleware';

import fs from 'fs';
import path from 'path';

import { Resolvers } from './graphql';

const typeDefs = fs
  .readFileSync(path.resolve(path.join(__dirname, '../graphql/schema.graphql')))
  .toString();

const resolvers: Resolvers = {
  Query: {
    hello: (_, arg) => {
      return arg.name == null ? 'hello!!' : `hello ${arg.name}!!`;
    },
  },
  Mutation: {
    createThread: (_, arg) => {
      console.log(arg.title);
      return true;
    },
  },
};

// 参考: https://github.com/graphql/express-graphql/issues/473
const schema = makeExecutableSchema({
  typeDefs,
  // 参考: https://github.com/dotansimha/graphql-code-generator/issues/1133
  resolvers: resolvers as IResolvers,
});

const server = createServer();

// TODO: リモートにデプロイする場合は検討
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry'],
});

server.pre(cors.preflight);
server.use(cors.actual);

server.get(
  '/graphql',
  graphqlHTTP({
    schema,
    // context: { db }
    graphiql: true,
  })
);
server.post(
  '/graphql',
  graphqlHTTP({
    schema,
    // context: { db },
    graphiql: false,
  })
);

server.head('/graphql', (req, res, next) => {
  res.send('close');
  next();
});

server.listen(8080, () => {
  console.log('listen port=8080');
});
