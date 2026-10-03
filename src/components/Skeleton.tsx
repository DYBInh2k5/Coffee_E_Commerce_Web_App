import React from 'react';

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-stone-800/50 border border-stone-700/50 rounded-2xl overflow-hidden animate-pulse">
    <div className="aspect-square bg-stone-700/50" />
    <div className="p-5 space-y-3">
      <div className="flex justify-between">
        <div className="h-5 bg-stone-700/50 rounded w-3/4" />
        <div className="h-5 bg-stone-700/50 rounded w-12" />
      </div>
      <div className="h-3 bg-stone-700/50 rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-6 bg-stone-700/50 rounded-full w-16" />
        <div className="h-6 bg-stone-700/50 rounded-full w-20" />
      </div>
      <div className="h-10 bg-stone-700/50 rounded-xl" />
    </div>
  </div>
);

export const ProductDetailSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
    <div className="aspect-square bg-stone-700/50 rounded-2xl" />
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="h-6 bg-stone-700/50 rounded-full w-24" />
        <div className="h-6 bg-stone-700/50 rounded-full w-20" />
      </div>
      <div className="h-10 bg-stone-700/50 rounded w-3/4" />
      <div className="h-4 bg-stone-700/50 rounded w-1/2" />
      <div className="space-y-2">
        <div className="h-4 bg-stone-700/50 rounded" />
        <div className="h-4 bg-stone-700/50 rounded" />
        <div className="h-4 bg-stone-700/50 rounded w-5/6" />
      </div>
      <div className="flex gap-2">
        <div className="h-8 bg-stone-700/50 rounded-full w-20" />
        <div className="h-8 bg-stone-700/50 rounded-full w-24" />
        <div className="h-8 bg-stone-700/50 rounded-full w-16" />
      </div>
      <div className="h-12 bg-stone-700/50 rounded-xl mt-6" />
    </div>
  </div>
);
