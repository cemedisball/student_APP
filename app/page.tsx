// app/page.tsx (Server Component, async ได้)
import { getStudents } from './actions/studentActions';
import { Student } from '@prisma/client';
import StudentList from './StudentList'; // import Client Component

export default async function Home() {
  const result = await getStudents();
  const students: Student[] = result.success && result.data ? result.data : [];

  return <StudentList students={students} />;
}
