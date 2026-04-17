import AdminDashboard from '../page';

// Reusing the robust user management module built on the main admin page.
export default function ManageUsersPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">Manage Users (Dedicated)</h2>
        <p className="text-gray-400 mt-1">Expanded view for user administration</p>
      </div>
      <AdminDashboard />
    </div>
  );
}
