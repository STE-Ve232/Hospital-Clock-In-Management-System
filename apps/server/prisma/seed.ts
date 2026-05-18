import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // 1. Create a Default Hospital
  const hospital = await prisma.hospital.upsert({
    where: { id: 'default-hosp' },
    update: {},
    create: {
      id: 'default-hosp',
      name: 'General City Hospital',
    },
  });

  // 2. Create a Default Department
  await prisma.department.upsert({
    where: { id: 'default-dept' },
    update: {},
    create: {
      id: 'default-dept',
      name: 'Emergency Room',
      hospitalId: hospital.id,
    },
  });

  // 3. Create an Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@hcm.com' },
    update: {},
    create: {
      email: 'admin@hcm.com',
      passwordHash: hashedPassword,
      role: 'ADMIN',
      hospitalId: hospital.id,
    },
  });

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });