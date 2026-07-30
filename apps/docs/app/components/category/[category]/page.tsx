import Link from 'next/link';
import { notFound } from 'next/navigation';

import { StatusBadge } from '../../../../components/status-badge';
import { getComponentRegistry } from '../../../../lib/registries';

export async function generateStaticParams() {
  const components = await getComponentRegistry();
  return [...new Set(components.map((entry) => entry.category))].map(
    (category) => ({ category }),
  );
}

export default async function ComponentCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const components = (await getComponentRegistry()).filter(
    (entry) => entry.category === category,
  );
  if (components.length === 0) notFound();

  return (
    <article>
      <header className="document-header">
        <h1>{category}</h1>
        <p className="description">
          Components in this generated registry category.
        </p>
      </header>
      <ul className="registry-grid">
        {components.map((component) => (
          <li key={component.name}>
            <StatusBadge status={component.status} />
            <h2>
              <Link href={component.documentation}>
                {component.displayName}
              </Link>
            </h2>
            <p>{component.platforms.join(', ')}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
