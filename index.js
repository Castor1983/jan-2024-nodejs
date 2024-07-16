const express = require('express')
const app = express()
const {read, write} = require('./fs.service')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users', async (req, res) =>{
    try {
        const users = await read();
        res.json(users)
    }catch (e) {
        res.status(500).json(e.message)
    }

})
app.post('/users', async (req, res) =>{
    try {
        const {id, name, email,  age} = req.body
        const users = await read();
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
        await write(users)

        res.status(201).json(newUser)
    }catch (e) {
        res.status(500).json(e.message)
    }

})
app.get('/users/:userId', async (req, res) =>{
    try {
        const users = await read();
        const user = users.find(user => user.id === +req.params.userId)
       if(!user) {
           return res.status(404).json('User not found')
       }
        res.json(user)
    }catch (e) {
        res.status(500).json(e.message)
    }
})
app.put('/users/:userId', async (req, res) =>{
    try {
        const {name, email,  age} = req.body
        const users = await read();
        const user = users.find(user => user.id === +req.params.userId)
        if(!user) {
            return res.status(404).json('User not found')
        }

       if (name) user.name = name;
       if (email) user.email = email;
       if (age) user.age = age;
        await write(users);
        res.status(201).json(user)

    }catch (e) {
        res.status(500).json(e.message)
    }
})
app.delete('/users/:userId', async (req, res) =>{
    try {
        const users = await read();
        const index = users.findIndex(user => user.id === +req.params.userId)
        if (index === -1) {
            return res.status(404).json('User not found')
        }
        users.splice(index, 1);
        await write(users)
        res.sendStatus(204);
    }catch (e) {
        res.status(500).json(e.message)
    }
})
app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})