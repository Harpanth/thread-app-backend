"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
    type User {
        firstName: String!
        lastName: String
        email: String!
        profileImageURL: String
    }
`;
