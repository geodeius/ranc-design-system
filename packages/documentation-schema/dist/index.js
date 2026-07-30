import { z } from 'zod';
export const lifecycleStatuses = [
    'planned',
    'experimental',
    'alpha',
    'beta',
    'stable',
    'deprecated',
    'removed',
];
export const lifecycleStatusSchema = z.enum(lifecycleStatuses);
const nonEmptyString = z.string().trim().min(1);
const ownerSchema = nonEmptyString;
const platformSchema = nonEmptyString;
const reviewedDateSchema = z.preprocess((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value), z.iso.date());
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
function uniqueByName(entries, context) {
    const names = new Map();
    entries.forEach((entry, index) => {
        const previousIndex = names.get(entry.name);
        if (previousIndex !== undefined) {
            context.addIssue({
                code: 'custom',
                message: `Duplicate registry name "${entry.name}" (first declared at index ${previousIndex}).`,
                path: [index, 'name'],
            });
        }
        else {
            names.set(entry.name, index);
        }
    });
}
export const componentRegistrySchema = z
    .array(componentRegistryEntrySchema)
    .superRefine(uniqueByName);
export const packageRegistrySchema = z
    .array(packageRegistryEntrySchema)
    .superRefine(uniqueByName);
export const tokenRegistrySchema = z
    .array(tokenRegistryEntrySchema)
    .superRefine(uniqueByName);
export function getTokenRegistryJsonSchema() {
    return z.toJSONSchema(tokenRegistrySchema, {
        target: 'draft-7',
    });
}
export function formatValidationError(source, error) {
    const details = error.issues
        .map((issue) => {
        const path = issue.path.length > 0 ? issue.path.join('.') : 'frontmatter';
        return `- ${path}: ${issue.message}`;
    })
        .join('\n');
    return `Invalid metadata in ${source}:\n${details}`;
}
export function parsePageFrontmatter(value, source = 'unknown MDX file') {
    const candidate = typeof value === 'object' && value !== null
        ? value
        : {};
    const schema = 'package' in candidate
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
export function parseRegistry(schema, value, source) {
    const result = schema.safeParse(value);
    if (!result.success) {
        throw new Error(formatValidationError(source, result.error));
    }
    return result.data;
}
