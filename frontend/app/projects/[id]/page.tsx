'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ArrowLeft, MapPin, Minimize2, Calendar, CheckCircle2, CalendarCheck } from 'lucide-react';
import { projectsData } from '@/data/projects';
import Button from '@/components/Button';
import BookingWidget from '@/components/BookingWidget';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="pt-44 pb-28 text-center bg-charcoal-dark min-h-[60vh] flex flex-col justify-center items-center px-6">
        <h2 className="font-serif text-4xl text-cream mb-4">Project Not Found</h2>
        <p className="text-cream/55 mb-8 max-w-md">The project you are looking for does not exist or has been relocated.</p>
        <Button to="/projects" variant="outline">Back to Projects</Button>
      </div>
    );
  }

  return (
    <div className="bg-charcoal-dark">

      {/* Back link */}
      <section className="pt-28 md:pt-32 pb-2">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <Link href="/projects" className="group inline-flex items-center gap-2 text-cream/60 hover:text-gold transition-colors text-sm font-display">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold font-display">
            {project.status === 'ongoing' ? 'Ongoing Construction' : 'Completed Delivery'}
          </span>
        </div>
      </section>

      {/* Title */}
      <section className="pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <span className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold font-display mb-3 block">
            {project.type}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream leading-[1.04] max-w-4xl">
            {project.name}
          </h1>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="rounded-[2.5rem] overflow-hidden h-[52vh] md:h-[64vh] bg-charcoal-dark">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              className="h-full w-full"
            >
              {project.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Quick metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Location', value: project.location.split(',')[0], icon: <MapPin size={15} className="text-gold" /> },
              { label: 'Built-up Area', value: project.area, icon: <Minimize2 size={15} className="text-gold" /> },
              { label: 'Delivery', value: project.year, icon: <Calendar size={15} className="text-gold" /> },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl bg-sand/50 border border-gold/5 px-6 py-5">
                <span className="text-[10px] uppercase tracking-[0.18em] text-cream/45 font-semibold block mb-1.5">{m.label}</span>
                <span className="flex items-center gap-2 font-serif text-lg text-cream">{m.icon}{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details + Specs */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14">

          <div className="lg:col-span-7 flex flex-col space-y-10">
            <div>
              <h2 className="font-serif text-3xl text-cream mb-5">Overview &amp; Architecture</h2>
              <p className="text-cream/65 leading-relaxed font-light text-lg">{project.description}</p>
            </div>

            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="font-serif text-2xl text-cream mb-5">Key Amenities &amp; Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-2.5 text-[14px] text-cream/60 font-light">
                      <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="rounded-[1.75rem] bg-sand/50 border border-gold/5 p-8">
              <h3 className="font-serif text-2xl text-cream border-b border-gold/10 pb-4 mb-5">Technical Specifications</h3>
              <ul className="space-y-4">
                {project.specs && project.specs.length > 0 ? (
                  project.specs.map((spec, i) => (
                    <li key={i} className="flex flex-col border-b border-gold/8 pb-3 last:border-0 last:pb-0">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-gold font-semibold mb-1">{spec.label}</span>
                      <span className="text-[13px] text-cream/60 font-light leading-relaxed">{spec.value}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex flex-col border-b border-gold/8 pb-3">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-gold font-semibold mb-1">Structure</span>
                      <span className="text-[13px] text-cream/60 font-light leading-relaxed">R.C.C. Framed Structure conforming to BIS safety codes.</span>
                    </li>
                    <li className="flex flex-col border-b border-gold/8 pb-3">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-gold font-semibold mb-1">Masonry</span>
                      <span className="text-[13px] text-cream/60 font-light leading-relaxed">High durability red clay bricks or solid block cement works.</span>
                    </li>
                    <li className="flex flex-col pb-3">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-gold font-semibold mb-1">Compliance</span>
                      <span className="text-[13px] text-cream/60 font-light leading-relaxed">100% Vastu aligned layouts with approval coordinates.</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="rounded-[1.75rem] bg-charcoal text-cream p-8 flex flex-col items-center text-center">
              <h4 className="font-serif text-xl mb-2">Interested in this project?</h4>
              <p className="text-cream/60 text-[13px] font-light mb-6">
                Get pricing sheets, floor plan files, and scheduled site visits direct from our sales representatives.
              </p>
              <div className="flex flex-col w-full gap-3">
                <Button to="/contact" variant="light" className="w-full">Get Pricing details</Button>
                <a
                  href="#book"
                  className="inline-flex items-center justify-center gap-2 w-full font-display font-medium tracking-wide text-[13px] px-6 py-3.5 rounded-full border border-cream/25 text-cream hover:bg-charcoal-dark hover:text-cream transition-colors duration-300"
                >
                  <CalendarCheck size={15} /> Book a Site Visit
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <BookingWidget planId={project.id} planName={project.name} />

    </div>
  );
}
