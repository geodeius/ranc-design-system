import { z } from 'zod';

export const lifecycleStatuses = [
  'planned',
  'experimental',
  'alpha',
  'beta',
  'stable',
  'deprecated',
  'removed',
] as const;

export const lifecycleStatusSchema = z.enum(lifecycleStatuses);

const nonEmptyString = z.string().trim().min(1);
const ownerSchema = nonEmptyString;
const platformSchema = nonEmptyString;
const reviewedDateSchema = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.iso.date(),
);

const sharedPageFields = {
  title: nonEmptyString,
  description: nonEmptyString,
  category: nonEmptyString,
  status: lifecycleStatusSchema,
  order: z.number().int().nonnegative(),
  owners: z.array(ownerSchema).min(1),
  lastReviewed: reviewedDateSchema,
  tags: z.array(nonEmptyString).default([]),
};

export const generalPageSchema = z.strictObject(sharedPageFields);

export const componentPageSchema = z.strictObject({
  ...sharedPageFields,
  version: z.string().trim().min(1).nullable(),
  package: nonEmptyString,
  figmaNode: z.url().nullable(),
  accessibilityStatus: z.enum(['pending', 'in-review', 'passed']),
  platforms: z.array(platformSchema).min(1),
});

export const foundationPageSchema = z.strictObject({
  ...sharedPageFields,
  tokenGroup: nonEmptyString,
  platforms: z.array(platformSchema).min(1),
});

export const componentRegistryEntrySchema = z.strictObject({
  name: nonEmptyString.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  displayName: nonEmptyString,
  category: nonEmptyString,
  status: lifecycleStatusSchema,
  packages: z.record(nonEmptyString, nonEmptyString),
  platforms: z.array(platformSchema).min(1),
  figma: z.url().nullable(),
  documentation: nonEmptyString.startsWith('/'),
  owners: z.array(ownerSchema).min(1),
});

export const packageRegistryEntrySchema = z.strictObject({
  name: nonEmptyString.startsWith('@rancard/'),
  status: lifecycleStatusSchema,
  private: z.boolean(),
  documentation: nonEmptyString.startsWith('/').nullable(),
  owners: z.array(ownerSchema).min(1),
});

export const tokenRegistryEntrySchema = z.strictObject({
  name: nonEmptyString,
  group: nonEmptyString,
  status: lifecycleStatusSchema,
  platforms: z.array(platformSchema).min(1),
  owners: z.array(ownerSchema).min(1),
});

export type GeneralPageFrontmatter = z.infer<typeof generalPageSchema>;
export type ComponentPageFrontmatter = z.infer<typeof componentPageSchema>;
export type FoundationPageFrontmatter = z.infer<typeof foundationPageSchema>;
export type PageFrontmatter =
  GeneralPageFrontmatter | ComponentPageFrontmatter | FoundationPageFrontmatter;

export function formatValidationError(
  source: string,
  error: z.ZodError,
): string {
  const details = error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'frontmatter';
      return `- ${path}: ${issue.message}`;
    })
    .join('\n');

  return `Invalid metadata in ${source}:\n${details}`;
}

export function parsePageFrontmatter(
  value: unknown,
  source = 'unknown MDX file',
): PageFrontmatter {
  const candidate =
    typeof value === 'object' && value !== null
      ? (value as Record<string, unknown>)
      : {};

  const schema =
    'package' in candidate
      ? componentPageSchema
      : 'tokenGroup' in candidate
        ? foundationPageSchema
        : generalPageSchema;

  const result = schema.safeParse(value);
  if (!result.success) {
    throw new Error(formatValidationError(source, result.error));
  }

  return result.data;
}
