'use server';
import { revalidatePath } from 'next/cache';
import  prisma  from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function createUser(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;

  if (!username || !password) {
    return { success: false, message: 'username/password ห้ามว่าง' };
  }

  try {
    // ตรวจสอบ username ซ้ำ
    const exists = await prisma.user.findUnique({ where: { username } });
    if (exists) {
      return { success: false, message: 'username นี้ถูกใช้แล้ว' };
    }

    // เข้ารหัส password
    const hashed = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้ใหม่
    const user = await prisma.user.create({
      data: {
        username,
        password: hashed,
        role: role === 'admin' ? 'admin' : 'user',
      },
      select: { id: true, username: true, role: true, createdAt: true },
    });

    revalidatePath('/users'); // หรือ path ที่ต้องการรีเฟรช

    return { success: true, message: 'สมัครสมาชิกสำเร็จ', user };
  } catch (error) {
    console.error('เกิดข้อผิดพลาดขณะสมัครสมาชิก:', error);
    return { success: false, message: 'เกิดข้อผิดพลาดของเซิร์ฟเวอร์' };
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, role: true, createdAt: true },
    });
    return { success: true, data: users };
  } catch (error) {
    console.error('เกิดข้อผิดพลาดขณะดึงข้อมูลผู้ใช้:', error);
    return { success: false, message: 'เกิดข้อผิดพลาดขณะดึงข้อมูลผู้ใช้' };
  }
}

// ดึง user ตาม id
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },  // ใช้ string ตรงๆเลย
      select: { id: true, username: true, role: true, createdAt: true },
    });
    if (!user) return { success: false, message: 'ไม่พบข้อมูลผู้ใช้' };
    return { success: true, data: user };
  } catch (error) {
    console.error('เกิดข้อผิดพลาดขณะดึงข้อมูลผู้ใช้:', error);
    return { success: false, message: 'เกิดข้อผิดพลาดขณะดึงข้อมูลผู้ใช้' };
  }
}

// แก้ไข user (username, password, role)
export async function editUser(userId: string, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string | null;
  const role = formData.get('role') as string;

  if (!username || !role) {
    return { success: false, message: 'ข้อมูลไม่ถูกต้อง' };
  }

  try {
    // เช็ค username ซ้ำ (ยกเว้นตัวเอง)
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser && existingUser.id !== userId) {
  return { success: false, message: 'username นี้ถูกใช้แล้ว' };
}

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        role: role === 'admin' ? 'admin' : 'user',
        ...(hashedPassword ? { password: hashedPassword } : {}),
      },
    });

    revalidatePath('/users'); // รีเฟรชหน้า users
    return { success: true, message: 'แก้ไขผู้ใช้เรียบร้อยแล้ว' };
  } catch (error) {
    console.error('เกิดข้อผิดพลาดขณะแก้ไขผู้ใช้:', error);
    return { success: false, message: 'เกิดข้อผิดพลาดขณะแก้ไขข้อมูลผู้ใช้' };
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath('/users'); // รีเฟรชหน้า users หรือ path ที่เกี่ยวข้อง

    return { success: true, message: 'ลบผู้ใช้สำเร็จ' };
  } catch (error) {
    console.error('เกิดข้อผิดพลาดขณะลบผู้ใช้:', error);
    return { success: false, message: 'เกิดข้อผิดพลาดขณะลบผู้ใช้' };
  }
}

export async function changePassword(userId: string, oldPassword: string, newPassword: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return { success: false, message: 'ไม่พบผู้ใช้' }
    }

    // ตรวจสอบรหัสผ่านเดิม
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
    if (!isOldPasswordCorrect) {
      return { success: false, message: 'รหัสผ่านเดิมไม่ถูกต้อง' }
    }

    // เข้ารหัสรหัสผ่านใหม่
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // อัปเดตฐานข้อมูล
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    })

    return { success: true, message: 'รหัสผ่านถูกเปลี่ยนสำเร็จ' }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดขณะเปลี่ยนรหัสผ่าน:', error)
    return { success: false, message: 'เกิดข้อผิดพลาดขณะเปลี่ยนรหัสผ่าน' }
  }
}