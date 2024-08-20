import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express()

//using middlewares 

app.use(cors(
    {
        origin : process.env.ALLOW_URL ,
        credentials:true,
    }
));

app.use(cookieParser());

app.use(express.static("public"))

export { app }
