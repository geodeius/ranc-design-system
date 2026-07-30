import { StatusBadge } from '../../components/status-badge';
import { getPackageRegistry } from '../../lib/registries';

export default async function PackagesPage() {
  const packages = await getPackageRegistry();

  return (
    <article>
      <header className="document-header">
        <StatusBadge status="experimental" />
        <h1>Packages</h1>
        <p className="description">
          Planned workspace packages validated against their manifests. All
          packages remain private and unpublished during Phase Zero.
        </p>
      </header>
      <ul className="registry-grid">
        {packages.map((packageEntry) => (
          <li key={packageEntry.name}>
            <StatusBadge status={packageEntry.status} />
            <h2>
              <code>{packageEntry.name}</code>
            </h2>
            <p>{packageEntry.private ? 'Private' : 'Public'}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
