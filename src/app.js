import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//using middlewares

app.use(
  cors({
    origin: process.env.ALLOW_URL,
    credentials: true,
  })
);

app.use(urlencoded({ limit: "20kb" })); //used to limit the data that we are getting in url.

app.use(json({limit:"20kb"}));

app.use(cookieParser());

app.use(express.static("public"));

//importing routes
import { userRouter } from "./routes/user.routes";

app.use('/users',userRouter);

export { app };
