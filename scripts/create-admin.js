const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10)

    // Create the admin user
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'insider',
        bio: 'Default admin user',
        avatar: 'https://example.com/avatar.jpg',
        github: 'https://github.com/admin',
        linkedin: 'https://linkedin.com/in/admin',
        twitter: 'https://twitter.com/admin',
        website: 'https://example.com'
      }
    })

    console.log('Admin user created:', admin)
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 