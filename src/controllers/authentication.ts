import express from "express";
import { createUser,getUserByEmail } from "../services/userService";
import { random,authentication } from "../helpers";

export const login = async (req:express.Request,res:express.Response) => {
    try {
        const {email,password} = req.body;
        const user = await getUserByEmail(email)
        .select('+authentication.salt +authentication.password' );
        if(!user){
            return res.status(404).json("user not found");
        }
        const expectedHash = authentication(user.authentication.salt,password);
        if(user.authentication?.password !== expectedHash){
            return res.sendStatus(403);
        }
        const salt = random();
         user.authentication.sessionToken = authentication(salt,user._id.toString());
         await user.save();
         res.cookie("token-cookie",user.authentication.sessionToken,{domain:'localhost',path:'/'});
         return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const register = async (req:express.Request,res:express.Response) =>{
    try {
        const {email,password,username} = req.body;
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.status(400).json("user exists");
        }
        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication:{
                salt,
                password:authentication(salt,password)
            } 
        });
        return res.status(201).json(user).end();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}