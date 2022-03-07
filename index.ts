import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

const app = express()
app.use(cors())
app.use(express.json())

// #region 'End points API'
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

app.get('/hobbys', async (req, res) => {

  const hobbys = await prisma.post.findMany({
    include: { user: true }
  })

  res.send(hobbys)

})

app.get('/hobbys/:id', async (req, res) => {

  const idParam = Number(req.params.id)

  const hobby = await prisma.user.findFirst({
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
// #endregion

app.listen(4000, () => {
  console.log(`Server up: http://localhost:4000`)
})