'use client';

import React from 'react';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemove }: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-neutral-200">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
          <h3 className="text-lg font-medium text-neutral-900 tracking-tight">Your Shopping Cart ({items.length})</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900 text-sm font-semibold">
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center pb-6 border-b border-neutral-100">
                <div className="w-20 h-20 bg-neutral-100 rounded-xl overflow-hidden shrink-0 border border-neutral-200">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-semibold text-neutral-900">{item.name}</h4>
                  <p className="text-xs text-neutral-500">EU {item.size} • {item.color}</p>
                  <p className="text-sm font-medium text-neutral-800">Ksh {item.price.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="text-xs text-neutral-400 hover:text-rose-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 space-y-3">
              <p className="text-sm text-neutral-500 font-light">Your cart is currently empty.</p>
              <button onClick={onClose} className="text-xs font-semibold uppercase tracking-wider underline text-neutral-900">
                Explore Collection
              </button>
            </div>
          )}
        </div>

        {/* Footer & Checkout Action */}
        <div className="p-6 border-t border-neutral-200 space-y-4 bg-neutral-50">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600 font-light">Subtotal</span>
            <span className="font-semibold text-neutral-900">Ksh {subtotal.toLocaleString()}</span>
          </div>
          <p className="text-[11px] text-neutral-500 font-light">Shipping and M-Pesa instant payment calculated at checkout.</p>
          <Link
            href="/products/craftdean-wing"
            onClick={onClose}
            className="block w-full bg-neutral-900 hover:bg-neutral-800 text-white text-center py-3.5 rounded-xl font-medium text-sm transition-all shadow-md"
          >
            Proceed to Secure Checkout
          </Link>
        </div>

      </div>
    </div>
  );
}