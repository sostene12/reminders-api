import { Request,Response } from "express";
import { getUsers,getUserById,deleteUserById,updateUserById } from "../services/userService";

export const getAllUsers = async (req:Request,res:Response) =>{
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateUser = async (req:Request,res:Response) =>{
    try {
        const {username} = req.params;
        const user = await getUserById(req.params.id);
        user.username = username;
        await user?.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req:Request,res:Response) =>{
    try {
        const user = await getUserById(req.params.id);
        if(!user){
            return res.status(404).json("user not found")
        }
        const deletedUser = await deleteUserById(req.params.id);
        return res.status(200).json(deletedUser);
    } catch (error) {
        return res.sendStatus(400)
    }
}