import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import http from "http";

import connectDb from "./database/db";
import router from "./router";

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(cookieParser());
const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port,():void=>{
    console.log(`server is listening on port:${port}`);
    connectDb();
});

app.use("/",router());
