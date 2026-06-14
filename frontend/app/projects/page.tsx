'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, MapPin, Minimize2, Calendar, Leaf } from 'lucide-react';
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
    let matchesCategory = true;
    if (activeFilter === 'ongoing') matchesCategory = project.status === 'ongoing';
    else if (activeFilter === 'completed') matchesCategory = project.status === 'completed';
    else if (activeFilter === 'residential') matchesCategory = project.category === 'residential';
    else if (activeFilter === 'commercial') matchesCategory = project.category === 'commercial';
    else if (activeFilter === 'independent') matchesCategory = project.category === 'independent';

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.name.toLowerCase().includes(query) ||
      project.location.toLowerCase().includes(query) ||
      project.type.toLowerCase().includes(query) ||
      project.year.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-charcoal-dark">

      {/* Page Header */}
      <section className="pt-36 md:pt-44 pb-10 md:pb-14">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold font-semibold font-display mb-6">
            <Leaf size={14} /> Construction Excellence
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-cream leading-[1.05]">Our Projects</h1>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row gap-5 justify-between lg:items-center">
          <div className="flex flex-wrap gap-2.5">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`font-display text-[12px] tracking-wide px-4 py-2.5 rounded-full transition-all duration-300 ${
                  activeFilter === tab.id
                    ? 'bg-charcoal text-cream'
                    : 'bg-sand/60 text-cream/60 hover:bg-sand hover:text-cream'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <input
              type="text"
              placeholder="Search project, sector, year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-sand/50 border border-gold/8 text-sm pl-11 pr-4 py-3 rounded-full focus:outline-none focus:border-gold text-cream placeholder:text-cream/40"
            />
            <Search className="absolute left-4 top-3.5 text-cream/40" size={15} />
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-cream/40 text-sm font-light">No projects found matching the criteria.</span>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={project.id}
                  >
                    <Link href={`/projects/${project.id}`} className="group block rounded-[1.5rem] overflow-hidden bg-charcoal-dark border border-gold/5 hover:shadow-luxury transition-all duration-500 h-full">
                      <div className="h-64 overflow-hidden relative">
                        <img
                          src={project.mainImage}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className={`absolute top-4 right-4 text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full font-semibold backdrop-blur-md ${
                          project.status === 'ongoing'
                            ? 'bg-gold text-cream'
                            : 'bg-charcoal-pure/55 text-cream border border-cream/20'
                        }`}>
                          {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                        </div>
                      </div>

                      <div className="p-7">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-gold font-semibold font-display mb-2 block">
                          {project.type}
                        </span>
                        <h3 className="font-serif text-xl text-cream group-hover:text-gold transition-colors mb-3 leading-tight">
                          {project.name}
                        </h3>
                        <p className="text-cream/55 font-light text-[13px] line-clamp-2 mb-6">
                          {project.description}
                        </p>

                        <div className="border-t border-gold/8 pt-5 grid grid-cols-3 gap-2 text-[11px] text-cream/55 font-medium">
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-gold shrink-0" />
                            <span className="truncate">{project.location.split(',')[0]}</span>
                          </span>
                          <span className="flex items-center gap-1.5 justify-center">
                            <Minimize2 size={12} className="text-gold shrink-0" />
                            <span>{project.area}</span>
                          </span>
                          <span className="flex items-center gap-1.5 justify-end">
                            <Calendar size={12} className="text-gold shrink-0" />
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
