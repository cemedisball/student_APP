// app/page.tsx (Server Component)

import RegisterForm from './components/RegisterForm'; // import Client Component
import { createUser } from './actions/userActions'; // import action createUser

export default async function Page() {
  // ส่งฟังก์ชัน createUser ให้ Client Component ใช้งานผ่าน props
  return <RegisterForm createUser={createUser} />;
}
