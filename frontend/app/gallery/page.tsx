'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: number;
  url: string;
  title: string;
  category: 'interior' | 'exterior' | 'construction';
}

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'interior' | 'exterior' | 'construction'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      title: "Nirvana Manohara Exterior Renders",
      category: "exterior"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      title: "Luxury Living Room Finishes",
      category: "interior"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
      title: "Venkata Lakshmi Nilayam Elevation",
      category: "exterior"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      title: "Modern Modular Kitchen Setup",
      category: "interior"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
      title: "Ongoing Concrete Casting Patancheru",
      category: "construction"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      title: "IMR Tulasi Vanam Entrance Elevation",
      category: "exterior"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      title: "Duplex Staircase Craftsmanship",
      category: "interior"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      title: "Steel Reinforcements Check Nandanavam",
      category: "construction"
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      title: "Urban Elite Glass Facade Render",
      category: "exterior"
    }
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  const tabs = [
    { id: 'all', label: 'All Media' },
    { id: 'exterior', label: 'Exteriors' },
    { id: 'interior', label: 'Interiors' },
    { id: 'construction', label: 'Under Construction' }
  ] as const;

  return (
    <div className="pt-20">

      {/* Page Header */}
      <section className="bg-charcoal-dark text-white py-24 relative overflow-hidden border-b border-gold/15">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold mb-3">Cinematic Visuals</span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Media Gallery
          </h1>
          <div className="w-16 h-[1px] bg-gold"></div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-cream border-b border-gray-100 flex justify-center">
        <div className="flex flex-wrap justify-center gap-2 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`font-display text-[10px] uppercase tracking-wider px-5 py-2.5 transition-all duration-300 ${
                activeCategory === tab.id
                  ? 'bg-gold text-charcoal-dark font-bold shadow'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-charcoal-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-20 md:py-28 bg-sand">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="break-inside-avoid relative overflow-hidden group cursor-pointer border border-gray-100 bg-cream"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-gold/20 backdrop-blur border border-gold/40 flex items-center justify-center text-gold">
                      <Maximize2 size={12} />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gold font-bold mb-1 block">
                      {item.category === 'interior' ? 'Interior Details' : item.category === 'exterior' ? 'Exterior Render' : 'Site Progress'}
                    </span>
                    <h3 className="font-display text-white text-xs uppercase tracking-wide font-medium">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-charcoal-dark/95 backdrop-blur-md flex flex-col justify-center items-center p-6"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X size={28} />
            </button>

            {/* Slider Content */}
            <div className="relative max-w-5xl w-full flex items-center justify-center">

              {/* Prev Button */}
              <button
                onClick={prevImage}
                className="absolute left-0 w-12 h-12 bg-black/40 border border-white/10 hover:bg-black/60 flex items-center justify-center text-white"
                aria-label="Previous Image"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Central Image */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="max-h-[75vh] max-w-full flex flex-col items-center"
              >
                <img
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[70vh] object-contain border border-gold/10 shadow-luxury-lg"
                />
                <div className="text-center pt-4">
                  <span className="text-[9px] uppercase tracking-widest text-gold font-bold block mb-1">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h4 className="text-white text-sm uppercase tracking-wide font-display">
                    {filteredItems[lightboxIndex].title}
                  </h4>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-0 w-12 h-12 bg-black/40 border border-white/10 hover:bg-black/60 flex items-center justify-center text-white"
                aria-label="Next Image"
              >
                <ChevronRight size={20} />
              </button>

            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default Gallery;
