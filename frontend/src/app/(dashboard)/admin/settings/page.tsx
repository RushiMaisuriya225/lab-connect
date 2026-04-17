'use client';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-gray-800">
        <h2 className="text-3xl font-bold text-white tracking-tight">System Settings</h2>
        <p className="text-gray-400 mt-1">Configure global application settings</p>
      </div>
      
      <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-sm max-w-2xl">
        <h3 className="text-xl font-semibold text-white mb-6">General Preferences</h3>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">University Name</label>
            <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" defaultValue="State University" />
          </div>
          
          <div className="flex items-center justify-between py-4 border-t border-gray-700">
            <div>
              <p className="font-medium text-white">Maintenance Mode</p>
              <p className="text-sm text-gray-400">Lock out all non-admin users</p>
            </div>
            <button type="button" className="bg-gray-700 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none">
              <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
            </button>
          </div>
          
          <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
