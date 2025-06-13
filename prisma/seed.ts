import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: 'adminpassword', // TODO: Change to a secure hash in production
      name: 'Admin User',
      role: 'insider',
      bio: 'Default admin user',
      avatar: 'https://example.com/avatar.jpg',
      github: 'https://github.com/admin',
      linkedin: 'https://linkedin.com/in/admin',
      twitter: 'https://twitter.com/admin',
      website: 'https://example.com'
    }
  })
  console.log('Seeded user:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 