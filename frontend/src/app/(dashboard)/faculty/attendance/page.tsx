import FacultyDashboard from '../page';

export default function FacultyAttendanceDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">Student Logs</h2>
        <p className="text-gray-400 mt-1">Global view of all attendance logs</p>
      </div>
      <FacultyDashboard />
    </div>
  );
}
