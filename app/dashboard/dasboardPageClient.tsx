// app/dashboard/DashboardPageClient.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'  // ใช้ useRouter จาก next/navigation
import { changePassword } from '../actions/userActions'

export default function DashboardPageClient({ session }: { session: any }) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()  // สร้าง router

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setMessage('กรุณากรอกรหัสผ่านทั้งหมด')
      return
    }

    if (newPassword !== confirmNewPassword) {
      setMessage('รหัสผ่านใหม่ไม่ตรงกัน')
      return
    }

    if (!session?.user?.id) {
      setMessage('ไม่พบผู้ใช้')
      return
    }

    const response = await changePassword(session.user.id, oldPassword, newPassword)

    if (response.success) {
      setMessage('เปลี่ยนรหัสผ่านสำเร็จ')
    } else {
      setMessage(response.message)
    }
  }

  const handleGoBack = () => {
    router.push('/')  // ไปที่หน้า /
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>ยินดีต้อนรับ: {session?.user?.username}</p>
      <p>บทบาท: {session?.user?.role}</p>

      <form onSubmit={handleChangePassword} className="mt-6">
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-sm font-semibold">รหัสผ่านเดิม</label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-semibold">รหัสผ่านใหม่</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmNewPassword" className="block text-sm font-semibold">ยืนยันรหัสผ่านใหม่</label>
          <input
            id="confirmNewPassword"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded"
        >
          เปลี่ยนรหัสผ่าน
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-red-500">{message}</p>}

      {/* เพิ่มปุ่มย้อนกลับไปที่หน้า / */}
      <button
        onClick={handleGoBack}
        className="mt-4 p-2 bg-gray-500 text-white rounded"
      >
        ย้อนกลับ
      </button>
    </div>
  )
}
