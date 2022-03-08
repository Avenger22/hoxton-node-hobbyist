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

  const users = await prisma.user.findMany({
    include: { hobbys: { include : { hobby: true } } }
  })

  res.send(users)

})

app.get('/users/:id', async (req, res) => {

  const idParam = Number(req.params.id)

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

})

app.post('/users', async (req, res) => {
    
  const { email, fullname, photo } = req.body
  
  const newUser = {
    email: email, 
    fullname: fullname, 
    photo: photo
  }

  await prisma.user.create({data: newUser})

})

app.delete('/users/:id', async (req, res) => {

  const idParam = req.params.id

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

  } catch(error) {
    res.status(404).send({message: error})
  }

})
// #endregion

// #region 'userHobbys endpoints'
app.get('/userHobbys', async (req, res) => {

  const userHobbys = await prisma.userHobby.findMany()
  res.send(userHobbys)

})

app.get('/userHobbys/:id', async (req, res) => {

  const idParam = Number(req.params.id)

  const userHobby = await prisma.userHobby.findFirst({
    where: { id: idParam }
  })

  if (userHobby) {
    res.send(userHobby)
  } 
  
  else {
    res.status(404).send({ error: 'userHobby not found.' })
  }

})

app.post('/userHobbys', async (req, res) => {
    
  const { userId, hobbyId } = req.body
  
  const newUserHobby = {
    userId: userId,
    hobbyId: hobbyId
  }

  await prisma.userHobby.create({data: newUserHobby})

})

app.delete('/userHobbys/:id', async (req, res) => {

  const idParam = req.params.id

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

  } catch(error) {
    res.status(404).send({message: error})
  }

})
// #endregion

// #region "Hobbys endpoints"
app.get('/hobbys', async (req, res) => {

  const hobbys = await prisma.hobby.findMany({
    include: { users: { include : { user: true } } }
  })

  res.send(hobbys)

})

app.get('/hobbys/:id', async (req, res) => {

  const idParam = Number(req.params.id)

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

})

app.post('/hobbys', async (req, res) => {
    
  const { name, description, active, image, userId } = req.body
  
  const newHobby = {
    name: name, 
    description: description, 
    active: active, 
    image: image, userId: userId
  }

  await prisma.hobby.create({data: newHobby})

})

app.delete('/hobbys/:id', async (req, res) => {

  const idParam = req.params.id
  
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

  } catch(error) {
    res.status(404).send({message: error})
  }

})
// #endregion

// #endregion

app.listen(4000, () => {
  console.log(`Server up: http://localhost:4000`)
})