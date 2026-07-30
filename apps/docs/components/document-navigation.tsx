import Link from 'next/link';

import { getNavigation } from '../lib/content';

export async function DocumentNavigation() {
  const groups = await getNavigation();

  return (
    <nav aria-label="Documentation">
      <p className="navigation-label">Documentation</p>
      {groups.map((group) => {
        const headingId = `nav-${group.label
          .toLowerCase()
          .replaceAll(' ', '-')}`;

        return (
          <section key={group.label} aria-labelledby={headingId}>
            <h2 id={headingId}>{group.label}</h2>
            <ul>
              {group.pages.map((page) => (
                <li key={page.url}>
                  <Link href={page.url}>{page.frontmatter.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </nav>
  );
}
