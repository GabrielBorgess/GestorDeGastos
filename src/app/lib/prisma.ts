import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default prisma;

async function main() {
  const hashedPassword = await bcrypt.hash('gabriel', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'gabriel@gmail.com' },
    update: {},
    create: {
      name: 'gabriel',
      email: 'gabriel@gmail.com',
      passwordHash: hashedPassword,
    },
  })
  const sofia = await prisma.user.upsert({
    where: { email: 'sofia@gmail.com' },
    update: {},
    create: {
      name: 'sofia',
      email: 'sofia@gmail.com',
      passwordHash: hashedPassword,
    },
  })
  console.log({ admin, sofia })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })