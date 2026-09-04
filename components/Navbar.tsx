'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import SearchModal from './SearchModal';
import CartDrawer from './CartDrawer';

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const { cartItems, isCartOpen, setIsCartOpen, isSearchOpen, setIsSearchOpen, removeFromCart } = useCart();

  return (
    <>
      <header className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-7 transition-all ${
        transparent 
          ? 'bg-transparent text-white' 
          : 'sticky bg-white/90 backdrop-blur-md border-b border-neutral-200 text-neutral-900'
      }`}>
        <Link href="/" className="flex items-center space-x-3">
          <span className={`font-sans text-xl font-bold tracking-[0.2em] uppercase ${transparent ? 'text-white' : 'text-neutral-950'}`}>
            Deuteronomy
          </span>
          <span className={`${transparent ? 'bg-white/15 text-white border border-white/20' : 'bg-neutral-900 text-white'} text-[10px] uppercase font-semibold tracking-widest px-2 py-0.5 rounded-full`}>
            Shop
          </span>
        </Link>

        <nav className={`hidden md:flex space-x-10 text-sm font-medium tracking-wide ${transparent ? 'text-neutral-300' : 'text-neutral-600'}`}>
          <Link href="/" className={`transition-colors ${transparent ? 'text-white' : 'hover:text-neutral-950'}`}>Home</Link>
          <Link href="/products" className={`transition-colors ${transparent ? 'hover:text-white' : 'hover:text-neutral-950'}`}>Products</Link>
          <Link href="/services" className={`transition-colors ${transparent ? 'hover:text-white' : 'hover:text-neutral-950'}`}>Services</Link>
        </nav>

        <div className={`flex items-center space-x-6 text-sm font-medium ${transparent ? 'text-neutral-300' : 'text-neutral-600'}`}>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className={`transition-colors cursor-pointer ${transparent ? 'hover:text-white' : 'hover:text-neutral-950'}`}
          >
            Search
          </button>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className={`transition-colors cursor-pointer ${transparent ? 'hover:text-white' : 'hover:text-neutral-950'}`}
          >
            Cart ({cartItems.length})
          </button>

          <Link href="/account/login" className={`transition-colors ${transparent ? 'hover:text-white' : 'hover:text-neutral-950'}`}>
            Account
          </Link>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart} 
      />
    </>
  );
}