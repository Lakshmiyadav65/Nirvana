import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ArrowLeft, MapPin, Minimize2, Calendar, FileCheck, CheckCircle2 } from 'lucide-react';
import { projectsData } from '../data/projects';
import Button from '../components/Button';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="pt-32 pb-20 text-center bg-white min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="font-display text-2xl font-bold mb-4">Project Not Found</h2>
        <p className="text-gray-500 mb-8">The project you are looking for does not exist or has been relocated.</p>
        <Button to="/projects" variant="outline">
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-20">
      
      {/* Back Navigation Bar */}
      <div className="bg-charcoal border-b border-gold/15 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center text-xs text-gray-400">
          <Link to="/projects" className="flex items-center gap-2 hover:text-white transition-colors duration-300">
            <ArrowLeft size={14} />
            <span className="font-display uppercase tracking-widest">Back to Projects</span>
          </Link>
          <span className="font-sans uppercase tracking-widest text-gold text-[10px]">
            {project.status === 'ongoing' ? 'Ongoing Construction' : 'Completed Delivery'}
          </span>
        </div>
      </div>

      {/* Image Gallery Swiper */}
      <section className="bg-charcoal-dark relative h-[50vh] sm:h-[60vh] md:h-[70vh]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="h-full w-full"
        >
          {project.images.map((img, index) => (
            <SwiperSlide key={index}>
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Title & Metadata Summary */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-2 block">
                {project.type}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-dark tracking-tight leading-none uppercase">
                {project.name}
              </h1>
            </div>

            {/* Quick Metadata Row */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 bg-[#fafafa] border border-gold/15 p-6 min-w-full lg:min-w-[450px]">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold block mb-1">Location</span>
                <span className="flex items-center gap-1.5 font-display text-xs text-charcoal-dark font-bold uppercase tracking-wider">
                  <MapPin size={12} className="text-gold shrink-0" />
                  {project.location.split(',')[0]}
                </span>
              </div>

              <div className="border-x border-gold/15 px-6 md:px-12">
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold block mb-1">Built-up Area</span>
                <span className="flex items-center gap-1.5 font-display text-xs text-charcoal-dark font-bold uppercase tracking-wider">
                  <Minimize2 size={12} className="text-gold shrink-0" />
                  {project.area}
                </span>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold block mb-1">Delivery</span>
                <span className="flex items-center gap-1.5 font-display text-xs text-charcoal-dark font-bold uppercase tracking-wider">
                  <Calendar size={12} className="text-gold shrink-0" />
                  {project.year}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Details and Specs Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Description */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-charcoal-dark border-b border-gold/15 pb-3 mb-6">
                Overview &amp; Architecture
              </h2>
              <p className="text-gray-600 leading-relaxed font-light text-base mb-6">
                {project.description}
              </p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-charcoal-dark mb-4">
                  Key Amenities &amp; Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-500 font-light">
                      <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Side Panel: Tech Specifications */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="bg-[#fafafa] border border-gold/15 p-8">
              <h3 className="font-display text-lg font-bold uppercase tracking-wider text-charcoal-dark border-b border-gold/15 pb-3 mb-6">
                Technical Specifications
              </h3>
              
              <ul className="space-y-4">
                {project.specs && project.specs.length > 0 ? (
                  project.specs.map((spec, i) => (
                    <li key={i} className="flex flex-col border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <span className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">
                        {spec.label}
                      </span>
                      <span className="text-xs text-gray-600 font-light leading-relaxed">
                        {spec.value}
                      </span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex flex-col border-b border-gray-100 pb-3">
                      <span className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">Structure</span>
                      <span className="text-xs text-gray-600 font-light leading-relaxed">R.C.C. Framed Structure conforming to BIS safety codes.</span>
                    </li>
                    <li className="flex flex-col border-b border-gray-100 pb-3">
                      <span className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">Masonry</span>
                      <span className="text-xs text-gray-600 font-light leading-relaxed">High durability red clay bricks or solid block cement works.</span>
                    </li>
                    <li className="flex flex-col pb-3">
                      <span className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">Compliance</span>
                      <span className="text-xs text-gray-600 font-light leading-relaxed">100% Vastu aligned layouts with approval coordinates.</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-charcoal text-white p-8 border border-gold/15 flex flex-col items-center text-center">
              <FileCheck size={36} className="text-gold mb-4" />
              <h4 className="font-display text-base font-bold uppercase tracking-wider mb-2">Interested in this project?</h4>
              <p className="text-gray-400 text-xs font-light mb-6">
                Get pricing sheets, floor plan files, and scheduled site visits direct from our sales representatives.
              </p>
              <Button to="/contact" variant="outline" className="w-full">
                Get Pricing details
              </Button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
export default ProjectDetails;
