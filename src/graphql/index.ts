import { ApolloServer } from "@apollo/server";
import User from "./user";

async function createApolloGraphqlServer() {
  const typeDefs = `#graphql
    ${User.typeDefs}

    type Query {
      ${User.queries}
    }

    type Mutation {
      ${User.mutations}
    }
  `;

  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloGraphqlServer;
