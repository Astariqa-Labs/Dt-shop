import Link from 'next/link';
import CheckoutView from './CheckoutView';

const productsData: Record<string, any> = {
  'craftdean-wing': {
    id: 'craftdean-wing',
    name: 'Clarks Craftdean Wing Brogue',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop',
    condition: 'Verified Clean Pre-Owned',
    description: 'Authentic leather brogue, carefully inspected, conditioned, and restored. Exceptional structure and timeless formal style.',
    variants: [
      { id: 'v1', size_eu: '40', color: 'Dark Brown' },
      { id: 'v2', size_eu: '41', color: 'Dark Brown' },
      { id: 'v3', size_eu: '42', color: 'Black' },
      { id: 'v4', size_eu: '43', color: 'Black' }
    ]
  },
  'desert-boot-suede': {
    id: 'desert-boot-suede',
    name: 'Clarks Desert Boot Suede',
    price: 5800,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    condition: 'Inspected Suede Condition',
    description: 'The iconic desert boot silhouette in rich, brushed suede colors. Cleaned and treated to maintain soft texture and durability.',
    variants: [
      { id: 'v5', size_eu: '40', color: 'Sand Suede' },
      { id: 'v6', size_eu: '41', color: 'Sand Suede' },
      { id: 'v7', size_eu: '42', color: 'Beeswax Suede' },
      { id: 'v8', size_eu: '43', color: 'Beeswax Suede' }
    ]
  },
  'wallabee-suede': {
    id: 'wallabee-suede',
    name: 'Clarks Wallabee Suede',
    price: 7200,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop',
    condition: 'Premium Suede Collection',
    description: 'Classic crepe sole Wallabee in plush suede colorways. Carefully sanitized and brushed for a pristine look.',
    variants: [
      { id: 'v13', size_eu: '40', color: 'Maple Suede' },
      { id: 'v14', size_eu: '41', color: 'Maple Suede' },
      { id: 'v15', size_eu: '42', color: 'Dark Olive Suede' },
      { id: 'v16', size_eu: '43', color: 'Dark Olive Suede' }
    ]
  }
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const product = productsData[slug] || productsData['craftdean-wing'];

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans">
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-7 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <Link href="/" className="flex items-center space-x-3">
          <span className="font-sans text-xl font-bold tracking-[0.2em] uppercase">Deuteronomy</span>
          <span className="bg-neutral-900 text-white text-[10px] uppercase font-semibold tracking-widest px-2 py-0.5 rounded-full">Shop</span>
        </Link>
        <nav className="hidden md:flex space-x-10 text-sm font-medium tracking-wide text-neutral-600">
          <Link href="/" className="hover:text-neutral-950 transition-colors">Home</Link>
          <Link href="/products" className="hover:text-neutral-950 transition-colors">Products</Link>
          <Link href="/services" className="hover:text-neutral-950 transition-colors">Services</Link>
        </nav>
        <div className="flex items-center space-x-6 text-sm font-medium text-neutral-600">
          <span className="hover:text-neutral-950 transition-colors cursor-pointer">Search</span>
          <span className="hover:text-neutral-950 transition-colors cursor-pointer">Cart (0)</span>
          <span className="hover:text-neutral-950 transition-colors cursor-pointer">Account</span>
        </div>
      </header>

      <main className="pt-28">
        <CheckoutView product={product} />
      </main>
    </div>
  );
}