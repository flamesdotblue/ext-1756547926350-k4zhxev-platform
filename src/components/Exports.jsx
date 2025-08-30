import { useMemo, useState } from 'react';
import { Copy, Download } from 'lucide-react';

export default function Exports({ utmLinks = [] }) {
  const [format, setFormat] = useState('csv');
  const csv = useMemo(() => toCSV(utmLinks), [utmLinks]);
  const json = useMemo(() => JSON.stringify(utmLinks, null, 2), [utmLinks]);

  function handleCopy() {
    const text = format === 'csv' ? csv : json;
    navigator.clipboard.writeText(text);
  }

  function handleDownload() {
    const blob = new Blob([format === 'csv' ? csv : json], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `utm-links.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold">Export & Share UTM Links</h2>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <span>Format:</span>
        <select value={format} onChange={(e) => setFormat(e.target.value)} className="border border-neutral-300 rounded-md px-2 py-1 bg-white">
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
        <button onClick={handleCopy} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-300 hover:bg-neutral-50">
          <Copy size={16} /> Copy
        </button>
        <button onClick={handleDownload} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700">
          <Download size={16} /> Download
        </button>
      </div>

      <div className="mt-4 rounded-lg border border-neutral-200 bg-white p-4">
        <pre className="text-xs overflow-auto max-h-[420px]">{format === 'csv' ? csv : json}</pre>
      </div>
    </div>
  );
}

function toCSV(rows) {
  const headers = ['id','createdAt','baseUrl','source','medium','campaign','content','term','finalUrl'];
  const lines = [headers.join(',')];
  for (const r of rows) {
    const line = headers.map((h) => csvEscape(r[h] ?? ''));
    lines.push(line.join(','));
  }
  return lines.join('\n');
}

function csvEscape(val) {
  const s = String(val).replaceAll('"', '""');
  if (/[",\n]/.test(s)) return `"${s}"`;
  return s;
}
