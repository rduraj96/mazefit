import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('test', 12)
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe1@example.com',
      password,
      meals: {
        create: [
          // Day 1
          {
            day: new Date('2023-01-01'),
            name: 'Breakfast',
            calories: 350,
            protein: 10,
            carbs: 50,
            fat: 12
          },
          {
            day: new Date('2023-01-01'),
            name: 'Lunch',
            calories: 550,
            protein: 20,
            carbs: 45,
            fat: 18
          },
          {
            day: new Date('2023-01-01'),
            name: 'Dinner',
            calories: 700,
            protein: 30,
            carbs: 60,
            fat: 25
          },
          {
            day: new Date('2023-01-01'),
            name: 'Snack',
            calories: 150,
            protein: 5,
            carbs: 20,
            fat: 6
          },
          // Day 2
          {
            day: new Date('2023-01-02'),
            name: 'Breakfast',
            calories: 400,
            protein: 12,
            carbs: 55,
            fat: 15
          },
          {
            day: new Date('2023-01-02'),
            name: 'Lunch',
            calories: 600,
            protein: 22,
            carbs: 50,
            fat: 20
          },
          {
            day: new Date('2023-01-02'),
            name: 'Dinner',
            calories: 750,
            protein: 32,
            carbs: 65,
            fat: 28
          },
          {
            day: new Date('2023-01-02'),
            name: 'Snack',
            calories: 180,
            protein: 6,
            carbs: 25,
            fat: 8
          },
          // Day 3
          // ... and so on
        ]
      }
    },
    include: {
      meals: true
    }
  });
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })