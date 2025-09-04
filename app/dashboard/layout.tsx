import NextAuthProvider from "../../lib/SessionProvider";
import { getServerSession } from "next-auth/next"; // ควร import จาก "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route";  // ต้อง import authOptions ด้วย
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // ต้องส่ง authOptions เข้าไปด้วย
  const session = await getServerSession(authOptions);

  return (
    // ส่ง session ที่ดึงมา ไม่ใช่ null
    <NextAuthProvider session={session}>
      <main>{children}</main>
    </NextAuthProvider>
  );
}
