// app/page.tsx
import { getStudents } from './actions/studentActions';
import { Student } from '@prisma/client';
import Link from 'next/link';

export default async function Home() {
  const result = await getStudents();
  const students: Student[] = result.success && result.data ? result.data : [];

  // A palette of colors for the card borders
  const borderColorClasses = [
    'border-red-500',
    'border-green-500',
    'border-blue-500',
    'border-yellow-500',
    'border-purple-500',
    'border-pink-500',
    'border-teal-500',
    'border-indigo-500',
  ];

  const getRandomColorClass = () => {
    const randomIndex = Math.floor(Math.random() * borderColorClasses.length);
    return borderColorClasses[randomIndex];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border-b-4 border-blue-500">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-md">
            รายชื่อนักเรียน
          </h1>
          <Link
            href="/add_students"
            className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-full shadow-lg hover:bg-emerald-600 transition duration-300 transform hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
          >
            + เพิ่มนักเรียน
          </Link>
        </div>

        {/* Student List Section */}
        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {students.map(student => (
              <div
                key={student.id}
                className={`bg-white rounded-lg shadow-md p-5 transition duration-300 hover:shadow-2xl hover:scale-[1.02] border-l-4 ${getRandomColorClass()}`}
              >
                <div className="flex items-center space-x-4 mb-4">
                 
                  <div className="space-y-1">
                    <p className="font-bold text-lg text-indigo-600">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {student.major}
                    </p>
                  </div>
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
          <p className="text-center text-red-500 text-xl font-medium py-10">
            ยังไม่มีข้อมูลนักเรียนในระบบ 😔
          </p>
        )}
      </div>
    </div>
  );
}