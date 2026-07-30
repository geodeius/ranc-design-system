import { getTokenRegistry } from '../../lib/registries';

export default async function TokensPage() {
  const tokens = await getTokenRegistry();

  return (
    <article>
      <header className="document-header">
        <h1>Tokens</h1>
        <p className="description">
          The validated token registry intentionally contains no entries until
          token names and foundations are approved.
        </p>
      </header>
      {tokens.length === 0 ? (
        <div className="registry-empty">
          <h2>No approved token entries</h2>
          <p>
            Token values will be defined during the visual foundation phase.
          </p>
        </div>
      ) : null}
    </article>
  );
}
