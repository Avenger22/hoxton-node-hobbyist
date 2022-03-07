import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const users = [
  {
    email: 'jurgen@email.com',
    fullname: 'Jurgen Hasmeta',
    photo: "jeoej.png"
  },
  {
    email: 'person1@email.com',
    fullname: 'Person 1',
    photo: "jeoej1.png"
  },
  {
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

  for (const user of users) {
    // @ts-ignore
    await prisma.user.create({ data: user })
  }

  for (const hobby of hobbys) {
    // @ts-ignore
    await prisma.hobby.create({ data: hobby })
  }

}

createStuff()