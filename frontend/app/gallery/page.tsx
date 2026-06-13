'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Leaf } from 'lucide-react';

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
    { id: 1, url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", title: "Nirvana Manohara Exterior Renders", category: "exterior" },
    { id: 2, url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", title: "Luxury Living Room Finishes", category: "interior" },
    { id: 3, url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80", title: "Venkata Lakshmi Nilayam Elevation", category: "exterior" },
    { id: 4, url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", title: "Modern Modular Kitchen Setup", category: "interior" },
    { id: 5, url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80", title: "Ongoing Concrete Casting Patancheru", category: "construction" },
    { id: 6, url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80", title: "IMR Tulasi Vanam Entrance Elevation", category: "exterior" },
    { id: 7, url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", title: "Duplex Staircase Craftsmanship", category: "interior" },
    { id: 8, url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", title: "Steel Reinforcements Check Nandanavam", category: "construction" },
    { id: 9, url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", title: "Urban Elite Glass Facade Render", category: "exterior" }
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

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
    <div className="bg-cream">

      {/* Page Header */}
      <section className="pt-36 md:pt-44 pb-10 md:pb-14">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display mb-6">
            <Leaf size={14} /> Cinematic Visuals
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal leading-[1.05]">Media Gallery</h1>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-wrap gap-2.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`font-display text-[12px] tracking-wide px-5 py-2.5 rounded-full transition-all duration-300 ${
                  activeCategory === tab.id
                    ? 'bg-charcoal text-cream'
                    : 'bg-sand/60 text-charcoal/60 hover:bg-sand hover:text-charcoal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="break-inside-avoid relative overflow-hidden group cursor-pointer rounded-[1.5rem]"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/80 via-charcoal-pure/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <div className="w-9 h-9 rounded-full bg-cream/15 backdrop-blur border border-cream/30 flex items-center justify-center text-cream">
                      <Maximize2 size={13} />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-gold-light font-semibold mb-1 block">
                      {item.category === 'interior' ? 'Interior Details' : item.category === 'exterior' ? 'Exterior Render' : 'Site Progress'}
                    </span>
                    <h3 className="font-serif text-cream text-lg leading-tight">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-charcoal-pure/95 backdrop-blur-md flex flex-col justify-center items-center p-6"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-11 h-11 rounded-full border border-cream/20 text-cream/70 hover:text-cream hover:border-cream/50 flex items-center justify-center transition-colors"
              aria-label="Close Lightbox"
            >
              <X size={22} />
            </button>

            <div className="relative max-w-5xl w-full flex items-center justify-center">
              <button
                onClick={prevImage}
                className="absolute left-0 w-12 h-12 rounded-full bg-cream/10 border border-cream/15 hover:bg-cream/20 flex items-center justify-center text-cream"
                aria-label="Previous Image"
              >
                <ChevronLeft size={20} />
              </button>

              <div onClick={(e) => e.stopPropagation()} className="max-h-[78vh] max-w-full flex flex-col items-center">
                <img
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[70vh] object-contain rounded-2xl shadow-luxury-lg"
                />
                <div className="text-center pt-5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gold-light font-semibold block mb-1">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h4 className="text-cream text-lg font-serif">{filteredItems[lightboxIndex].title}</h4>
                </div>
              </div>

              <button
                onClick={nextImage}
                className="absolute right-0 w-12 h-12 rounded-full bg-cream/10 border border-cream/15 hover:bg-cream/20 flex items-center justify-center text-cream"
                aria-label="Next Image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default Gallery;
