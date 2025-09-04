'use client';

import React, { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation'; // import useRouter

interface UserFormProps {
  createUser: (formData: FormData) => Promise<any>;
}

export default function UserForm({ createUser }: UserFormProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter(); // สร้าง router instance

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    startTransition(async () => {
      const result = await createUser(formData);
      if (result.success) {
        setMessage('เพิ่มผู้ใช้สำเร็จ');
        form.reset();
        router.push('/admin'); // รีไดเรคไปหน้า admin หลังเพิ่มเสร็จ
      } else {
        setMessage(result.message || 'เกิดข้อผิดพลาด');
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2 mb-6">
      <input name="username" placeholder="Username" className="border p-2 rounded w-full" required />
      <input name="password" type="password" placeholder="Password" className="border p-2 rounded w-full" required />
      <select name="role" className="border p-2 rounded w-full">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" disabled={isPending} className="bg-green-600 text-white px-4 py-2 rounded">
        {isPending ? 'กำลังเพิ่ม...' : 'เพิ่มผู้ใช้'}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}
