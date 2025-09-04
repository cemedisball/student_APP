'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '../actions/userActions';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // หรือให้เลือกได้
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role);

    const result = await createUser(formData);
    if (result.success) {
      router.push('/login'); // หรือหน้าอื่นที่ต้องการไปหลังสมัครสำเร็จ
    } else {
      setError(result.message || 'สมัครไม่สำเร็จ');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {/* เพิ่ม select role ถ้าต้องการ */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">สมัคร</button>
    </form>
  );
}
