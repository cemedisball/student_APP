'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm({ createUser }: { createUser: (formData: FormData) => Promise<any> }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role);

    try {
      const result = await createUser(formData);
      if (result.success) {
        router.push('/login'); // ไปหน้า login หลังสมัครเสร็จ
      } else {
        setError(result.message || 'สมัครสมาชิกไม่สำเร็จ');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาด ไม่สามารถสมัครสมาชิกได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">สมัครสมาชิก</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p>มีบัญชีแล้ว? 
          <button
            onClick={() => router.push('/login')}
            className="text-blue-600 hover:underline ml-2"
            type="button"
          >
            เข้าสู่ระบบ
          </button>
        </p>
      </div>
    </div>
  );
}
