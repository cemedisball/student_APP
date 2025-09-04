import UserForm from '../../components/UserForm';
import { createUser } from '../../actions/userActions';

export default function CreateUserPage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">เพิ่มผู้ใช้ใหม่</h1>
      <UserForm createUser={createUser} />
    </div>
  );
}
