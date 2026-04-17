'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Database, Activity, AlertTriangle, CheckCircle, RefreshCcw } from 'lucide-react';

export default function LabAssistantDashboard() {
  const [equipment, setEquipment] = useState<any[]>([]);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/equipment');
      setEquipment(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await axios.put(`http://localhost:5000/api/equipment/${id}`, { status: newStatus });
      fetchEquipment();
    } catch (err) {
      console.log(err);
    }
  };

  const stats = {
    total: equipment.length,
    available: equipment.filter(e => e.status === 'Available').length,
    inUse: equipment.filter(e => e.status === 'In Use').length,
    maintenance: equipment.filter(e => e.status === 'Under Maintenance').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Equipment Management</h2>
          <p className="text-gray-400 mt-1">Manage lab equipment and monitor real-time status</p>
        </div>
        <button onClick={fetchEquipment} className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-xl text-sm font-medium transition-colors">
          <RefreshCcw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Assets', value: stats.total, icon: Database, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Available', value: stats.available, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'In Use', value: stats.inUse, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Maintenance', value: stats.maintenance, icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className={`p-3 ${stat.bg} rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Equipment Inventory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Serial No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {equipment.map((item) => (
                <tr key={item._id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{item.serialNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${item.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                        item.status === 'In Use' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                        'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      title="Update status"
                      className="bg-gray-900 border border-gray-600 text-white rounded-lg px-2 py-1 text-xs focus:ring-indigo-500"
                      value={item.status}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                    >
                      <option value="Available">Available</option>
                      <option value="In Use">In Use</option>
                      <option value="Under Maintenance">Maintenance</option>
                    </select>
                  </td>
                </tr>
              ))}
              {equipment.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No equipment found. Add some via API.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
