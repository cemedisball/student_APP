'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { editStudent } from '../actions/studentActions'; // ปรับ path ตามจริง
import Link from 'next/link';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  major: string;
  faculty: string;
  email: string;
  phone: string;
}

interface EditStudentFormProps {
  student: Student;
}

export default function EditStudentForm({ student }: EditStudentFormProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await editStudent(student.id.toString(), formData);

    setMessage(result.message);
    setSuccess(result.success);

    if (result.success) {
      setTimeout(() => {
        router.push('/'); // หรือเปลี่ยนเป็นหน้า list นักเรียน
      }, 1500);
    }
  }

  const formFields = [
    {
      label: 'ชื่อ',
      name: 'firstName',
      placeholder: 'ชื่อจริง',
      type: 'text',
      defaultValue: student.firstName,
    },
    {
      label: 'นามสกุล',
      name: 'lastName',
      placeholder: 'นามสกุล',
      type: 'text',
      defaultValue: student.lastName,
    },
    {
      label: 'สาขา',
      name: 'major',
      placeholder: 'เช่น วิทยาการคอมพิวเตอร์',
      type: 'text',
      defaultValue: student.major,
    },
    {
      label: 'คณะ',
      name: 'faculty',
      placeholder: 'เช่น คณะวิทยาศาสตร์',
      type: 'text',
      defaultValue: student.faculty,
    },
    {
      label: 'อีเมล',
      name: 'email',
      placeholder: 'example@email.com',
      type: 'email',
      defaultValue: student.email,
    },
    {
      label: 'เบอร์โทรศัพท์',
      name: 'phone',
      placeholder: '08xxxxxxxx',
      type: 'tel',
      defaultValue: student.phone,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-2xl">
        {/* Header and Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-2xl font-extrabold text-blue-700 tracking-tight">
            กรุณาแก้ไขข้อมูลนักเรียนตามต้องการ
          </h1>
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-600 transition-colors text-3xl font-bold"
            aria-label="Close form"
          >
            &times;
          </Link>
        </div>
       

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map(({ label, name, placeholder, type, defaultValue }) => (
              <div key={name} className="relative">
                <label
                  htmlFor={name}
                  className="block text-gray-700 font-semibold mb-2"
                >
                  {label}:
                </label>
                <input
                  type={type}
                  name={name}
                  id={name}
                  required
                  placeholder={placeholder}
                  defaultValue={defaultValue}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400 transition duration-300 ease-in-out"
                />
              </div>
            ))}
          </div>

          {/* Submit Button and Message */}
          <div className="flex flex-col items-center justify-between pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              บันทึกการแก้ไข
            </button>
            {message && (
              <div
                className={`mt-6 px-4 py-2 rounded-lg text-center font-medium w-full ${
                  success
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-red-100 text-red-700 border border-red-300'
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
