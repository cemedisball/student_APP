'use client';

import React, { useTransition, useState } from 'react';

interface User {
  id: string;
  username: string;
  role: string;
  createdAt: string;
}

interface UserListProps {
  users: User[];
  editUser: (userId: string, formData: FormData) => Promise<any>;
  deleteUser: (userId: string) => Promise<any>;
}

export default function UserList({ users, editUser, deleteUser }: UserListProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  async function handleEdit(userId: string, e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await editUser(userId, formData);
      if (result.success) {
        setMessage(`แก้ไขผู้ใช้ ${userId} สำเร็จ`);
      } else {
        setMessage(result.message || 'เกิดข้อผิดพลาด');
      }
    });
  }

  async function handleDelete(userId: string, e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!confirm('คุณต้องการลบผู้ใช้นี้จริงหรือไม่?')) return;

    startTransition(async () => {
      const result = await deleteUser(userId);
      if (result?.success) {
        setMessage(`ลบผู้ใช้ ${userId} สำเร็จ`);
      } else {
        setMessage(result?.message || 'เกิดข้อผิดพลาด');
      }
    });
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className="border p-4 rounded mb-4">
          <p><b>Username:</b> {user.username}</p>
          <p><b>Role:</b> {user.role}</p>
          <p><b>สร้างเมื่อ:</b> {new Date(user.createdAt).toLocaleString()}</p>

          <form onSubmit={(e) => handleEdit(user.id, e)} className="space-y-2 mt-2">
            <input name="username" defaultValue={user.username} className="border p-1 rounded w-full" required />
            <input name="password" type="password" placeholder="เปลี่ยนรหัสผ่าน (ถ้ามี)" className="border p-1 rounded w-full" />
            <select name="role" defaultValue={user.role} className="border p-1 rounded w-full">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-3 py-1 rounded mr-2">
              {isPending ? 'กำลังแก้ไข...' : 'แก้ไข'}
            </button>
          </form>

          <form onSubmit={(e) => handleDelete(user.id, e)}>
            <button type="submit" disabled={isPending} className="bg-red-600 text-white px-3 py-1 rounded mt-2">
              {isPending ? 'กำลังลบ...' : 'ลบผู้ใช้'}
            </button>
          </form>
        </li>
      ))}
      {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
    </ul>
  );
}
