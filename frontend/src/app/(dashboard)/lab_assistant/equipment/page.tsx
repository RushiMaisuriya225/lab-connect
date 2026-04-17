import LabAssistantDashboard from '../page';

export default function LabAssistantEquipmentPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">Equipment List</h2>
        <p className="text-gray-400 mt-1">Detailed inventory view</p>
      </div>
      <LabAssistantDashboard />
    </div>
  );
}
