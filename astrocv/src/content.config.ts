import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    schema: () =>
        z.object({
            createdBy: z.string(),
            creatorIcon: z.string(),
            pubDate: z.coerce.string(),
            title: z.string(),
            type: z.enum(['post', 'review']),
            age: z.number().optional(),
            image: z.string().optional(),
            author: z.string().optional(),
            description: z.string().optional(),
            rating: z.enum(['poor', 'mediocre', 'good', 'excellent']).optional(),
            tags: z.array(z.string()).optional(),
        }),
});

export const collections = { blog };