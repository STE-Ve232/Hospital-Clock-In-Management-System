

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hospital = await prisma.hospital.upsert({
    where: { name: 'Demo Hospital' },
    update: {},
    create: {
      name: 'Demo Hospital'
    }
  });

  const dept = await prisma.department.create({
    data: {
      name: 'General',
      hospitalId: hospital.id
    }
  });

  await prisma.employee.create({
    data: {
      fullName: 'Demo Employee',
      hospitalId: hospital.id,
      departmentId: dept.id
    }
  });

  // NOTE: Auth is stubbed right now. When User model wiring is added,
  // this seed will also create an admin user.
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


