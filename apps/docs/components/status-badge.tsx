import type { PageFrontmatter } from '@rancard/documentation-schema';

export function StatusBadge({ status }: { status: PageFrontmatter['status'] }) {
  return (
    <span className="status-badge" data-status={status}>
      <span aria-hidden="true" />
      {status}
    </span>
  );
}
