'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  const bestSellers = [
    {
      id: 'craftdean-wing',
      name: 'Clarks Craftdean Wing Brogue',
      category: 'Pre-Owned Leather',
      price: 6500,
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'desert-boot-suede',
      name: 'Clarks Desert Boot Suede',
      category: 'Suede Collection',
      price: 5800,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'wallabee-suede',
      name: 'Clarks Wallabee Suede',
      category: 'Suede Collection',
      price: 7200,
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section with Transparent Navbar Overlay */}
      <section className="relative h-[85vh] w-full bg-neutral-900 overflow-hidden">
        <Navbar transparent={true} />

        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1600&auto=format&fit=crop" 
            alt="Authentic Secondhand Clarks" 
            className="w-full h-full object-cover object-center opacity-55 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-10 pt-20">
          <div className="max-w-xl space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-300 font-semibold">
              Authentic Pre-Owned Clarks & Suede
            </span>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.1]">
              Timeless Clarks.<br />
              <span className="font-semibold text-white">Inspected & Cleaned.</span>
            </h1>
            <p className="text-neutral-300 text-sm md:text-base font-light tracking-wide leading-relaxed">
              Discover verified second-hand leather and rich color suede collections. Premium footwear quality at a fraction of the cost.
            </p>
            <div className="pt-2">
              <Link 
                href="/products/craftdean-wing" 
                className="inline-block bg-white text-neutral-950 px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-neutral-200 transition-all shadow-lg"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-10 z-20 flex items-center space-x-3 text-white text-xs font-medium">
          <span className="w-6 h-6 rounded-full border border-white flex items-center justify-center bg-white/20">1</span>
          <span className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer">2</span>
          <span className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer">3</span>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-10 py-20 bg-white">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Curated Arrivals</span>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 mt-1">Featured Inventory</h2>
          </div>
          <Link href="/products" className="text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 underline underline-offset-4 transition-colors">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map((shoe) => (
            <Link key={shoe.id} href={`/products/${shoe.id}`} className="group space-y-3">
              <div className="aspect-square bg-neutral-100 rounded-2xl overflow-hidden relative border border-neutral-200">
                <img 
                  src={shoe.image} 
                  alt={shoe.name} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1 pt-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">{shoe.category}</span>
                <h3 className="text-sm font-semibold text-neutral-950">{shoe.name}</h3>
                <p className="text-sm font-medium text-neutral-700">Ksh {shoe.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}