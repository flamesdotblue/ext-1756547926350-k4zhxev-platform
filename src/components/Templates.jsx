import { useState } from 'react';
import { Trash2, Save } from 'lucide-react';

export default function Templates({ templates = [], onAdd, onRemove }) {
  const [form, setForm] = useState({ name: '', source: '', medium: '', campaign: '', content: '', term: '' });

  function handleAdd() {
    if (!form.name) return;
    onAdd({ id: crypto.randomUUID(), ...form, createdAt: Date.now() });
    setForm({ name: '', source: '', medium: '', campaign: '', content: '', term: '' });
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold">Manage UTM Templates</h2>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-neutral-200 bg-white p-4 space-y-3">
          <Field label="Template Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Source" value={form.source} onChange={(v) => setForm({ ...form, source: v })} />
            <Field label="Medium" value={form.medium} onChange={(v) => setForm({ ...form, medium: v })} />
          </div>
          <Field label="Campaign" value={form.campaign} onChange={(v) => setForm({ ...form, campaign: v })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Content" value={form.content} onChange={(v) => setForm({ ...form, content: v })} />
            <Field label="Term" value={form.term} onChange={(v) => setForm({ ...form, term: v })} />
          </div>
          <button onClick={handleAdd} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-rose-600 text-white text-sm hover:bg-rose-700">
            <Save size={16} /> Save Template
          </button>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="font-semibold">Template Library</div>
          <div className="mt-3 divide-y">
            {templates.length === 0 && <div className="text-sm text-neutral-600">No templates yet. Create one to speed up UTM building.</div>}
            {templates.map((t) => (
              <div key={t.id} className="py-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{t.name}</div>
                  <button onClick={() => onRemove(t.id)} className="text-neutral-600 hover:text-rose-700 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="text-neutral-600 flex flex-wrap gap-2">
                  {t.source && <span>source: {t.source}</span>}
                  {t.medium && <span>medium: {t.medium}</span>}
                  {t.campaign && <span>campaign: {t.campaign}</span>}
                  {t.content && <span>content: {t.content}</span>}
                  {t.term && <span>term: {t.term}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-sm text-neutral-700 mb-1">{label}</div>
      <input
        className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
