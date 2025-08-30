import { useEffect, useMemo, useState } from 'react';
import { Copy, ClipboardCheck } from 'lucide-react';

export default function UTMBuilder({ onNavigate, onSave, templates = [] }) {
  const [baseUrl, setBaseUrl] = useState('https://example.com/landing');
  const [source, setSource] = useState('google');
  const [medium, setMedium] = useState('cpc');
  const [campaign, setCampaign] = useState('spring_sale');
  const [content, setContent] = useState('hero_banner');
  const [term, setTerm] = useState('running shoes');
  const [copied, setCopied] = useState(false);
  const [selectedTpl, setSelectedTpl] = useState('');

  useEffect(() => {
    if (!selectedTpl) return;
    const tpl = templates.find((t) => t.id === selectedTpl);
    if (tpl) {
      setSource(tpl.source || '');
      setMedium(tpl.medium || '');
      setCampaign(tpl.campaign || '');
      setContent(tpl.content || '');
      setTerm(tpl.term || '');
    }
  }, [selectedTpl, templates]);

  const finalUrl = useMemo(() => {
    const url = new URL(baseUrl);
    const params = new URLSearchParams(url.search);
    if (source) params.set('utm_source', source);
    if (medium) params.set('utm_medium', medium);
    if (campaign) params.set('utm_campaign', campaign);
    if (content) params.set('utm_content', content);
    if (term) params.set('utm_term', term);
    url.search = params.toString();
    return url.toString();
  }, [baseUrl, source, medium, campaign, content, term]);

  function handleCopy() {
    navigator.clipboard.writeText(finalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  function handleSave() {
    const payload = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      baseUrl,
      source,
      medium,
      campaign,
      content,
      term,
      finalUrl,
    };
    onSave(payload);
    onNavigate('dashboard');
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Create & Save UTM Link</h2>
        <select value={selectedTpl} onChange={(e) => setSelectedTpl(e.target.value)} className="text-sm border border-neutral-300 rounded-md px-2 py-1 bg-white">
          <option value="">Apply Template...</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-neutral-200 bg-white p-4 space-y-3">
          <Input label="Base URL" value={baseUrl} onChange={setBaseUrl} placeholder="https://yourdomain.com/page" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Source" value={source} onChange={setSource} />
            <Input label="Medium" value={medium} onChange={setMedium} />
          </div>
          <Input label="Campaign" value={campaign} onChange={setCampaign} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Content" value={content} onChange={setContent} />
            <Input label="Term" value={term} onChange={setTerm} />
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-sm text-neutral-600">Final URL</div>
          <div className="mt-2 p-3 bg-neutral-50 border border-neutral-200 rounded-md break-all text-sm">{finalUrl}</div>
          <div className="mt-3 flex gap-2">
            <button onClick={handleCopy} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-300 hover:bg-neutral-50 text-sm">
              {copied ? <ClipboardCheck size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button onClick={handleSave} className="px-3 py-2 rounded-md bg-rose-600 text-white text-sm hover:bg-rose-700">Save Link</button>
          </div>
          <div className="mt-4 text-xs text-neutral-500">Saving adds this link to Dashboard, Analytics, and Exports.</div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <div className="text-sm text-neutral-700 mb-1">{label}</div>
      <input
        className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
