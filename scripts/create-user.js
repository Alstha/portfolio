const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    const user = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        bio: 'Default admin user',
        avatar: 'https://example.com/avatar.jpg',
        github: 'https://github.com/admin',
        linkedin: 'https://linkedin.com/in/admin',
        twitter: 'https://twitter.com/admin',
        website: 'https://example.com'
      }
    })
    console.log('Created user:', user)
  } catch (error) {
    console.error('Error creating user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 