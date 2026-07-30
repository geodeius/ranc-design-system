import { ComponentRegistryOverview } from '../../components/component-registry-overview';
import { getComponentRegistry } from '../../lib/registries';

export default async function ComponentsPage() {
  const components = await getComponentRegistry();

  return (
    <article>
      <header className="document-header">
        <h1>Components</h1>
        <p className="description">
          A registry-backed view of documented component work. Entries describe
          lifecycle metadata, not approved production APIs.
        </p>
      </header>
      <ComponentRegistryOverview components={components} />
    </article>
  );
}
