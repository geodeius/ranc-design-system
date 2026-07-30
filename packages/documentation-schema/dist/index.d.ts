import { z } from 'zod';
export declare const lifecycleStatuses: readonly ["planned", "experimental", "alpha", "beta", "stable", "deprecated", "removed"];
export declare const lifecycleStatusSchema: z.ZodEnum<{
    planned: "planned";
    experimental: "experimental";
    alpha: "alpha";
    beta: "beta";
    stable: "stable";
    deprecated: "deprecated";
    removed: "removed";
}>;
export declare const generalPageSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    category: z.ZodString;
    status: z.ZodEnum<{
        planned: "planned";
        experimental: "experimental";
        alpha: "alpha";
        beta: "beta";
        stable: "stable";
        deprecated: "deprecated";
        removed: "removed";
    }>;
    order: z.ZodNumber;
    owners: z.ZodArray<z.ZodString>;
    lastReviewed: z.ZodPreprocess<z.ZodISODate>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const componentPageSchema: z.ZodObject<{
    version: z.ZodNullable<z.ZodString>;
    package: z.ZodString;
    figmaNode: z.ZodNullable<z.ZodURL>;
    accessibilityStatus: z.ZodEnum<{
        pending: "pending";
        "in-review": "in-review";
        passed: "passed";
    }>;
    platforms: z.ZodArray<z.ZodString>;
    title: z.ZodString;
    description: z.ZodString;
    category: z.ZodString;
    status: z.ZodEnum<{
        planned: "planned";
        experimental: "experimental";
        alpha: "alpha";
        beta: "beta";
        stable: "stable";
        deprecated: "deprecated";
        removed: "removed";
    }>;
    order: z.ZodNumber;
    owners: z.ZodArray<z.ZodString>;
    lastReviewed: z.ZodPreprocess<z.ZodISODate>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const foundationPageSchema: z.ZodObject<{
    tokenGroup: z.ZodString;
    platforms: z.ZodArray<z.ZodString>;
    title: z.ZodString;
    description: z.ZodString;
    category: z.ZodString;
    status: z.ZodEnum<{
        planned: "planned";
        experimental: "experimental";
        alpha: "alpha";
        beta: "beta";
        stable: "stable";
        deprecated: "deprecated";
        removed: "removed";
    }>;
    order: z.ZodNumber;
    owners: z.ZodArray<z.ZodString>;
    lastReviewed: z.ZodPreprocess<z.ZodISODate>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const componentRegistryEntrySchema: z.ZodObject<{
    name: z.ZodString;
    displayName: z.ZodString;
    category: z.ZodString;
    status: z.ZodEnum<{
        planned: "planned";
        experimental: "experimental";
        alpha: "alpha";
        beta: "beta";
        stable: "stable";
        deprecated: "deprecated";
        removed: "removed";
    }>;
    packages: z.ZodRecord<z.ZodString, z.ZodString>;
    platforms: z.ZodArray<z.ZodString>;
    figma: z.ZodNullable<z.ZodURL>;
    documentation: z.ZodString;
    owners: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const packageRegistryEntrySchema: z.ZodObject<{
    name: z.ZodString;
    status: z.ZodEnum<{
        planned: "planned";
        experimental: "experimental";
        alpha: "alpha";
        beta: "beta";
        stable: "stable";
        deprecated: "deprecated";
        removed: "removed";
    }>;
    private: z.ZodBoolean;
    documentation: z.ZodNullable<z.ZodString>;
    owners: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const tokenRegistryEntrySchema: z.ZodObject<{
    name: z.ZodString;
    group: z.ZodString;
    status: z.ZodEnum<{
        planned: "planned";
        experimental: "experimental";
        alpha: "alpha";
        beta: "beta";
        stable: "stable";
        deprecated: "deprecated";
        removed: "removed";
    }>;
    platforms: z.ZodArray<z.ZodString>;
    owners: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export declare const componentRegistrySchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    displayName: z.ZodString;
    category: z.ZodString;
    status: z.ZodEnum<{
        planned: "planned";
        experimental: "experimental";
        alpha: "alpha";
        beta: "beta";
        stable: "stable";
        deprecated: "deprecated";
        removed: "removed";
    }>;
    packages: z.ZodRecord<z.ZodString, z.ZodString>;
    platforms: z.ZodArray<z.ZodString>;
    figma: z.ZodNullable<z.ZodURL>;
    documentation: z.ZodString;
    owners: z.ZodArray<z.ZodString>;
}, z.core.$strict>>;
export declare const packageRegistrySchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    status: z.ZodEnum<{
        planned: "planned";
        experimental: "experimental";
        alpha: "alpha";
        beta: "beta";
        stable: "stable";
        deprecated: "deprecated";
        removed: "removed";
    }>;
    private: z.ZodBoolean;
    documentation: z.ZodNullable<z.ZodString>;
    owners: z.ZodArray<z.ZodString>;
}, z.core.$strict>>;
export declare const tokenRegistrySchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    group: z.ZodString;
    status: z.ZodEnum<{
        planned: "planned";
        experimental: "experimental";
        alpha: "alpha";
        beta: "beta";
        stable: "stable";
        deprecated: "deprecated";
        removed: "removed";
    }>;
    platforms: z.ZodArray<z.ZodString>;
    owners: z.ZodArray<z.ZodString>;
}, z.core.$strict>>;
export declare function getTokenRegistryJsonSchema(): Record<string, unknown>;
export type GeneralPageFrontmatter = z.infer<typeof generalPageSchema>;
export type ComponentPageFrontmatter = z.infer<typeof componentPageSchema>;
export type FoundationPageFrontmatter = z.infer<typeof foundationPageSchema>;
export type PageFrontmatter = GeneralPageFrontmatter | ComponentPageFrontmatter | FoundationPageFrontmatter;
export type ComponentRegistryEntry = z.infer<typeof componentRegistryEntrySchema>;
export type PackageRegistryEntry = z.infer<typeof packageRegistryEntrySchema>;
export type TokenRegistryEntry = z.infer<typeof tokenRegistryEntrySchema>;
export declare function formatValidationError(source: string, error: z.ZodError): string;
export declare function parsePageFrontmatter(value: unknown, source?: string): PageFrontmatter;
export declare function parseRegistry<T>(schema: z.ZodType<T>, value: unknown, source: string): T;
//# sourceMappingURL=index.d.ts.map