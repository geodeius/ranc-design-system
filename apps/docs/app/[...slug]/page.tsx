import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';

import { getAdjacentPages, getAllPages, getPage } from '../../lib/content';

interface DocumentationPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export default async function DocumentationPage({
  params,
}: DocumentationPageProps) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  const adjacent = await getAdjacentPages(slug);

  return (
    <div className="document-grid">
      <article>
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumbs">
            {page.breadcrumbs.map((breadcrumb, index) => (
              <li key={`${breadcrumb.label}:${index}`}>
                {index === page.breadcrumbs.length - 1 ? (
                  <span aria-current="page">{breadcrumb.label}</span>
                ) : breadcrumb.url ? (
                  <Link href={breadcrumb.url}>{breadcrumb.label}</Link>
                ) : (
                  <span>{breadcrumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <header className="document-header">
          <h1>{page.frontmatter.title}</h1>
          <p className="description">{page.frontmatter.description}</p>
        </header>

        <div className="mdx-content">
          <MDXRemote
            source={page.body}
            options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
          />
        </div>

        <nav className="pagination" aria-label="Documentation pagination">
          {adjacent.previous ? (
            <Link href={adjacent.previous.url}>
              <span>← Previous</span>
              {adjacent.previous.frontmatter.title}
            </Link>
          ) : (
            <span />
          )}
          {adjacent.next ? (
            <Link href={adjacent.next.url}>
              <span>Next →</span>
              {adjacent.next.frontmatter.title}
            </Link>
          ) : null}
        </nav>
      </article>

      {page.tableOfContents.length > 0 ? (
        <aside className="contents-rail">
          <nav className="table-of-contents" aria-label="On this page">
            <h2>On this page</h2>
            <ol>
              {page.tableOfContents.map((heading) => (
                <li key={heading.id} data-depth={heading.depth}>
                  <a href={`#${heading.id}`}>{heading.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      ) : null}
    </div>
  );
}
