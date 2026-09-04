import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      id: 'cleaning-restoration',
      title: 'Deep Cleaning & Leather Conditioning',
      tag: 'Care',
      description: 'We use professional-grade conditioning balms and specialized cleaners to remove wear, hydrate dry leather, and restore original suppleness to second-hand uppers.',
      price: 'Ksh 800 per pair'
    },
    {
      id: 'suede-revival',
      title: 'Suede Color Revival & Care',
      tag: 'Suede Collection',
      description: 'Specialized care for our suede color variations. We clean, brush, and restore nap texture while refreshing rich pigment tones without damaging the delicate material.',
      price: 'Ksh 1,000 per pair'
    },
  ];

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
          <Link href="/products" className="hover:text-neutral-950 transition-colors">Products</Link>
          <Link href="/services" className="text-neutral-950 font-semibold transition-colors">Services</Link>
        </nav>
        <div className="flex items-center space-x-6 text-sm font-medium text-neutral-600">
          <span className="hover:text-neutral-950 transition-colors cursor-pointer">Search</span>
          <span className="hover:text-neutral-950 transition-colors cursor-pointer">Cart (0)</span>
          <span className="hover:text-neutral-950 transition-colors cursor-pointer">Account</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-10 py-16 space-y-16">
        
        {/* Page Header */}
        <div className="max-w-2xl space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold">Our Expertise</span>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900">Footwear Care & Services</h1>
          <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed">
            Beyond offering clean, authentic pre-owned Clarks and suede collections, we ensure every pair meets high standards of hygiene, appearance, and structural durability.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 bg-white border border-neutral-200 rounded-full text-[10px] font-semibold uppercase tracking-wider text-neutral-700 shadow-sm">
                  {service.tag}
                </span>
                <h2 className="text-xl font-medium text-neutral-900">{service.title}</h2>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">{service.description}</p>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Rate</span>
                <span className="text-sm font-semibold text-neutral-950">{service.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="p-10 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-light tracking-tight">Looking for a specific Clarks colorway?</h2>
            <p className="text-sm text-neutral-400 font-light">Reach out to our sourcing team to check upcoming inventory drops.</p>
          </div>
          <Link 
            href="/products" 
            className="px-8 py-3.5 bg-white text-neutral-950 rounded-full font-medium text-sm tracking-wide hover:bg-neutral-200 transition-all shrink-0"
          >
            Browse Available Stock
          </Link>
        </div>

      </main>
    </div>
  );
}