export interface Testimonial {
  id: string;
  name: string;
  role: string;
  project: string;
  comment: string;
  rating: number;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "t1",
    name: "K. Raghunath",
    role: "Senior Director, IT Firm",
    project: "Nirvana’s Sirisurya Nivas",
    comment: "Buying an apartment from Nirvana Builders has been a seamless experience. Their compliance with Vastu, transparent communication, and top-tier build quality are truly commendable. Sirisurya Nivas exceeded all our expectations.",
    rating: 5
  },
  {
    id: "t2",
    name: "Dr. Srinivas Rao",
    role: "Consultant Cardiologist",
    project: "Nirvana’s IMR Tulasi Vanam",
    comment: "The quality of concrete, wood, and fittings inside our villa at IMR Tulasi Vanam is outstanding. The team stuck to their completion dates despite macro bottlenecks. Truly professional and reliable builders.",
    rating: 5
  },
  {
    id: "t3",
    name: "Archana Reddy",
    role: "Entrepreneur",
    project: "Nirvana’s Manohara",
    comment: "Nirvana's ethical approach to joint ventures and development is unique. They handled legal documentations, civic approvals, and construction with complete honesty. Highly recommend them for premium home construction.",
    rating: 5
  },
  {
    id: "t4",
    name: "M. Surendra Mohan",
    role: "Retired Government Official",
    project: "Nirvana’s Dwarakamai",
    comment: "Punctuality and respect are the key elements I found with Nirvana Developers. The finishing is excellent, and their post-sale support team is always helpful and quick to respond.",
    rating: 5
  }
];
