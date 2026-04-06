import { z } from 'zod';

export const channelIdSchema = z.enum(['whatsapp', 'telegram', 'avito']);
export const categorySlugSchema = z.enum([
  'myasnye',
  'rybnye',
  'sladkie',
  'fruktovye',
]);
export const locationSlugSchema = z.enum(['krasnodar', 'yablonovskiy']);

export const contactChannelSchema = z.object({
  id: channelIdSchema,
  label: z.string().min(1),
  href: z.string().url(),
});

export const siteConfigSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string().min(1),
  serviceLocations: z.array(locationSlugSchema).min(1),
  channels: z.array(contactChannelSchema).length(3),
});

export const categorySchema = z.object({
  slug: categorySlugSchema,
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  heroDescription: z.string().min(1),
});

export const locationSchema = z.object({
  slug: locationSlugSchema,
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  deliveryLead: z.string().min(1),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
});

export const bouquetImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

export const bouquetSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  fullDescription: z.string().min(1),
  category: categorySlugSchema,
  tags: z.array(z.string().min(1)).min(1),
  priceFrom: z.number().int().positive(),
  images: z.array(bouquetImageSchema).min(1),
  composition: z.array(z.string().min(1)).min(1),
  weightOrSize: z.string().min(1),
  deliveryNote: z.string().min(1),
  availableLocations: z.array(locationSlugSchema).min(1),
  featured: z.boolean(),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
});

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const occasionSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  intro: z.string().min(1),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
  relatedBouquetSlugs: z.array(z.string().min(1)).min(1),
  faqItems: z.array(faqItemSchema).optional(),
});

export const reviewSchema = z.object({
  author: z.string().min(1),
  text: z.string().min(1),
  location: locationSlugSchema,
  sourceLabel: z.string().min(1),
});

export type ChannelId = z.infer<typeof channelIdSchema>;
export type CategorySlug = z.infer<typeof categorySlugSchema>;
export type LocationSlug = z.infer<typeof locationSlugSchema>;
export type ContactChannel = z.infer<typeof contactChannelSchema>;
export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type CategoryEntry = z.infer<typeof categorySchema>;
export type LocationEntry = z.infer<typeof locationSchema>;
export type BouquetEntry = z.infer<typeof bouquetSchema>;
export type OccasionEntry = z.infer<typeof occasionSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type ReviewEntry = z.infer<typeof reviewSchema>;
