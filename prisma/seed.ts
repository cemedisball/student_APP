// import { PrismaClient } from '../app/generated/prisma';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const students = [
    {
      firstName: 'สมชาย',
      lastName: 'ใจดี',
      major: 'วิทยาการคอมพิวเตอร์',
      faculty: 'วิทยาศาสตร์',
      email: 'somchai@example.com',
      phone: '0812345678',
    },
    {
      firstName: 'สมหญิง',
      lastName: 'รักเรียน',
      major: 'วิศวกรรมศาสตร์',
      faculty: 'วิศวกรรม',
      email: 'somying@example.com',
      phone: '0898765432',
    },
    {
      firstName: 'จิตร',
      lastName: 'ประเสริฐ',
      major: 'เศรษฐศาสตร์',
      faculty: 'สังคมศาสตร์',
      email: 'jit@example.com',
      phone: '0823456789',
    },
  ];

  for (const student of students) {
    await prisma.student.create({
      data: student,
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
