'use client';

import Link from 'next/link';
import { Student } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { deleteStudent } from './actions/studentActions'; // ปรับ path ให้ถูกต้อง
import DeleteStudentButton from './components/DeleteStudentButton'; // ปรับ path ตามตำแหน่งไฟล์จริง


interface Props {
  students: Student[];
}

export default function StudentList({ students }: Props) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: number) {
    if (!confirm('คุณต้องการลบนักเรียนคนนี้หรือไม่?')) return;

    setLoadingId(id);
    setError(null);

    startTransition(async () => {
      const result = await deleteStudent(id.toString());

      if (result.success) {
        alert(result.message);
        router.refresh(); // รีเฟรชข้อมูลหน้า
      } else {
        setError(result.message);
      }

      setLoadingId(null);
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border-b-4 border-blue-500">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-md">รายชื่อนักเรียน</h1>
          <Link
            href="/add_students"
            className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-full shadow-lg hover:bg-emerald-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
          >
            + เพิ่มนักเรียน
          </Link>
        </div>

        {error && <p className="text-center text-red-500 font-semibold mb-4">{error}</p>}

        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-lg shadow-md p-5 transition duration-300 hover:shadow-2xl hover:scale-[1.02] border-l-4 border-blue-500"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="space-y-1 flex-grow">
                    <p className="font-bold text-lg text-indigo-600">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{student.major}</p>
                  </div>

                  <Link
  href={`/edit_student/${student.id}`}
  className="px-4 py-1.5 text-sm font-semibold text-blue-600 border border-blue-500 rounded-full
             hover:bg-blue-100 hover:text-blue-800 transition duration-200 mr-2"
>
  แก้ไข
</Link>

                  {/* <button
                    onClick={() => handleDelete(student.id)}
                    disabled={loadingId === student.id || isPending}
                    className={`text-red-600 hover:text-red-800 font-semibold ${
                      loadingId === student.id || isPending ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loadingId === student.id && isPending ? 'กำลังลบ...' : 'ลบ'}
                  </button> */}
                  <DeleteStudentButton studentId={student.id} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-indigo-600 w-24">อีเมล:</p>
                    <p className="text-gray-700 break-all">{student.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-indigo-600 w-24">คณะ:</p>
                    <p className="text-gray-700">{student.faculty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-indigo-600 w-24">เบอร์โทรศัพท์:</p>
                    <p className="text-gray-700">{student.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500 text-xl font-medium py-10">ยังไม่มีข้อมูลนักเรียนในระบบ 😔</p>
        )}
      </div>
    </div>
  );
}
