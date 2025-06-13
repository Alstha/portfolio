const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findFirst({ where: { email: 'admin@portfolio.com' } });
  if (!existing) {
    await prisma.user.create({
      data: {
        email: 'admin@portfolio.com',
        password: 'admin123', // You should hash this in production!
        name: 'Admin',
        role: 'insider',
      }
    });
    console.log('Default admin user created.');
  } else {
    console.log('Admin user already exists.');
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect()); 