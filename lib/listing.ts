import { getProduct, products, type Product } from "./catalog";
import { resolveImage } from "./images";

// A piece appears on the site only once its main photo is in public/images.
// Adding the photo is all it takes to list it; no code change needed.

function hasPhoto(p: Product): boolean {
  return resolveImage(p.images[0]) !== null;
}

export function listedProducts(collectionSlug?: string): Product[] {
  return products.filter((p) => hasPhoto(p) && (!collectionSlug || p.collection === collectionSlug));
}

export function getListedProduct(slug: string): Product | undefined {
  const p = getProduct(slug);
  return p && hasPhoto(p) ? p : undefined;
}

export function onlyListed(list: Product[]): Product[] {
  return list.filter(hasPhoto);
}
