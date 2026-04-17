import StudentDashboard from '../page';

export default function StudentAttendancePage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">My Attendance Log</h2>
        <p className="text-gray-400 mt-1">Detailed view of your participation</p>
      </div>
      <StudentDashboard />
    </div>
  );
}
