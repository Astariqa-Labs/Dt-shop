'use client';

import React, { useState } from 'react';

interface CheckoutViewProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    condition: string;
    description: string;
    variants: { id: string; size_eu: string; color: string }[];
  };
}

export default function CheckoutView({ product }: CheckoutViewProps) {
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]?.id || '');
  const [selectedColor, setSelectedColor] = useState(product?.variants?.[0]?.color || 'Standard');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleMpesaCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    let formattedPhone = phoneNumber.trim();
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.slice(1);
    } else if (formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.slice(1);
    }

    try {
      const response = await fetch('/api/checkout/mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ variantId: selectedVariant, quantity: 1, unitPrice: product?.price }],
          phoneNumber: formattedPhone,
          totalAmount: product?.price,
          shippingAddress: { city: 'Nairobi', country: 'KE', address_line_1: 'Standard Delivery' }
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'STK push sent. Please check your phone and enter your M-Pesa PIN.'
        });
      } else {
        setMessage({ type: 'error', text: data.error || 'Checkout failed. Please try again.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start font-sans text-neutral-900">
      
      {/* Left: Product Imagery & Authenticity Badge */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200">
          <img 
            src={product?.image} 
            alt={product?.name} 
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-800 border border-neutral-200 shadow-sm">
            {product?.condition || 'Verified Clean Pre-Owned'}
          </div>
        </div>
      </div>

      {/* Right: Product Details, Suede Options & M-Pesa Checkout */}
      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold">Authentic Clarks Inventory</span>
          <h1 className="text-3xl font-light tracking-tight text-neutral-900 mt-2">
            {product?.name}
          </h1>
          <p className="text-2xl font-medium text-neutral-800 mt-2">
            Ksh {product?.price?.toLocaleString()}
          </p>
        </div>

        <p className="text-sm text-neutral-600 leading-relaxed border-t border-b border-neutral-200 py-4 font-light">
          {product?.description || 'Inspect-tested authentic second-hand Clarks footwear. Professionally cleaned, restored condition, featuring premium leather or supple suede finishes.'}
        </p>

        {/* Color / Suede Variation Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-800">Finish & Color: <span className="font-normal text-neutral-600">{selectedColor}</span></label>
          <div className="flex gap-3">
            {Array.from(new Set(product?.variants?.map(v => v.color))).map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => {
                  setSelectedColor(color);
                  const found = product.variants.find(v => v.color === color);
                  if (found) setSelectedVariant(found.id);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  selectedColor === color
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-300 hover:border-neutral-500 bg-white text-neutral-700'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selector (EU) */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-neutral-800">Select Size (EU)</span>
            <span className="text-neutral-500 underline cursor-pointer hover:text-neutral-900 transition-colors">Size Guide</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product?.variants?.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v.id)}
                className={`py-3 text-sm font-medium rounded-xl border transition-all ${
                  selectedVariant === v.id
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-400 bg-neutral-50 text-neutral-800'
                }`}
              >
                EU {v.size_eu}
              </button>
            ))}
          </div>
        </div>

        {/* M-Pesa Express Checkout Form */}
        <form onSubmit={handleMpesaCheckout} className="space-y-4 pt-4 border-t border-neutral-200">
          <div>
            <label className="block text-sm font-medium text-neutral-800 mb-1">M-Pesa Phone Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-500 text-sm font-medium">+254</span>
              <input
                type="tel"
                placeholder="712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full pl-16 pr-4 py-3.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900 text-neutral-900 text-sm transition-all placeholder:text-neutral-400"
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1.5">An STK push payment prompt will be sent directly to your phone.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-40" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Awaiting M-Pesa Prompt...</span>
              </span>
            ) : (
              <span>Pay Now with M-Pesa</span>
            )}
          </button>
        </form>

        {/* Status Notification Message */}
        {message && (
          <div className={`p-4 rounded-xl text-sm ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Trust Elements */}
        <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-neutral-500 border-t border-neutral-200">
          <div>Inspected & Sanitized Quality</div>
          <div>Fast Delivery Across Kenya</div>
        </div>

      </div>
    </div>
  );
}