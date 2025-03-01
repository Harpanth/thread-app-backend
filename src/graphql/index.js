import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import User from "../user"; // Ensure this is correctly exported

export default async function createApolloGraphgqlServer() {
    const typeDefs = `
        type Query {
            ${User.queries}
        }
        type Mutation {
            ${User.mutations}
        }
    `;

    const resolvers = {
        Query: {
            ...User.resolvers.queries
        },
        Mutation: {
            ...User.resolvers.mutations
        }
    };

    const gqlServer = new ApolloServer({ typeDefs, resolvers });

    await gqlServer.start();
    return gqlServer;
}
