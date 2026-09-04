'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const allInventory = [
  { id: 'craftdean-wing', name: 'Clarks Craftdean Wing Brogue', category: 'Pre-Owned Leather', price: 6500 },
  { id: 'desert-boot-suede', name: 'Clarks Desert Boot Suede', category: 'Suede Collection', price: 5800 },
  { id: 'whiddon-step', name: 'Clarks Whiddon Step Loafer', category: 'Pre-Owned Leather', price: 5200 },
  { id: 'wallabee-suede', name: 'Clarks Wallabee Suede', category: 'Suede Collection', price: 7200 },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredResults = allInventory.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-neutral-200">
          <svg className="w-5 h-5 text-neutral-400 mr-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search Clarks, suede colors, sizes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-neutral-900 placeholder:text-neutral-400 text-base focus:outline-none bg-transparent"
          />
          <button 
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-semibold text-neutral-500 hover:text-neutral-900 ml-3 px-2 py-1 bg-neutral-100 rounded-lg"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
              >
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-950">{item.name}</h4>
                  <span className="text-xs uppercase tracking-wider text-neutral-500">{item.category}</span>
                </div>
                <span className="text-sm font-medium text-neutral-700">Ksh {item.price.toLocaleString()}</span>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 text-sm text-neutral-500 font-light">
              No matching Clarks models found. Try searching for "Suede" or "Brogue".
            </div>
          )}
        </div>

      </div>
    </div>
  );
}