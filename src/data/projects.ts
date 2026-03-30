import projectResq from "../assets/images/project-resq.png";
import projectTroviny from "../assets/images/project-troviny.png";
import projectKooora from "../assets/images/project-kooora.png";
import projectKonshta from "../assets/images/project-konshta.png";
import caseStudyBoardResq from "../assets/images/case-studies/resq-board.png";
import caseStudyBoardTroviny from "../assets/images/case-studies/troviny-board.jpg";
import caseStudyBoardKooora from "../assets/images/case-studies/kooora-board.png";
import caseStudyBoardKonshta from "../assets/images/case-studies/konshta-board.png";

export interface DesignProcessStep {
  title: string;
  description: string;
}

export interface Outcome {
  title: string;
  subtitle: string;
}

export interface Project {
  slug: string;
  title: string;
  caseStudyTitle: string;
  caseStudySubtitle: string;
  category: string;
  description: string;
  tags: string[];
  thumbnail: string;
  /** Full vertical case study board image (Figma / presentation export) */
  caseStudyBoard: string;
  role: string;
  duration: string;
  team?: string;
  overview: string;
  problem: string;
  research: string;
  designProcess: DesignProcessStep[];
  solution: string;
  outcomes: Outcome[];
  keyLearnings: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "resq",
    title: "Cars Emergency Rescue App",
    caseStudyTitle: "ResQ — Designing Trust When It Matters Most",
    caseStudySubtitle:
      "Transforming roadside assistance into a transparent, trackable experience built on trust and real-time visibility.",
    category: "Mobile App Design",
    description:
      "A complete case study of a emergency app focusing on simplicity and user trust.",
    tags: ["UX Research", "UI Design", "Mobile"],
    thumbnail: projectResq,
    caseStudyBoard: caseStudyBoardResq,
    role: "Lead UX/UI Designer",
    duration: "6 months",
    overview:
      "A car breakdown is never planned. It usually happens on a highway, in the middle of the night, or during a rush. In those stressful moments, the last thing someone needs is confusion. ResQ was born from that simple observation — the need for a service that feels as reliable and human as calling a friend.",
    problem:
      "In many cities across the region, roadside assistance is still a phone-call-based experience. Users often don't know who's coming, how long it will take, or how much it will cost until the job is done. There's a trust gap between the driver and the service — no visibility, no accountability, and no digital record.\n\nFor service providers, it's equally frustrating. Dispatching is manual, driver tracking is unreliable, and there's no efficient way to manage fleets or monitor response times.",
    research:
      "To understand the experience from both sides, we started with deep qualitative research. We conducted 15+ interviews with drivers who had experienced breakdowns, observed 5 real service dispatches, and surveyed 200+ users about their expectations and frustrations. We also interviewed towing company managers and independent service providers to understand their workflow challenges.",
    designProcess: [
      {
        title: "Understanding the Problem",
        description:
          "Conducted research with both drivers and service providers to uncover pain points and unmet needs.",
      },
      {
        title: "Shaping the Experience",
        description:
          "Mapped the emergency journey step by step, stripping out unnecessary friction points.",
      },
      {
        title: "Low-Fidelity Wireframes",
        description:
          "Created wireframes to validate the logic quickly and test user flows before visual design.",
      },
      {
        title: "Designing for Calm",
        description:
          "Developed a clean visual language with soft colors that reduce anxiety during emergencies.",
      },
      {
        title: "Interactive Prototyping",
        description:
          "Built prototypes to test emotional responses — not just usability, but how the app made people feel.",
      },
      {
        title: "Fleet Management Dashboard",
        description:
          "Designed a dashboard for service providers to manage fleets, track drivers, and monitor KPIs.",
      },
    ],
    solution:
      "ResQ transforms roadside assistance into a transparent, trackable, and human experience. Users can request help in under 30 seconds, see their provider's identity and live location, and get upfront pricing before confirming. For providers, the fleet dashboard streamlines dispatching, tracking, and operations management.",
    outcomes: [
      { title: "Transparent", subtitle: "Pricing & ETA" },
      { title: "Trusted", subtitle: "Provider Identity" },
      { title: "Efficient", subtitle: "Fleet Operations" },
    ],
    keyLearnings:
      "Designing for emergencies is not about adding features — it's about removing everything that adds stress. Every screen, every word, and every interaction was tested against one question: does this help someone in a moment of panic feel more in control?",
  },
  {
    slug: "troviny",
    title: "Travel Planning Platform",
    caseStudyTitle: "Troviny — Travel Planning Platform",
    caseStudySubtitle:
      "Redefining a better travel planning experience through intuitive design and collaborative features.",
    category: "Web App Design",
    description:
      "Comprehensive Platform and user experience for a better travel planning platform.",
    tags: ["UX/UI Design", "Web App", "User Research"],
    thumbnail: projectTroviny,
    caseStudyBoard: caseStudyBoardTroviny,
    role: "Lead UX/UI Designer",
    duration: "4 Months",
    team: "Front End, Back End Developers, QA Tester and UX/UI Designer",
    overview:
      "Troviny is a travel planning platform designed to simplify the overwhelming process of organizing trips. From discovering destinations to building detailed itineraries, the platform aims to make travel planning as enjoyable as the trip itself.",
    problem:
      "Travel planning often involves juggling multiple tools and tabs — booking sites, review platforms, maps, and spreadsheets. Users feel overwhelmed by information overload and struggle to create cohesive itineraries. Existing solutions either focus too narrowly on booking or lack the collaborative features modern travelers need.",
    research:
      "Through user interviews and competitive analysis, we identified that travelers want a single platform that combines inspiration, planning, and collaboration. Key insights showed that 73% of users abandon planning due to complexity, and 85% prefer visual itinerary builders over text-based ones.",
    designProcess: [
      {
        title: "User Research",
        description:
          "Conducted interviews and surveys with frequent travelers to understand their planning habits and frustrations.",
      },
      {
        title: "Information Architecture",
        description:
          "Designed the platform structure to support discovery, planning, and collaboration workflows.",
      },
      {
        title: "Wireframing",
        description:
          "Created low and high-fidelity wireframes to validate the core user flows.",
      },
      {
        title: "Visual Design",
        description:
          "Developed a fresh, inspiring visual language that evokes the excitement of travel.",
      },
      {
        title: "Prototyping & Testing",
        description:
          "Built interactive prototypes and conducted usability testing with target users.",
      },
      {
        title: "Iteration",
        description:
          "Refined designs based on testing feedback and stakeholder input.",
      },
    ],
    solution:
      "Troviny provides an all-in-one travel planning experience with visual itinerary builders, collaborative trip planning, destination discovery, and smart recommendations. The platform reduces planning time while making the process enjoyable.",
    outcomes: [
      { title: "Simplified", subtitle: "Trip Planning" },
      { title: "Collaborative", subtitle: "Group Features" },
      { title: "Visual", subtitle: "Itinerary Builder" },
    ],
    keyLearnings:
      "Balancing feature richness with simplicity was the key challenge. We learned that progressive disclosure — showing complexity only when needed — was essential for keeping the experience approachable.",
  },
  {
    slug: "kooora",
    title: "Sports News Website",
    caseStudyTitle: "KOOORA — Sports News Website Redesign",
    caseStudySubtitle:
      "Modernizing the leading football platform for Middle East and North Africa audiences.",
    category: "Website Redesign",
    description:
      "Increasing conversion rates through better checkout experience and personalization.",
    tags: ["Product Design", "UI Design", "Mobile"],
    thumbnail: projectKooora,
    caseStudyBoard: caseStudyBoardKooora,
    role: "Lead UX/UI Designer",
    duration: "3 months",
    overview:
      "KOOORA website is a leading destination for football news and live scores in the Middle East and North Africa region. With millions of monthly visitors, the platform needed a modern redesign to improve user experience, accessibility, and engagement across all devices.",
    problem:
      "1. The KOOORA website's old design suffered from a cluttered and outdated visual appearance that made navigation difficult.\n2. Content hierarchy was unclear, making it hard for users to find the information they were looking for.\n3. The responsive experience was poor, with significant usability issues on mobile devices.\n4. Accessibility standards were not met, excluding users with disabilities.",
    research:
      "It was clear that the website needed a fresh, modern design that prioritized user experience while maintaining the rich content that KOOORA is known for. Through competitive analysis and user feedback, we identified key areas for improvement.",
    designProcess: [
      {
        title: "Research & Analysis",
        description:
          "Conducted competitive analysis and user research to identify pain points and opportunities for improvement.",
      },
      {
        title: "Visual Design System",
        description:
          "Developed a modern, cohesive design system with improved typography and color palette.",
      },
      {
        title: "Content Restructuring",
        description:
          "Reorganized content layout to improve readability and information hierarchy.",
      },
      {
        title: "Accessibility Improvements",
        description:
          "Enhanced contrast ratios, font sizes, and interactive elements for better accessibility.",
      },
      {
        title: "Responsive Design",
        description:
          "Created responsive layouts optimized for desktop, tablet, and mobile experiences.",
      },
      {
        title: "User Testing",
        description:
          "Conducted usability tests and iterated based on user feedback to refine the experience.",
      },
    ],
    solution:
      "The redesigned KOOORA website features a modern, clean interface with improved content hierarchy, better navigation patterns, and a fully responsive layout. The new design system ensures consistency across all pages while meeting accessibility standards.",
    outcomes: [
      { title: "Modern", subtitle: "Visual Design" },
      { title: "Improved", subtitle: "User Experience" },
      { title: "Enhanced", subtitle: "Accessibility" },
    ],
    keyLearnings:
      "This redesign project highlighted the importance of balancing visual modernization with content-rich environments. Users need clear hierarchy and familiar patterns even when the visual language evolves.",
  },
  {
    slug: "konshta",
    title: "BreadStore e-commerce App",
    caseStudyTitle: "كونشتا — Bakery E-commerce Mobile App",
    caseStudySubtitle:
      "Connecting customers with bakery products across Libya through a seamless mobile ordering experience.",
    category: "Mobile App Design",
    description:
      "Connecting customers with bakery products across local markets through a seamless mobile experience.",
    tags: ["UX Research", "Dashboard", "SaaS"],
    thumbnail: projectKonshta,
    caseStudyBoard: caseStudyBoardKonshta,
    role: "Lead UX/UI Designer",
    duration: "2 months",
    team: "UX/UI Designer, 2 Full Stack Developers",
    overview:
      'The "كونشتا" application design project aimed to create a comprehensive e-commerce platform for a bakery business in Libya. The app connects customers with fresh bakery products, enabling easy browsing, ordering, and delivery tracking across multiple locations.',
    problem:
      "1. Customers find it inconvenient to visit local bakeries physically, especially for special orders.\n2. Bakeries lack a digital presence to reach wider audiences.\n3. No efficient system exists for managing orders, inventory, and deliveries across multiple locations.",
    research:
      "Through user research and stakeholder interviews, we discovered that customers value freshness guarantees, real-time availability, and flexible delivery options. Bakery owners needed inventory management tools and analytics to optimize their operations.",
    designProcess: [
      {
        title: "User Research",
        description:
          "Conducted interviews with customers, dealers, suppliers, and bakery owners to understand needs.",
      },
      {
        title: "Platform Architecture",
        description:
          "Designed the information architecture to support multi-vendor marketplace with delivery logistics.",
      },
      {
        title: "Wireframing & Prototyping",
        description:
          "Created low and high-fidelity wireframes to validate core flows and interactions.",
      },
      {
        title: "Visual Design",
        description:
          "Developed a clean, accessible design system that reflects the warmth of bakery culture.",
      },
      {
        title: "Payment Integration",
        description:
          "Designed secure payment flows and integrated trust signals for first-time buyers.",
      },
      {
        title: "Testing & Iteration",
        description:
          "Conducted usability testing with target users and iterated based on feedback.",
      },
    ],
    solution:
      "1. Developed an intuitive app enabling customers to browse, customize, and order bakery products with real-time availability.\n2. Built a vendor dashboard for bakery owners to manage products, orders, and deliveries.\n3. Integrated location-based delivery with transparent pricing and tracking.",
    outcomes: [
      { title: "Enhanced", subtitle: "Customer Experience" },
      { title: "Expanded", subtitle: "Market Reach" },
      { title: "Streamlined", subtitle: "Order Process" },
    ],
    keyLearnings:
      "This project demonstrated the importance of designing for both sides of a marketplace. Understanding the operational constraints of bakery owners was just as crucial as creating a delightful customer experience.",
  },
];
