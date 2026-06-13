'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, MapPin, Minimize2, Calendar } from 'lucide-react';
import { projectsData } from '@/data/projects';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ongoing' | 'completed' | 'residential' | 'commercial' | 'independent'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'completed', label: 'Completed' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'independent', label: 'Independent Villas' }
  ] as const;

  const filteredProjects = projectsData.filter((project) => {
    // Category match
    let matchesCategory = true;
    if (activeFilter === 'ongoing') matchesCategory = project.status === 'ongoing';
    else if (activeFilter === 'completed') matchesCategory = project.status === 'completed';
    else if (activeFilter === 'residential') matchesCategory = project.category === 'residential';
    else if (activeFilter === 'commercial') matchesCategory = project.category === 'commercial';
    else if (activeFilter === 'independent') matchesCategory = project.category === 'independent';

    // Search match
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.name.toLowerCase().includes(query) ||
      project.location.toLowerCase().includes(query) ||
      project.type.toLowerCase().includes(query) ||
      project.year.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20">

      {/* Page Header */}
      <section className="bg-charcoal-dark text-white py-24 relative overflow-hidden border-b border-gold/15">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold mb-3">Construction Excellence</span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Our Projects
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="w-16 h-[1px] bg-gold"
          ></motion.div>
        </div>
      </section>

      {/* Filters & Search Block */}
      <section className="py-12 bg-white border-b border-gray-100 sticky top-[72px] sm:top-[76px] z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-6 justify-between items-center">

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`font-display text-[10px] uppercase tracking-wider px-4 py-2.5 transition-all duration-300 ${
                  activeFilter === tab.id
                    ? 'bg-gold text-charcoal-dark font-bold'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-charcoal-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search project, sector, year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#fcfcfc] border border-gray-200 text-xs pl-10 pr-4 py-3 rounded-none focus:outline-none focus:border-gold text-charcoal"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={14} />
          </div>

        </div>
      </section>

      {/* Project Grid Section */}
      <section className="py-20 md:py-28 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-gray-400 text-sm font-light">No projects found matching the criteria.</span>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={project.id}
                  >
                    <Link href={`/projects/${project.id}`} className="group block bg-white border border-gray-100 hover:border-gold/30 hover:shadow-luxury transition-all duration-300">
                      {/* Image block */}
                      <div className="h-64 overflow-hidden relative bg-charcoal">
                        <img
                          src={project.mainImage}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Status absolute tag */}
                        <div className={`absolute top-4 right-4 text-[9px] uppercase tracking-widest px-3 py-1 font-bold ${
                          project.status === 'ongoing'
                            ? 'bg-gold text-charcoal-dark'
                            : 'bg-charcoal text-white border border-white/10'
                        }`}>
                          {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-6">
                        <span className="text-[9px] uppercase tracking-[0.15em] text-gold font-bold mb-2 block">
                          {project.type}
                        </span>
                        <h3 className="font-display text-lg font-bold text-charcoal-dark uppercase tracking-wide group-hover:text-gold transition-colors mb-3">
                          {project.name}
                        </h3>
                        <p className="text-gray-500 font-light text-xs line-clamp-2 mb-6">
                          {project.description}
                        </p>

                        <div className="border-t border-gray-100 pt-4 grid grid-cols-3 gap-2 text-[10px] text-gray-500 uppercase font-semibold">
                          <span className="flex items-center gap-1">
                            <MapPin size={10} className="text-gold shrink-0" />
                            <span className="truncate">{project.location.split(',')[0]}</span>
                          </span>
                          <span className="flex items-center gap-1 justify-center border-x border-gray-100">
                            <Minimize2 size={10} className="text-gold shrink-0" />
                            <span>{project.area}</span>
                          </span>
                          <span className="flex items-center gap-1 justify-end">
                            <Calendar size={10} className="text-gold shrink-0" />
                            <span>{project.year.toString().replace("Ongoing ", "")}</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </section>

    </div>
  );
};
export default Projects;
