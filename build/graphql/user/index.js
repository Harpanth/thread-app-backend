"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesdef_1 = require("./typesdef");
const queries_1 = require("./queries");
const mutations_1 = require("./mutations");
const resolvers_1 = require("./resolvers");
const User = { typeDefs: typesdef_1.typeDefs, queries: queries_1.queries, mutations: mutations_1.mutations, resolvers: resolvers_1.resolvers };
exports.default = User;
