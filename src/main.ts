import express, { NextFunction, Request, Response}  from 'express';
import {userRouter} from './routers/user.router';
import {ApiError} from './errors/api-errors'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users', userRouter)
app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500).json(err.message);
    },
);

process.on("uncaughtException", (e) => {
    console.error("uncaughtException", e.message, e.stack);
    process.exit(1);
});
app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})