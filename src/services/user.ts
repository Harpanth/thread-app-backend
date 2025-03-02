import { createHmac, randomBytes } from "crypto";
import { prismaClient } from "../lib/db";
import JWT from 'jsonwebtoken'

const JWT_SECRET="dHILLON"
export interface CreateUserPayload {
    firstName: string
    lastName?: string
    email: string
    password: string
}

export interface GetUserTokenPayload {
    email: string
    password: string
}
class UserService {

    public static getUserById(id:string){
        return prismaClient.user.findUnique({where : {id }})
    }

    private static generateHash( salt: string, password: string){
        const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword
    }
    public static createuser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString("hex")

        const hashedPassword = UserService.generateHash(salt,password);
        

        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword
            }
        })
    }

    private static async getUserByEmail(email:string){
        return await prismaClient.user.findUnique({where: {email}})
    }

    public static async  getUserToken(payload: GetUserTokenPayload) {
        const { email, password } = payload

        const user = await UserService.getUserByEmail(email)
        if(!user) {
            throw new Error("User not found")
        }
        
        const userSalt = user.salt
        const userHashPassword = UserService.generateHash(userSalt, password);

        if(userHashPassword === user.password){
            const token = JWT.sign({id:user.id,email:user.email},JWT_SECRET);
            return token
        }
    }

    public static decodeJwtToken(token:string){
        try {
            return JWT.verify(token, JWT_SECRET);
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
}

export default UserService