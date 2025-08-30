import Dashboard from './Dashboard';
import UTMBuilder from './UTMBuilder';
import Analytics from './Analytics';
import Templates from './Templates';
import Exports from './Exports';
import Comparisons from './Comparisons';

export default function ContentRouter({ route, onNavigate, utmLinks, templates, actions }) {
  if (route === 'utm') return <UTMBuilder onNavigate={onNavigate} onSave={actions.addLink} templates={templates} />;
  if (route === 'analytics') return <Analytics utmLinks={utmLinks} onNavigate={onNavigate} />;
  if (route === 'templates') return <Templates templates={templates} onAdd={actions.addTemplate} onRemove={actions.removeTemplate} />;
  if (route === 'exports') return <Exports utmLinks={utmLinks} />;
  if (route === 'comparisons') return <Comparisons utmLinks={utmLinks} />;
  return <Dashboard onNavigate={onNavigate} utmLinks={utmLinks} />;
}
