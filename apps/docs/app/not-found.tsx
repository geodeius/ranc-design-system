import Link from 'next/link';

export default function NotFound() {
  return (
    <article>
      <p className="status">Not found</p>
      <h1>This documentation page does not exist.</h1>
      <p>The route may be planned but has not been documented yet.</p>
      <Link href="/getting-started/introduction">Read the introduction</Link>
    </article>
  );
}
