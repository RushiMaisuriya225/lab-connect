'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen } from 'lucide-react';

export default function StudentEquipmentPage() {
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

  const requestReservation = async (id: string) => {
    try {
       // Mock reservation request
       alert('Reservation request sent successfully for ' + id);
    } catch(e) {
       console.log(e);
    }
  }

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-gray-800">
        <h2 className="text-3xl font-bold text-white tracking-tight">Browse Equipment</h2>
        <p className="text-gray-400 mt-1">Check availability and reserve lab equipment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map(item => (
          <div key={item._id} className="bg-gray-800 rounded-2xl border border-gray-700 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="text-indigo-400 w-5 h-5"/>
              {item.name}
            </h3>
            <p className="text-sm text-gray-400 mt-2">Category: {item.category}</p>
            <div className="my-4 flex-grow">
               <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${item.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'}`}>
                 {item.status}
               </span>
            </div>
            
            <button 
              disabled={item.status !== 'Available'}
              onClick={() => requestReservation(item._id)}
              className="mt-2 w-full py-2 bg-indigo-600 disabled:bg-gray-700 disabled:text-gray-500 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              {item.status === 'Available' ? 'Reserve Item' : 'Unavailable'}
            </button>
          </div>
        ))}
        {equipment.length === 0 && <p className="text-gray-400">No equipment logged in the system.</p>}
      </div>
    </div>
  );
}
