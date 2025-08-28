import EditStudentForm from '../../components/EditStudentForm';
import { getStudentById } from '../../actions/studentActions';

interface Props {
  params: { id: string };
}

export default async function EditStudentPage({ params }: Props) {
  const result = await getStudentById(Number(params.id));

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">ไม่พบข้อมูลนักเรียน</h1>
          <p className="text-gray-600">กรุณาตรวจสอบลิงก์หรือลองใหม่อีกครั้ง</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          แก้ไขข้อมูลนักเรียน
        </h1>
        <EditStudentForm student={result.data} />
      </div>
    </div>
  );
}
