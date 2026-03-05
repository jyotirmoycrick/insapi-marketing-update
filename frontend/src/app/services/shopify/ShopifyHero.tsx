import { UniversalHero } from '@/components/UniversalHero';
import heroImage from '@/assets/services/shopify/shopify-001-hero.png';

export function ShopifyHero() {
  return (
    <UniversalHero
      page="shopify"
      imageSrc={heroImage}
      imageAlt="Shopify Development Services"
    />
  );
}
