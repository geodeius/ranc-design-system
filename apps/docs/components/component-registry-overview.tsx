'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { StatusBadge } from './status-badge';

import type { ComponentRegistryEntry } from '@rancard/documentation-schema';

export function ComponentRegistryOverview({
  components,
}: {
  components: ComponentRegistryEntry[];
}) {
  const statuses = [...new Set(components.map((entry) => entry.status))];
  const platforms = [
    ...new Set(components.flatMap((entry) => entry.platforms)),
  ];
  const [status, setStatus] = useState('all');
  const [platform, setPlatform] = useState('all');
  const visibleComponents = useMemo(
    () =>
      components.filter(
        (entry) =>
          (status === 'all' || entry.status === status) &&
          (platform === 'all' || entry.platforms.includes(platform)),
      ),
    [components, platform, status],
  );

  return (
    <>
      <div className="registry-filters" aria-label="Component filters">
        <label>
          Status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="all">All statuses</option>
            {statuses.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          Platform
          <select
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
          >
            <option value="all">All platforms</option>
            {platforms.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="registry-count" aria-live="polite">
        Showing {visibleComponents.length} of {components.length} components.
      </p>
      <ul className="registry-grid">
        {visibleComponents.map((component) => (
          <li key={component.name}>
            <div>
              <StatusBadge status={component.status} />
              <h2>
                <Link href={component.documentation}>
                  {component.displayName}
                </Link>
              </h2>
              <p>
                {component.category} · {component.platforms.join(', ')}
              </p>
            </div>
            <Link href={`/components/category/${component.category}`}>
              View {component.category}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
