import UserService, { CreateUserPayload, GetUserTokenPayload } from "../services/user"

const queries = {
    getuserToken: async(_:any,payload:GetUserTokenPayload) => {
        const token = await UserService.getUserToken({
            email:payload.email,
            password: payload.password
        })

        return token;
    }
}

const mutations = {
    createUser: async(_:any, payload:CreateUserPayload) => {
        const res = await UserService.createuser(payload);
        return res.id;
    }
}

export const resolvers = {queries, mutations}