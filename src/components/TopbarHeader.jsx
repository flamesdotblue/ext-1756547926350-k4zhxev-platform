import { Bell, Plus, Search } from 'lucide-react';

export default function TopbarHeader({ onNavigate, notifications = [], onClearNotifications }) {
  return (
    <header className="h-16 border-b border-neutral-200 bg-white/80 backdrop-blur-sm flex items-center px-4 gap-3 sticky top-0 z-10">
      <div className="flex lg:hidden items-center gap-2">
        <button onClick={() => onNavigate('dashboard')} className="font-semibold">UTM Control</button>
      </div>
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            className="w-full pl-9 pr-3 py-2 rounded-md border border-neutral-200 text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-300 bg-white"
            placeholder="Search links, campaigns, channels..."
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate('utm')}
          className="inline-flex items-center gap-2 rounded-md bg-rose-600 text-white px-3 py-2 text-sm hover:bg-rose-700"
        >
          <Plus size={16} />
          Quick Create UTM
        </button>
        <div className="relative">
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-neutral-200 hover:bg-neutral-100">
            <Bell size={18} />
          </button>
          {notifications.length > 0 && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-neutral-200 rounded-md shadow">
              <div className="p-2 max-h-64 overflow-auto text-sm">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded hover:bg-neutral-50">
                    <div className="font-medium">{n.type === 'success' ? 'Success' : 'Notice'}</div>
                    <div className="text-neutral-600">{n.message}</div>
                  </div>
                ))}
              </div>
              <button onClick={onClearNotifications} className="w-full text-xs py-2 border-t hover:bg-neutral-50">Clear</button>
            </div>
          )}
        </div>
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-neutral-200 to-neutral-100 border border-neutral-300" />
      </div>
    </header>
  );
}
