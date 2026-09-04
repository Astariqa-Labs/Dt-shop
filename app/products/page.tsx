import Link from 'next/link';

const catalogProducts = [
  {
    id: 'craftdean-wing',
    name: 'Clarks Craftdean Wing Brogue',
    category: 'Pre-Owned Leather',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop',
    condition: 'Verified Clean'
  },
  {
    id: 'desert-boot-suede',
    name: 'Clarks Desert Boot Suede',
    category: 'Suede Collection',
    price: 5800,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    condition: 'Inspected Suede'
  },
  {
    id: 'wallabee-suede',
    name: 'Clarks Wallabee Suede',
    category: 'Suede Collection',
    price: 7200,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop',
    condition: 'Premium Suede'
  },
  {
    id: 'nature-iv-leather',
    name: 'Clarks Nature IV GTX',
    category: 'Pre-Owned Leather',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop',
    condition: 'Verified Clean'
  },
  {
    id: 'weaver-suede-boot',
    name: 'Clarks Weaver Suede',
    category: 'Suede Collection',
    price: 6800,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    condition: 'Inspected Suede'
  }
];

export default function ProductsCatalogPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans">
      
      {/* Header Navigation */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-10 py-7 border-b border-neutral-200 bg-white/90 backdrop-blur-md">
        <Link href="/" className="flex items-center space-x-3">
          <span className="font-sans text-xl font-bold tracking-[0.2em] uppercase">Deuteronomy</span>
          <span className="bg-neutral-900 text-white text-[10px] uppercase font-semibold tracking-widest px-2 py-0.5 rounded-full">Shop</span>
        </Link>
        <nav className="hidden md:flex space-x-10 text-sm font-medium tracking-wide text-neutral-600">
          <Link href="/" className="hover:text-neutral-950 transition-colors">Home</Link>
          <Link href="/products" className="text-neutral-950 font-semibold transition-colors">Products</Link>
          <Link href="/services" className="hover:text-neutral-950 transition-colors">Services</Link>
        </nav>
        <div className="flex items-center space-x-6 text-sm font-medium text-neutral-600">
          <span className="hover:text-neutral-950 transition-colors cursor-pointer">Search</span>
          <span className="hover:text-neutral-950 transition-colors cursor-pointer">Cart (0)</span>
          <span className="hover:text-neutral-950 transition-colors cursor-pointer">Account</span>
        </div>
      </header>

      {/* Catalog Main Content */}
      <main className="max-w-7xl mx-auto px-10 py-16 space-y-12">
        
        {/* Title & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold">Inventory Catalog</span>
            <h1 className="text-4xl font-light tracking-tight text-neutral-900">All Available Clarks</h1>
            <p className="text-sm text-neutral-600 font-light">Authentic second-hand leather and color-rich suede footwear, fully inspected and cleaned.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg bg-neutral-900 text-white shadow-sm">
              All Items
            </button>
            <button className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-neutral-300 hover:border-neutral-900 text-neutral-700 transition-colors">
              Leather
            </button>
            <button className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-neutral-300 hover:border-neutral-900 text-neutral-700 transition-colors">
              Suede Colors
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {catalogProducts.map((shoe) => (
            <Link key={shoe.id} href={`/products/${shoe.id}`} className="group space-y-4">
              <div className="aspect-square bg-neutral-100 rounded-2xl overflow-hidden relative border border-neutral-200">
                <img 
                  src={shoe.image} 
                  alt={shoe.name} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-neutral-800 border border-neutral-200 shadow-sm">
                  {shoe.condition}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">{shoe.category}</span>
                <h3 className="text-base font-semibold text-neutral-950 group-hover:underline">{shoe.name}</h3>
                <p className="text-sm font-medium text-neutral-700">Ksh {shoe.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}