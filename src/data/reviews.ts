import { reviewSchema, type ReviewEntry } from '@/lib/content/schemas';

const rawReviews: ReviewEntry[] = [];

export const reviews = rawReviews.map((entry) => reviewSchema.parse(entry));
