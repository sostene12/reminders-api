import express from "express";

import remindersRoute from "./src/routes/reminder"

const app = express();
app.use(express.json())

app.use("/reminders",remindersRoute);

app.listen(5000,() => console.log("server is running on port 5000"));