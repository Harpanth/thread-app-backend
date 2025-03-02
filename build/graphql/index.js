"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const user_1 = __importDefault(require("./user"));
function createApolloGraphqlServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const typeDefs = `#graphql
    ${user_1.default.typeDefs}

    type Query {
      ${user_1.default.queries}
    }

    type Mutation {
      ${user_1.default.mutations}
    }
  `;
        const gqlServer = new server_1.ApolloServer({
            typeDefs,
            resolvers: {
                Query: Object.assign({}, user_1.default.resolvers.queries),
                Mutation: Object.assign({}, user_1.default.resolvers.mutations),
            },
        });
        yield gqlServer.start();
        return gqlServer;
    });
}
exports.default = createApolloGraphqlServer;
