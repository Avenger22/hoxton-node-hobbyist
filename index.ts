// #region 'Importing and configuration of Prisma'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

const app = express()
app.use(cors())
app.use(express.json())
// #endregion

// #region 'End points API'

// #region 'Users endpoints'
app.get('/users', async (req, res) => {

  try {

    const users = await prisma.user.findMany({
      include: { hobbys: { include : { hobby: true } } }
    })

    res.send(users)

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<pre>${error.message}</pre>`)
  }

})

app.get('/users/:id', async (req, res) => {

  const idParam = Number(req.params.id)

  try {

    const user = await prisma.user.findFirst({
      where: { id: idParam },
      include: { hobbys: { include : { hobby: true } } }
    })

    if (user) {
      res.send(user)
    } 
    
    else {
      res.status(404).send({ error: 'User not found.' })
    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.post('/users', async (req, res) => {
    
  const { email, fullname, photo } = req.body
  
  const newUser = {
    email: email, 
    fullname: fullname, 
    photo: photo
  }

  try {

    const userCheck = await prisma.user.findFirst({ where: { email: newUser.email } })
    
    if (userCheck) {
      res.status(404).send({ error: 'User has an already registered email try different email.' })
    }

    else {
      const createdUser = await prisma.user.create({data: newUser})
      res.send(createdUser)
    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.delete('/users/:id', async (req, res) => {

  const idParam = req.params.id

  try {

    const user = await prisma.user.findFirst({
      where: {
        id: Number(idParam)
      }
    })

    if (user) {

      await prisma.user.delete({ 
        where: { id: Number(idParam) }
      })

      res.send({ message: 'user deleted.' })

    }

    else {
      res.status(404).send({ error: 'user not found.' })
    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.patch('/users/:id', async (req, res) => {

  const idParam = req.params.id;
  const { email, fullname, photo } = req.body

  const userData = {
    email: email,
    fullname: fullname,
    photo: photo
  }

  try {

    const user = await prisma.user.update({
      where: {
        id: Number(idParam),
      },
      data: userData
    })

    res.send(user)

  } 
  
  catch(error) {
    res.status(404).send({message: error})
  }

})
// #endregion

// #region 'userHobbys endpoints'
app.get('/userHobbys', async (req, res) => {

  try {
    const userHobbys = await prisma.userHobby.findMany()
    res.send(userHobbys)
  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.get('/userHobbys/:id', async (req, res) => {

  const idParam = Number(req.params.id)

  try {

    const userHobby = await prisma.userHobby.findFirst({
      where: { id: idParam }
    })

    if (userHobby) {
      res.send(userHobby)
    } 
    
    else {
      res.status(404).send({ error: 'userHobby not found.' })
    }

  }

  catch(error){
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.post('/userHobbys', async (req, res) => {
    
  const { userId, hobbyId } = req.body
  
  const newUserHobby = {
    userId: userId,
    hobbyId: hobbyId
  }

  try {

    const userHobbyCheck = await prisma.userHobby.findFirst({ where: { userId: newUserHobby.userId, hobbyId: newUserHobby.hobbyId } })
    
    if (userHobbyCheck) {
      res.status(404).send({ error: 'UserHobby has an already registered id combination try different combination.' })
    }

    else {
      const createdUserHobby = await prisma.userHobby.create({data: newUserHobby})
      res.send(createdUserHobby)
    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.delete('/userHobbys/:id', async (req, res) => {

  const idParam = req.params.id

  try {

    const userHobby = await prisma.userHobby.findFirst({
      where: {
        id: Number(idParam)
      }
    })

    if (userHobby) {

      await prisma.userHobby.delete({ 
        where: { id: Number(idParam) }
      })

      res.send({ message: 'userHobby deleted.' })

    }

    else {
      res.status(404).send({ error: 'userHobby not found.' })
    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.patch('/userHobbys/:id', async (req, res) => {

  const idParam = req.params.id;
  const { userId, hobbyId } = req.body

  const userHobbyData = {
    userId: userId,
    hobbyId: hobbyId
  }

  try {

    const userHobby = await prisma.userHobby.update({
      where: {
        id: Number(idParam),
      },
      data: userHobbyData
    })

    res.send(userHobby)

  } 
  
  catch(error) {
    res.status(404).send({message: error})
  }

})
// #endregion

// #region "Hobbys endpoints"
app.get('/hobbys', async (req, res) => {

  try {

    const hobbys = await prisma.hobby.findMany({
      include: { users: { include : { user: true } } }
    })

    res.send(hobbys)

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.get('/hobbys/:id', async (req, res) => {

  const idParam = Number(req.params.id)

  try {

    const hobby = await prisma.hobby.findFirst({
      where: { id: idParam },
      include: { users: { include : { user: true } } }
    })

    if (hobby) {
      res.send(hobby)
    } 
    
    else {
      res.status(404).send({ error: 'Hobby not found.' })
    }

  }

  catch(error){
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.post('/hobbys', async (req, res) => {
    
  const { name, description, active, image, userId } = req.body
  
  const newHobby = {
    name: name, 
    description: description, 
    active: active, 
    image: image, userId: userId
  }

  try {

    const hobyCheck = await prisma.hobby.findFirst({ where: { name: newHobby.name } })
    
    if (hobyCheck) {
      res.status(404).send({ error: 'Hobby has an already registered name try different name.' })
    }

    else {
      const createdHobby = await prisma.hobby.create({data: newHobby})
      res.send(createdHobby)
    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.delete('/hobbys/:id', async (req, res) => {

  const idParam = req.params.id
  
  try {

    const hobby = await prisma.hobby.findFirst({
      where: {
        id: Number(idParam)
      }
    })

    if (hobby) {

      await prisma.hobby.delete({ 
        where: { id: Number(idParam) }
      })

      res.send({ message: 'hobby deleted.' })

    }

    else {
      res.status(404).send({ error: 'hobby not found.' })
    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.patch('/hobbys/:id', async (req, res) => {

  const idParam = req.params.id;
  const { name, description, active, image, userId } = req.body
  
  const hobbyData = {
    name: name,
    description: description,
    active: active,
    image: image,
    userId: userId
  }

  try {

    const hobby = await prisma.hobby.update({
      where: {
        id: Number(idParam),
      },
      data: hobbyData
    })

    res.send(hobby)

  } 
  
  catch(error) {
    res.status(404).send({message: error})
  }

})
// #endregion

// #endregion

app.listen(4000, () => {
  console.log(`Server up: http://localhost:4000`)
})