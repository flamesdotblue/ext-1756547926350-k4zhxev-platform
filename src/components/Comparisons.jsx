export default function Comparisons({ utmLinks = [] }) {
  const grouped = groupBy(utmLinks, (l) => `${l.source}|${l.medium}`);
  const rows = Object.entries(grouped).map(([key, arr]) => {
    const [source, medium] = key.split('|');
    return { source, medium, count: arr.length, campaigns: new Set(arr.map((a) => a.campaign)).size };
  }).sort((a, b) => b.count - a.count);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold">Compare Channel Performance</h2>
      <div className="mt-4 rounded-lg border border-neutral-200 bg-white overflow-hidden">
        <div className="grid grid-cols-4 text-sm bg-neutral-50 border-b border-neutral-200">
          <div className="px-3 py-2 font-medium">Source</div>
          <div className="px-3 py-2 font-medium">Medium</div>
          <div className="px-3 py-2 font-medium">Links</div>
          <div className="px-3 py-2 font-medium">Distinct Campaigns</div>
        </div>
        {rows.length === 0 && <div className="px-3 py-6 text-sm text-neutral-600">No data to compare yet.</div>}
        {rows.map((r) => (
          <div key={`${r.source}-${r.medium}`} className="grid grid-cols-4 text-sm border-b last:border-b-0">
            <div className="px-3 py-2">{r.source}</div>
            <div className="px-3 py-2">{r.medium}</div>
            <div className="px-3 py-2">{r.count}</div>
            <div className="px-3 py-2">{r.campaigns}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function groupBy(arr, fn) {
  return arr.reduce((acc, item) => {
    const key = fn(item);
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {});
}
