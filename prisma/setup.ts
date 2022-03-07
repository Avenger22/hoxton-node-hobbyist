import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const users = [
  {
    id: 1,
    email: 'jurgen@email.com',
    fullname: 'Jurgen Hasmeta',
    photo: "jeoej.png"
  },
  {
    id: 2,
    email: 'person1@email.com',
    fullname: 'Person 1',
    photo: "jeoej1.png"
  },
  {
    id: 3,
    email: 'person2@email.com',
    fullname: 'Person2',
    photo: "jeoej2.png"
  }
]

const hobbys = [
  {
    name: 'Hobby A',
    description: 'description a',
    active: true,
    image: "no.jpg",
    userId: 1
  },
  {
    name: 'Hobby B',
    description: 'description b',
    active: false,
    image: "no2.jpg",
    userId: 1
  },
  {
    name: 'Hobby C',
    description: 'description c',
    active: true,
    image: "noe.jpg",
    userId: 2
  }
]

async function createStuff () {

  await prisma.user.deleteMany()
  await prisma.hobby.deleteMany()

  for (const user of users) {
    await prisma.user.create({ data: user })
  }

  for (const hobby of hobbys) {
    await prisma.hobby.create({ data: hobby })
  }

}

createStuff()