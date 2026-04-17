'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Clock, Loader2, PlayCircle, CheckCircle2 } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [session, setSession] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [stats, setStats] = useState({ presentCount: 0, lastAttended: 'N/A', occupancy: 24 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/attendance/my-logs');
      setStats({
        presentCount: res.data.length,
        lastAttended: res.data.length > 0 ? new Date(res.data[res.data.length - 1].date).toLocaleDateString() : 'N/A',
        occupancy: 24 // Mocked for real-time occupancy feature
      });
    } catch (err) {
      console.log(err);
    }
  };

  const markAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      await axios.post('http://localhost:5000/api/attendance/mark', { labSession: session });
      setMsg({ text: 'Attendance marked successfully', type: 'success' });
      fetchStats();
    } catch (err: any) {
      setMsg({ text: err.response?.data?.message || 'Failed to mark attendance', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Student Dashboard</h2>
          <p className="text-gray-400 mt-1">Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Attendance</p>
              <h3 className="text-3xl font-bold text-white">{stats.presentCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Last Attended</p>
              <h3 className="text-xl font-bold text-white mt-1">{stats.lastAttended}</h3>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Current Occupancy</p>
              <h3 className="text-3xl font-bold text-white">{stats.occupancy} <span className="text-base font-normal text-gray-500">/ 50</span></h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-sm">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-indigo-400" />
          Mark Attendance
        </h3>
        {msg.text && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${msg.type === 'error' ? 'bg-red-500/10 border border-red-500 text-red-500' : 'bg-emerald-500/10 border border-emerald-500 text-emerald-500'}`}>
            {msg.text}
          </div>
        )}
        <form onSubmit={markAttendance} className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Lab Session / code</label>
            <input
              type="text"
              required
              className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g. CS101-Morning"
              value={session}
              onChange={(e) => setSession(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors shadow-lg"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Attendance'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Ensure icons are imported
import { Users } from 'lucide-react';
