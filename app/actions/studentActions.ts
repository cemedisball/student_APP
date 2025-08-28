'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function getStudents() {
  try {
    const students = await prisma.student.findMany();
    return { success: true, data: students };
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    return { success: false, message: 'เกิดข้อผิดพลาดขณะดึงข้อมูล' };
  }
}


export async function createStudent(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const major = formData.get('major') as string;
  const faculty = formData.get('faculty') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  // 🔍 Validation แบบพื้นฐาน
  if (!firstName || !lastName || !major || !faculty || !email || !phone) {
    return { success: false, message: 'ข้อมูลไม่ถูกต้อง' };
  }

  try {
    await prisma.student.create({
      data: {
        firstName,
        lastName,
        major,
        faculty,
        email,
        phone,
      },
    });

    revalidatePath('/students'); // หรือหน้าแสดงผลอื่น
    return { success: true, message: 'เพิ่มนักเรียนเรียบร้อยแล้ว' };
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Prisma error: unique constraint failed
      return { success: false, message: 'อีเมลนี้ถูกใช้ไปแล้ว' };
    }

    console.error('เกิดข้อผิดพลาด:', error);
    return { success: false, message: 'เกิดข้อผิดพลาดขณะบันทึกข้อมูล' };
  }
}

