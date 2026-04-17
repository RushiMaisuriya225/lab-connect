'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Users, BookOpen, Download } from 'lucide-react';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/attendance');
      setLogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Faculty Dashboard</h2>
          <p className="text-gray-400 mt-1">Manage lab sessions and view attendance</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-lg">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Attendance Logs</p>
              <h3 className="text-3xl font-bold text-white">{logs.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Active Lab Sessions</p>
              <h3 className="text-3xl font-bold text-white">4</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Recent Attendance Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Student Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Lab Session</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time In</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{log.studentId?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{log.labSession}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(log.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(log.signInTime).toLocaleTimeString()}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">No attendance records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
