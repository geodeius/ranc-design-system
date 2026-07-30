import './styles.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { DocumentNavigation } from '../components/document-navigation';
import { SiteControls } from '../components/site-controls';
import { getNavigation } from '../lib/content';
import { getRegistrySearchEntries } from '../lib/registries';

export const metadata: Metadata = {
  description: 'Documentation platform for the planned Rancard Design System.',
  title: {
    default: 'Rancard Design System',
    template: '%s — Rancard Design System',
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [navigation, registrySearchEntries] = await Promise.all([
    getNavigation(),
    getRegistrySearchEntries(),
  ]);

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header">
          <div className="site-header-inner">
            <a className="brand" href="/getting-started/introduction">
              <span className="brand-mark" aria-hidden="true">
                R
              </span>
              <span>
                <span className="eyebrow">Phase Zero</span>
                <span className="site-name">Rancard Design System</span>
              </span>
            </a>
            <SiteControls
              navigation={navigation}
              registrySearchEntries={registrySearchEntries}
            />
          </div>
        </header>
        <div className="page-frame">
          <div className="documentation-layout">
            <aside className="sidebar">
              <DocumentNavigation navigation={navigation} />
            </aside>
            <main id="main-content">{children}</main>
          </div>
        </div>
        <footer className="site-footer">
          <div>
            <p>Rancard Design System</p>
            <p>Experimental platform · No stable component APIs</p>
          </div>
          <a href="/getting-started/introduction">Back to introduction ↑</a>
        </footer>
      </body>
    </html>
  );
}
