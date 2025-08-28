'use client';

import { useTransition } from 'react';
import { deleteStudent } from '../actions/studentActions';

export default function DeleteStudentButton({ studentId }: { studentId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm('คุณต้องการลบนักเรียนนี้ใช่หรือไม่?')) return;

    startTransition(async () => {
      const result = await deleteStudent(studentId.toString());
      alert(result.message);
      if (result.success) {
        window.location.reload(); // รีโหลดหน้าเพื่ออัปเดตข้อมูล
      }
    });
  };
  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 
        ${isPending
          ? 'bg-red-400 text-white cursor-not-allowed opacity-70'
          : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
    >
      {isPending ? 'กำลังลบ...' : 'ลบ'}
    </button>
  );
}
