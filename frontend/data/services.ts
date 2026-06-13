export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: 'Building2' | 'Home' | 'Briefcase' | 'Layers' | 'FileText' | 'Compass';
  features: string[];
  longDescription: string;
}

export const servicesData: Service[] = [
  {
    id: "residential-apartments",
    title: "Residential Apartments",
    description: "Developing modern high-rise and low-rise residential apartments with luxury finishes, premium amenities, and functional layouts.",
    iconName: "Building2",
    features: [
      "100% Vastu compliance layouts",
      "High-speed automated elevators",
      "Robust security & CCTV monitoring",
      "Dedicated power backup & water systems"
    ],
    longDescription: "Our residential apartments represent the pinnacle of comfortable urban living. Built in prime localities of Hyderabad and Khammam, each project prioritizes ventilation, premium materials, modern design aesthetics, and a family-friendly community environment."
  },
  {
    id: "independent-houses",
    title: "Independent Houses",
    description: "Crafting beautiful premium gated communities and independent luxury villas designed to offer private luxury.",
    iconName: "Home",
    features: [
      "Private landscape backyard/gardens",
      "Gated community security systems",
      "Premium flooring and customized styling",
      "Spacious layouts with double-height ceiling"
    ],
    longDescription: "For clients who seek a completely private dwelling with bespoke architecture, we build independent luxury villas. Our communities (like IMR Tulasi Vanam) incorporate asphalt roads, underground cabling, landscaping, and dedicated recreational areas."
  },
  {
    id: "commercial-spaces",
    title: "Commercial Spaces",
    description: "Constructing state-of-the-art office towers and retail showrooms that meet modern corporate and retail standards.",
    iconName: "Briefcase",
    features: [
      "Modern glazed facades (heat & sound insulated)",
      "High-speed elevators and central HVAC system",
      "Multi-level underground parking",
      "Robust fire fighting & mechanical systems"
    ],
    longDescription: "Nirvana's commercial spaces are designed for prominent visibility and supreme utility. Engineered using high-performance composite framing and double-glazed facades, we create workspaces that reflect modern professionalism and enterprise grandeur."
  },
  {
    id: "duplex-homes",
    title: "Duplex Homes",
    description: "Designing two-story architectural marvels offering a harmonious balance between shared family spaces and private quarters.",
    iconName: "Layers",
    features: [
      "Elegant custom internal staircases",
      "Bespoke modular kitchens",
      "Large master suites with private balconies",
      "Smart-home lighting controls integrated"
    ],
    longDescription: "Our duplex developments combine luxurious spacing with smart space utilization. We offer tailormade internal staircase designs, premium woodwork, double-height drawing rooms, and premium sanitary options to give families an unmatched premium lifestyle."
  },
  {
    id: "construction-planning",
    title: "Construction Planning",
    description: "Detailed pre-construction engineering, blue-print approvals, structural designing, and raw material optimization.",
    iconName: "FileText",
    features: [
      "Architectural planning & layout designs",
      "Structural engineering & safety checks",
      "Approval management from civic bodies",
      "Detailed project cost estimations"
    ],
    longDescription: "A successful build starts with detailed planning. Nirvana's in-house team of engineers and architects uses advanced CAD & building information software to layout plumbing, structural grids, electrical lines, and approvals to ensure zero-delay timelines."
  },
  {
    id: "real-estate-development",
    title: "Real Estate Development",
    description: "End-to-end development starting from prime land acquisition, joint venture structuring, and sustainable development.",
    iconName: "Compass",
    features: [
      "Prime land surveying & acquisitions",
      "Joint Venture (JV) portfolio structuring",
      "Sustainable green building initiatives",
      "Post-construction asset management"
    ],
    longDescription: "We take charge of the full development cycle. Our strict legal due diligence and focus on prime land values guarantee high returns for joint venture owners and homebuyers alike. We emphasize ethical business conduct and sustainable building practices."
  }
];
