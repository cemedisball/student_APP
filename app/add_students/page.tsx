// app/add-student/page.tsx
import AdmissionForm from '../components/AdmissionForm';

export default function AddStudentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 drop-shadow-lg tracking-tight">
          เพิ่มข้อมูลนักเรียน
        </h1>
      </div>
      <AdmissionForm />
    </div>
  );
}
