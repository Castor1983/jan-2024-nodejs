const express = require('express')
const app = express()
const {users} = require('./Users')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users', (req, res) =>{
    try {
        res.json(users)
    }catch (e) {
        res.status(400).json(e.message)
    }

})
app.post('/users', (req, res) =>{
    try {
        const {id, name, email,  age} = req.body
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
        res.status(201).json(newUser)
    }catch (e) {
        res.status(400).json(e.message)
    }

})
app.get('/users/:userId', (req, res) =>{
    try {
       const user = users.find(user => user.id === +req.params.userId)
       if(!user) {
           return res.status(404).json('User not found')
       }
        res.json(user)
    }catch (e) {
        res.status(400).json(e.message)
    }
})
app.put('/users/:userId', (req, res) =>{
    try {
        const user = users.find(user => user.id === +req.params.userId)
        const {name, email,  age} = req.body
        if(!user) {
            return res.status(404).json('User not found')
        }
       if (name) user.name = name;
       if (email) user.email = email;
       if (age) user.age = age;
        res.json(user)
    }catch (e) {
        res.status(400).json(e.message)
    }
})
app.delete('/users/:userId', (req, res) =>{
    try {
        const index = users.findIndex((user) =>user.id=== +req.params.userId)
        if (index !== -1) {
            return res.status(404).json('User not found')
        }
        users.splice(index, 1);
        res.sendStatus(204);
    }catch (e) {
        res.status(400).json(e.message)
    }
})
app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})