import { useState, useEffect, useMemo } from 'react';
import SidebarNav from './components/SidebarNav';
import TopbarHeader from './components/TopbarHeader';
import ContentRouter from './components/ContentRouter';

export default function App() {
  const [route, setRoute] = useState('dashboard');
  const [utmLinks, setUtmLinks] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem('utmLinks') || '[]');
    const savedTemplates = JSON.parse(localStorage.getItem('utmTemplates') || '[]');
    setUtmLinks(savedLinks);
    setTemplates(savedTemplates);
  }, []);

  useEffect(() => {
    localStorage.setItem('utmLinks', JSON.stringify(utmLinks));
  }, [utmLinks]);

  useEffect(() => {
    localStorage.setItem('utmTemplates', JSON.stringify(templates));
  }, [templates]);

  const actions = useMemo(() => ({
    addLink: (link) => {
      setUtmLinks((prev) => [link, ...prev]);
      setNotifications((prev) => [
        { id: crypto.randomUUID(), type: 'success', message: 'UTM link saved', ts: Date.now() },
        ...prev,
      ]);
    },
    removeLink: (id) => setUtmLinks((prev) => prev.filter((l) => l.id !== id)),
    addTemplate: (tpl) => setTemplates((prev) => [tpl, ...prev]),
    removeTemplate: (id) => setTemplates((prev) => prev.filter((t) => t.id !== id)),
    clearNotifications: () => setNotifications([]),
  }), []);

  return (
    <div className="min-h-screen w-full bg-neutral-50 text-neutral-900">
      <div className="flex h-screen overflow-hidden">
        <SidebarNav route={route} onNavigate={setRoute} />
        <div className="flex-1 flex flex-col min-w-0">
          <TopbarHeader onNavigate={setRoute} notifications={notifications} onClearNotifications={actions.clearNotifications} />
          <main className="flex-1 overflow-y-auto">
            <ContentRouter
              route={route}
              onNavigate={setRoute}
              utmLinks={utmLinks}
              templates={templates}
              actions={actions}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
