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
    include: { hobbys: true }
  })

  res.send(users)

})

app.get('/users/:id', async (req, res) => {

  const idParam = Number(req.params.id)

  const user = await prisma.user.findFirst({
    where: { id: idParam },
    include: { hobbys: true }
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

app.delete('users/:id', async (req, res) => {

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

    res.send({"success": "User deleted"})

  }

  else {
    res.send({"error": "undefined"})
  }

})

app.patch('/users/:id', async (req, res) => {

  const idParam = req.params.id;
  const { email, fullname, photo } = req.body

  const user = await prisma.user.findFirst({
    where: {
      id: Number(idParam)
    }
  })
  
  const updatedUser = {
    email: email,
    fullname: fullname,
    photo: photo
  }

  if (user) {

    await prisma.user.update({
      where: {
        id: Number(idParam),
      },
      data: updatedUser
    })

    res.send(user)

  }

  else {
    res.send({"error": "undefined"})
  }

})
// #endregion

// #region "Hobbys endpoints"
app.get('/hobbys', async (req, res) => {

  const hobbys = await prisma.hobby.findMany({
    include: { user: true }
  })

  res.send(hobbys)

})

app.get('/hobbys/:id', async (req, res) => {

  const idParam = Number(req.params.id)

  const hobby = await prisma.hobby.findFirst({
    where: { id: idParam },
    include: { user: true }
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

app.delete('hobbys/:id', async (req, res) => {

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

  }

  else {
    res.send({"error": "undefined"})
  }

})

app.patch('/hobbys/:id', async (req, res) => {

  const idParam = req.params.id;
  const { name, description, active, image, userId } = req.body
  
  const hobby = await prisma.hobby.findFirst({
    where: {
      id: Number(idParam)
    }
  })

  const updatedHobby = {
    name: name,
    description: description,
    active: active,
    image: image,
    userId: userId
  }

  if (hobby) {

    await prisma.hobby.update({
      where: {
        id: Number(idParam),
      },
      data: updatedHobby
    })

  }

  else {
    res.send({"error": "undefined"})
  }

})
// #endregion

// #endregion

app.listen(4000, () => {
  console.log(`Server up: http://localhost:4000`)
})