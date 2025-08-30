import { Home, Link2, BarChart3, ClipboardList, Share2, Layers } from 'lucide-react';

const items = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'utm', label: 'UTM Builder', icon: Link2 },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'templates', label: 'Templates', icon: ClipboardList },
  { key: 'exports', label: 'Exports', icon: Share2 },
  { key: 'comparisons', label: 'Comparisons', icon: Layers },
];

export default function SidebarNav({ route, onNavigate }) {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 border-r border-neutral-200 bg-white/80 backdrop-blur-sm">
      <div className="h-16 flex items-center px-6 border-b border-neutral-200">
        <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-rose-500 to-pink-500" />
        <span className="ml-3 font-semibold tracking-tight">UTM Control</span>
      </div>
      <nav className="p-2 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active = route === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                active ? 'bg-rose-50 text-rose-700' : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-auto p-4 text-xs text-neutral-500">
        <div>v1.0 • Responsive Web</div>
        <div className="mt-1">For Marketing Teams</div>
      </div>
    </aside>
  );
}
