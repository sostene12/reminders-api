import { Router } from "express";

import CreateRemindersDto from "../interfaces/create-reminder";
import Reminder from "../models/reminderController";

const route = Router();

const reminders:Reminder[] = []


route.get("/",(req,res) =>{
    res.status(200).json({data:reminders,status:"success"})
});

route.post("/",(req,res) =>{
    const {title} = req.body as CreateRemindersDto;
    const reminder = new Reminder(title);
    reminders.push(reminder)
    res.status(201).json({data:reminder,status:"success"});
})

export default route;