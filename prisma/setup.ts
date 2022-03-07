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

const userHobbys = [
  {
    userId: 1,
    hobbyId: 2
  },
  {
    userId: 1,
    hobbyId: 3
  },
  {
    userId: 3,
    hobbyId: 1
  },
  {
    userId: 3,
    hobbyId: 2
  },
  {
    userId: 2,
    hobbyId: 2
  },
  {
    userId: 2,
    hobbyId: 3
  }
]

const hobbys = [
  {
    id: 1,
    name: 'Hobby A',
    description: 'description a',
    active: true,
    image: "no.jpg"
  },
  {
    id: 2,
    name: 'Hobby B',
    description: 'description b',
    active: false,
    image: "no2.jpg"
  },
  {
    id: 3,
    name: 'Hobby C',
    description: 'description c',
    active: true,
    image: "noe.jpg"
  }
]

async function createStuff () {

  await prisma.userHobby.deleteMany()
  await prisma.user.deleteMany()
  await prisma.hobby.deleteMany()

  for (const user of users) {
    await prisma.user.create({ data: user })
  }

  for (const hobby of hobbys) {
    await prisma.hobby.create({ data: hobby })
  }

  for (const userHobby of userHobbys) {
    await prisma.userHobby.create({ data: userHobby })
  }

}

createStuff()