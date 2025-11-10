import { useState } from 'react';
import { Product } from '../lib/supabase';
import { generateWhatsAppLink } from '../lib/whatsapp';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '');

  const handleOrder = () => {
    const whatsappLink = generateWhatsAppLink(
      product.name,
      selectedSize,
      selectedColor
    );
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-6xl">👕</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-medium text-lg text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          {product.subcategory && (
            <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
              {product.subcategory}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">KSh {product.price.toLocaleString()}</span>
          {!product.in_stock && (
            <span className="text-xs text-red-600 font-medium">Out of Stock</span>
          )}
        </div>

        {product.colors.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700">Color:</p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 text-xs border rounded transition-all ${
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.sizes.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700">Size:</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-xs border rounded transition-all ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleOrder}
          disabled={!product.in_stock}
          className="w-full py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-4"
        >
          {product.in_stock ? 'Order via WhatsApp' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
