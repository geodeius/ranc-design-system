import './styles.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { DocumentNavigation } from '../components/document-navigation';

export const metadata: Metadata = {
  description: 'Documentation platform for the planned Rancard Design System.',
  title: {
    default: 'Rancard Design System',
    template: '%s — Rancard Design System',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="page-frame">
          <header>
            <p className="eyebrow">Phase Zero · Experimental</p>
            <p className="site-name">Rancard Design System</p>
          </header>
          <div className="documentation-layout">
            <DocumentNavigation />
            <main id="main-content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
