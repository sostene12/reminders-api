import express from "express";
import { getAllUsers } from "../controllers/users";
import { isAuthenticated } from "../middlewares";

const router = express.Router();

export default(router:express.Router) =>{
    router.get("/users",isAuthenticated,getAllUsers);
}