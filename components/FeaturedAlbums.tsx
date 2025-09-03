"use client";
import React, { useEffect, useState } from 'react'
import { fetchProducts } from '@/app/client/hooks/products'
import { BaseProduct } from '@/lib/types/product'
import { ProductCard } from './ProductCard'

export function FeaturedAlbums() {
    const [products, setProducts] = useState<BaseProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data as BaseProduct[]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-400">Loading...</p>
    </div>
  } else if (products.length === 0) {
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-400">No Products available.</p>
    </div>
  }
  return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>  )
}

