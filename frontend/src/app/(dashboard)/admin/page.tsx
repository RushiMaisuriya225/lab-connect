'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, BarChart3, ShieldCheck, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserRole = async (id: string, role: string) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}/role`, { role });
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id: string) => {
    // In a real app this would have a dedicated endpoint
    alert(`Delete action for user ${id} (Mocked)`);
  };

  const mockChartData = [
    { name: 'Mon', attendance: 40 },
    { name: 'Tue', attendance: 30 },
    { name: 'Wed', attendance: 65 },
    { name: 'Thu', attendance: 85 },
    { name: 'Fri', attendance: 45 },
    { name: 'Sat', attendance: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Admin Control Panel</h2>
          <p className="text-gray-400 mt-1">System analytics and user management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Registered Users</p>
              <h3 className="text-3xl font-bold text-white">{users.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Activity className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Weekly Lab Usage</p>
              <h3 className="text-3xl font-bold text-white">275 <span className="text-sm font-normal text-gray-500">hrs</span></h3>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">System Health</p>
              <h3 className="text-3xl font-bold text-white">99.9%</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Analytics Chart */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-indigo-400" />
            Attendance Trends
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#818CF8' }}
                />
                <Line type="monotone" dataKey="attendance" stroke="#818CF8" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Management Table */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
            <h3 className="text-lg font-semibold text-white">Manage Users</h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-72">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900/50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{u.name}</div>
                      <div className="text-sm text-gray-400">{u.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        title="Update user role"
                        className="bg-gray-900 border border-gray-600 text-white rounded-lg px-3 py-1.5 text-sm focus:ring-indigo-500"
                        value={u.role}
                        onChange={(e) => updateUserRole(u._id, e.target.value)}
                      >
                        <option value="Student">Student</option>
                        <option value="Faculty">Faculty</option>
                        <option value="LabAssistant">Lab Assistant</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => deleteUser(u._id)} className="text-red-400 hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
