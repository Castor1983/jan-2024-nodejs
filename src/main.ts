import express, { NextFunction, Request, Response}  from 'express';
import {fsService} from './fs.service';
import {userRouter} from './routers/user.router';
import {ApiError} from './errors/api-errors'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users', userRouter)
app.post('/users', async (req: Request, res: Response) =>{
    try {
        const { name, email,  age} = req.body
        const users = await fsService.read();
        const index = users.findIndex((user) =>user.email === email)
        if (index !== -1) {
            return res.status(409).json('User with this email already exists')
        }
        const newUser = {
            id: users[users.length -1].id +1,
            name,
            email,
            age
        }
        users.push(newUser)
        await fsService.write(users)

        res.status(201).json(newUser)
    }catch (e) {
        res.status(500).json(e.message)
    }

})
app.put('/users/:userId', async (req: Request, res: Response) =>{
    try {
        const {name, email,  age} = req.body
        const users = await fsService.read();
        const user = users.find(user => user.id === +req.params.userId)
        if(!user) {
            return res.status(404).json('User not found')
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (age) user.age = age;
        await fsService.write(users);
        res.status(201).json(user)

    }catch (e) {
        res.status(500).json(e.message)
    }
})
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