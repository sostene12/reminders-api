import express from "express";
import { createUser,getUserByEmail } from "../services/userService";
import { random,authentication } from "../helpers";

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