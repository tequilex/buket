import { z } from 'zod';

export const channelIdSchema = z.enum(['whatsapp', 'max', 'avito']);
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
  /** Показывается приглушённым и неактивным — так сейчас работает max. */
  disabled: z.boolean().optional(),
});

/**
 * Почтовый адрес для карточки организации. Необязателен: пока он не заполнен,
 * LocalBusiness отдаётся без адреса — это валидно, но расширенный сниппет по
 * такой разметке не выдаётся. Заполнять только реальными данными.
 */
export const postalAddressSchema = z.object({
  street: z.string().min(1),
  locality: z.string().min(1),
  region: z.string().min(1),
  postalCode: z.string().min(1),
});

export const geoSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const siteConfigSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string().min(1),
  /** Номер для формы обратного звонка. Тот же, что в ссылке WhatsApp. */
  phone: z.string().min(1),
  serviceLocations: z.array(locationSlugSchema).min(1),
  channels: z.array(contactChannelSchema).length(3),
  address: postalAddressSchema.optional(),
  geo: geoSchema.optional(),
  /** Формат schema.org: «Mo-Fr 09:00-20:00». */
  openingHours: z.array(z.string().min(1)).optional(),
});

export const categorySchema = z.object({
  slug: categorySlugSchema,
  title: z.string().min(1),
  /** Короткая метка для фильтров и крошек: «Мясные». */
  shortTitle: z.string().min(1),
  shortDescription: z.string().min(1),
  heroDescription: z.string().min(1),
  /** Развёрнутый текст категории: состав, кому подходит, что учесть. */
  about: z.array(z.string().min(1)).min(1),
});

export const locationSchema = z.object({
  slug: locationSlugSchema,
  /** Голое название населённого пункта — для areaServed в разметке. */
  city: z.string().min(1),
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
  /** Короткая метка для пилюль и списка поводов: «На 23 февраля». */
  shortTitle: z.string().min(1),
  intro: z.string().min(1),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
  relatedBouquetSlugs: z.array(z.string().min(1)).min(1),
  /** Развёрнутый текст повода: что берут, на что смотреть, что учесть. */
  about: z.array(z.string().min(1)).min(1),
  /** Когда заказывать. Для сезонных поводов — главный блок страницы. */
  timing: z.string().min(1),
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
export type PostalAddress = z.infer<typeof postalAddressSchema>;
export type Geo = z.infer<typeof geoSchema>;
export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type CategoryEntry = z.infer<typeof categorySchema>;
export type LocationEntry = z.infer<typeof locationSchema>;
export type BouquetEntry = z.infer<typeof bouquetSchema>;
export type OccasionEntry = z.infer<typeof occasionSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type ReviewEntry = z.infer<typeof reviewSchema>;
