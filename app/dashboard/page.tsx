// app/dashboard/page.tsx

// Server Component
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import DashboardPageClient from './dasboardPageClient'

async function DashboardPage() {
  // ดึงข้อมูลเซสชันจากเซิร์ฟเวอร์
  const session = await getServerSession(authOptions)

  // ส่งข้อมูลเซสชันไปยัง Client Component
  return <DashboardPageClient session={session} />
}

export default DashboardPage
