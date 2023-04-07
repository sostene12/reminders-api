import User from "../models/user";

export const getUsers = () => User.find();
export const getUserByEmail = (email:string) => User.findOne({email});
export const getUserBySessionToken = (sessionToken:string) => User.find({
    'authentication.sessionToken':sessionToken
});
export const getUserById = (id:string) => User.findById(id); 
export const createUser = (values:Record<string,any>) => new User(values).save().then(user => user.toObject());