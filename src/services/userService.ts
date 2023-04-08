import User from "../models/user";

export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => User.find({
    'authentication.sessionToken': sessionToken
});
export const getUserById = (id: string) => User.findById(id);
export const createUser = (values: Record<string,any>) => new User(values).save().then(user => user.toObject());
export const deleteUserById = (id:string) => User.findOneAndDelete({_id:id});
export const updateUserById = (id:string,values:Record<string,any>) => User.findByIdAndUpdate(id,values);