import Link from 'next/link';  // import Link จาก next.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { editUser, deleteUser } from '../actions/userActions'; // เอา createUser ออก เพราะย้ายไปหน้าอื่นแล้ว
import UserList from '../components/UserList';

interface User {
  id: string;
  username: string;
  role: string;
  createdAt: string;
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) return <p>กรุณาเข้าสู่ระบบก่อน</p>;
  if (session.user?.role !== 'admin') return <p>คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>;

  const rawUsers = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      createdAt: true,
    },
  });

  const users: User[] = rawUsers.map(user => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Area</h1>

      {/* ปุ่มกดลิงก์ไปหน้าเพิ่มผู้ใช้ */}
      <Link href="/users/create">
        <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          เพิ่มผู้ใช้ใหม่
        </button>
      </Link>

      {/* ปุ่มกลับไปหน้า Admin */}
      <Link href="/">
        <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ย้อนกลับ
        </button>
      </Link>

      {/* แสดงรายชื่อผู้ใช้ */}
      <UserList users={users} editUser={editUser} deleteUser={deleteUser} />
    </div>
  );
}
