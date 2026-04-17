'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Users, CalendarCheck, BookOpen, Settings, LogOut, ChartPie, Database
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  const role = user.role.toLowerCase();

  const navLinks = [
    ...(role === 'student' ? [
      { name: 'Dashboard', icon: BookOpen, path: '/student' },
      { name: 'Attendance', icon: CalendarCheck, path: '/student/attendance' },
      { name: 'Equipment', icon: Database, path: '/student/equipment' }
    ] : []),
    ...(role === 'faculty' ? [
      { name: 'Dashboard', icon: ChartPie, path: '/faculty' },
      { name: 'Attendance Logs', icon: Users, path: '/faculty/attendance' },
      { name: 'Sessions', icon: CalendarCheck, path: '/faculty/sessions' }
    ] : []),
    ...(role === 'labassistant' ? [
      { name: 'Dashboard', icon: ChartPie, path: '/lab_assistant' },
      { name: 'Equipment List', icon: Database, path: '/lab_assistant/equipment' },
      { name: 'Reservations', icon: CalendarCheck, path: '/lab_assistant/reservations' }
    ] : []),
    ...(role === 'admin' ? [
      { name: 'Dashboard', icon: ChartPie, path: '/admin' },
      { name: 'Manage Users', icon: Users, path: '/admin/users' },
      { name: 'System Settings', icon: Settings, path: '/admin/settings' }
    ] : [])
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-800 text-gray-300 h-screen transition-all">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 tracking-tight">Lab System</h1>
      </div>
      
      <div className="px-4 py-6">
        <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-gray-800">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{user.name}</p>
            <p className="text-xs text-indigo-400">{user.role}</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                  isActive ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-gray-400'}`} />
                <span className="font-medium text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-gray-400 hover:text-white px-4 py-3 hover:bg-gray-800 rounded-xl w-full transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
