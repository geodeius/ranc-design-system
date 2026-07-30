'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavigationGroup } from '../lib/content';

export function DocumentNavigation({
  navigation,
  onNavigate,
}: {
  navigation: NavigationGroup[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="document-navigation" aria-label="Documentation">
      <p className="navigation-label">Explore</p>
      {navigation.map((group) => {
        const headingId = `nav-${group.label
          .toLowerCase()
          .replaceAll(' ', '-')}`;

        return (
          <section key={group.label} aria-labelledby={headingId}>
            <h2 id={headingId}>{group.label}</h2>
            <ul>
              {group.pages.map((page) => (
                <li key={page.url}>
                  <Link
                    aria-current={pathname === page.url ? 'page' : undefined}
                    href={page.url}
                    {...(onNavigate ? { onClick: onNavigate } : {})}
                  >
                    {page.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </nav>
  );
}
