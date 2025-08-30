import Spline from '@splinetool/react-spline';

export default function Dashboard({ onNavigate, utmLinks }) {
  const topRecent = utmLinks.slice(0, 4);
  const topStats = [
    { label: 'Total Links', value: utmLinks.length },
    { label: 'Active Campaigns', value: new Set(utmLinks.map((l) => l.campaign)).size },
    { label: 'Top Channel', value: modeLabel(utmLinks.map((l) => l.source)) || '—' },
  ];
  return (
    <div className="relative">
      <section className="relative h-[320px] w-full">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/30 to-white" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Campaign URL Command Center</h1>
            <p className="mt-2 text-neutral-600 max-w-2xl mx-auto">Create consistent UTM links, analyze performance, manage templates, and compare channels — all in one place.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button onClick={() => onNavigate('utm')} className="px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700">Build UTM</button>
              <button onClick={() => onNavigate('analytics')} className="px-4 py-2 rounded-md border border-neutral-300 hover:bg-neutral-50">View Analytics</button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 -mt-10 relative z-0">
        <div className="grid md:grid-cols-3 gap-4">
          {topStats.map((s) => (
            <div key={s.label} className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="text-neutral-500 text-sm">{s.label}</div>
              <div className="mt-1 text-2xl font-semibold">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-lg border border-neutral-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Recent UTM Links</h3>
              <button onClick={() => onNavigate('exports')} className="text-sm text-rose-700 hover:underline">Export</button>
            </div>
            <div className="mt-3 divide-y">
              {topRecent.length === 0 && <div className="text-sm text-neutral-600">No links yet. Create your first UTM link.</div>}
              {topRecent.map((l) => (
                <div key={l.id} className="py-2 text-sm">
                  <div className="font-medium truncate">{l.finalUrl}</div>
                  <div className="text-neutral-600 flex flex-wrap gap-2">
                    <span>source: {l.source}</span>
                    <span>medium: {l.medium}</span>
                    <span>campaign: {l.campaign}</span>
                    {l.content && <span>content: {l.content}</span>}
                    {l.term && <span>term: {l.term}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <h3 className="font-semibold">Team Updates</h3>
            <ul className="mt-3 text-sm text-neutral-700 space-y-2">
              <li>New: Template library supports dynamic parameters.</li>
              <li>Improved: Bulk export with CSV and JSON.</li>
              <li>Tip: Use Comparisons to assess channel ROI.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function modeLabel(arr) {
  if (!arr || arr.length === 0) return '';
  const map = new Map();
  arr.forEach((v) => map.set(v, (map.get(v) || 0) + 1));
  let best = '', count = 0;
  for (const [k, v] of map) {
    if (v > count) { best = k; count = v; }
  }
  return best;
}
