import { useMemo } from 'react';

export default function Analytics({ utmLinks = [], onNavigate }) {
  const aggregates = useMemo(() => {
    const bySource = countBy(utmLinks, 'source');
    const byMedium = countBy(utmLinks, 'medium');
    const byCampaign = countBy(utmLinks, 'campaign');
    return { bySource, byMedium, byCampaign };
  }, [utmLinks]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Analyze Campaign Performance</h2>
        <button onClick={() => onNavigate('comparisons')} className="text-sm text-rose-700 hover:underline">Compare Channels</button>
      </div>

      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <ChartCard title="By Source" data={aggregates.bySource} />
        <ChartCard title="By Medium" data={aggregates.byMedium} />
        <ChartCard title="By Campaign" data={aggregates.byCampaign} />
      </div>

      <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-4">
        <h3 className="font-semibold">Recent Activity</h3>
        <div className="mt-3 divide-y">
          {utmLinks.slice(0, 8).map((l) => (
            <div key={l.id} className="py-2 text-sm">
              <div className="font-medium truncate">{l.finalUrl}</div>
              <div className="text-neutral-600 flex flex-wrap gap-2">
                <span>source: {l.source}</span>
                <span>medium: {l.medium}</span>
                <span>campaign: {l.campaign}</span>
              </div>
            </div>
          ))}
          {utmLinks.length === 0 && <div className="text-sm text-neutral-600">No data yet. Create UTM links to populate analytics.</div>}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, data }) {
  const entries = Object.entries(data);
  const max = Math.max(1, ...entries.map(([, v]) => v));
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="font-semibold">{title}</div>
      <div className="mt-3 space-y-2">
        {entries.length === 0 && <div className="text-sm text-neutral-600">No data</div>}
        {entries.map(([k, v]) => (
          <div key={k} className="text-sm">
            <div className="flex items-center justify-between">
              <span className="truncate pr-2">{k || '—'}</span>
              <span className="text-neutral-600">{v}</span>
            </div>
            <div className="mt-1 h-2 bg-neutral-100 rounded">
              <div className="h-full rounded bg-gradient-to-r from-rose-500 to-pink-500" style={{ width: `${(v / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function countBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key] || '';
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
}
