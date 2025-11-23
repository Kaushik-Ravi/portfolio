import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, ExternalLink, FileText, X as CloseIcon, ChevronsLeftRight, CheckCircle, Menu, ChevronDown } from 'lucide-react';

// --- DATA STRUCTURES & CONTENT ---

interface ProjectMedia {
  type: 'video' | 'image' | 'image-pair';
  src: string | [string, string];
  alt: string | [string, string];
}

interface Capability {
  title: string;
  description: string;
}

interface ProjectSection {
  title: string;
  question: string;
  answer: string;
  capabilities?: Capability[];
  media?: ProjectMedia;
  roadAhead?: string;
}

interface Project {
  id: string;
  title: string;
  intro: string;
  sections: ProjectSection[];
}

interface Publication {
  citation: string;
  link: string;
  status: string;
  summary: string;
}

interface CivicProject {
  title: string;
  role: string;
  narrative: string;
  outcomes: string[];
  image: string;
}

interface Accolade {
  year: string;
  title: string;
  institution: string;
  description: string;
}

interface LeadershipRole {
  logo: string;
  role: string;
  organization: string;
  description: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'sensepath',
    title: 'SensePath: The Nervous System for Our Roads',
    intro: "What if our roads could speak? I architected SensePath, a platform that transforms any vehicle into an intelligent road sensor, creating a living, learning, and self-improving map of our physical infrastructure. It's a system that doesn't just show the path; it communicates the feeling of the path.",
    sections: [
      {
        title: 'From Chaos to Clarity',
        question: "How do you transform the chaotic, noisy data from a tumbling smartphone into a stable, objective measure of the road?",
        answer: "The solution begins with first-principles physics. The SensePath intelligence engine computationally establishes a stable, vehicle-centric frame of reference for every single data point, making the entire system immune to the phone's orientation.",
        capabilities: [
          { title: "Gravity as the Anchor", description: "A low-pass Butterworth filter isolates the constant vector of gravity from raw accelerometer data, providing a true vertical anchor for all calculations." },
          { title: "Dynamic Frame of Reference", description: "Real-time vector projections establish a stable `Vertical`, `Forward`, and `Lateral` axis locked to the vehicle, not the phone." },
          { title: "Orientation-Invariant Analysis", description: "Ensures every pothole and undulation is measured with scientific objectivity, whether the phone is mounted, in a pocket, or on a seat." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/uAtk-3Ku_30', alt: 'Placeholder for Physics Engine GIF' }
      },
      {
        title: 'A Universal Translator',
        question: "How can a system tell the difference between a phone \"screaming\" with vibrations in a handlebar mount and one \"muttering\" in a cushioned pocket?",
        answer: "This is where raw physics fails and true intelligence begins. The system uses dynamic Calibration Profiles: an \"AI hearing aid\" that learns the unique sonic signature of each context and computationally normalizes it.",
        capabilities: [
          { title: "Intelligent Normalization", description: "Applies learned scaling factors to raw sensor signals, effectively transforming the \"scream\" of a holder so it sounds just like the \"mutter\" of a pocket." },
          { title: "Universal Detection Logic", description: "Allows a single, universal set of event-detection algorithms to work with high fidelity across all vehicle types and phone placements." },
          { title: "Kinematic State Profiling", description: "Distinguishes between road-induced events and driver actions like braking by identifying the vehicle's kinematic state, eliminating a major class of false positives." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/MFs-Nsxpbh8', alt: 'Placeholder for Context Engine GIF' }
      },
      {
        title: 'The Learning Loop',
        question: "How does a system learn to trust one context over another and continuously improve its own accuracy with every single drive?",
        answer: "The engine learns directly from its most trusted source: the user. A two-pillar, community-driven feedback system creates a virtuous cycle where every piece of user input makes the entire platform smarter.",
        capabilities: [
          { title: "Golden Set Calibration", description: "Prompts users to identify the most accurate of two overlapping drives, triggering a high-precision spatial match in the backend to automatically generate or refine a Calibration Profile." },
          { title: "Guided AI Correction", description: "Empowers users to correct the AI by drawing precise polygons on the map and providing granular feedback, which is used to fine-tune the system's long-term learning models." },
          { title: "Relational Memory", description: "A dedicated `calibration_pairs` table ensures the system never asks the same question twice, creating an intelligent and respectful user experience." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/4jGpN9t1L3g', alt: 'Placeholder for Learning Loop GIF' }
      },
      {
        title: 'The Command Center',
        question: "How do you manage this immense computational load, processing millions of data points per drive, without sacrificing the user experience?",
        answer: "The platform was architected from the ground up as a fully asynchronous, self-contained system. The front-end user experience is now completely decoupled from the back-end intelligence engine, creating a seamless and instantaneous interface.",
        capabilities: [
          { title: "Instantaneous Uploads", description: "The API queues tasks in the database and returns an immediate success response, allowing users to continue working without waiting for processing to complete." },
          { title: "Live Status Monitoring", description: "The UI automatically polls a status endpoint, providing clear \"Processing...\" and \"Recalibrating...\" feedback and refreshing data the moment a task is finished." },
          { title: "Autonomous Background Worker", description: "An integrated worker thread continuously processes tasks from the database queue, creating a robust, scalable, and fully autonomous learning system." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/m-EUFk3oWNg', alt: 'Placeholder for Architecture GIF' }
      }
    ]
  },
  {
    id: 'pune-dashboard',
    title: 'Pune Urban Tree Intelligence',
    intro: 'The blueprint for a climate-resilient city. A revolutionary platform that transforms millions of data points into a clear, compelling vision for a cooler, greener, more resilient Pune.',
    sections: [
      {
        title: 'The Living Atlas',
        question: "How can we grasp the true scale and impact of our urban canopy, moving from anecdotal feelings to city-wide intelligence?",
        answer: "I created the Living Atlas, a dynamic, queryable map of every single tree in the city. It transforms an invisible, city-scale ecosystem into a tangible, measurable asset. For the first time, you can see the entire urban forest at a glance, allowing you to explore its vastness and then zoom in to understand the unique ecological signature of your own neighborhood.",
        capabilities: [
          { title: "A City-Wide Canvas", description: "Instantly visualize the precise location of all 1.79 million trees, painting a complete picture of your urban forest for the first time." },
          { title: "Quantified Impact", description: "Grasp the collective power of your canopy with at-a-glance metrics, revealing over 288,000 tons of sequestered CO₂." },
          { title: "Targeted Greening", description: "Seamlessly compare neighborhoods to identify green havens and pinpoint areas that need urgent climate intervention." },
          { title: "Hyperlocal Intelligence", description: "Draw any area on the map to generate a custom ecological report in seconds, putting granular data at your fingertips." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/ZlaIi-ZjuwM', alt: 'Demonstration of the Living Atlas feature.' }
      },
      {
        title: 'The Digital Arborist',
        question: "Beyond a simple dot on a map, what is the unique identity and contribution of each tree in our community?",
        answer: "The Digital Arborist gives every tree a voice. With a single click, you can access a rich, detailed profile for any tree in the city, revealing its species, its precise physical dimensions, and its specific environmental impact. It’s like having an expert arborist in your pocket.",
        capabilities: [
          { title: "Rich Botanical Identity", description: "Go beyond a name. Access a tree's full story, from its species to its economic importance and flowering season." },
          { title: "Precision Biometrics", description: "Instantly view true-to-life dimensions for height, trunk girth, and canopy diameter, all calculated for you." },
          { title: "Individual Impact", description: "Understand the direct contribution of every single tree with its calculated lifetime CO₂ sequestration." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/prvN50H2eQE', alt: 'Demonstration of the Digital Arborist feature.' }
      },
      {
        title: 'The FutureScape Simulator',
        question: "How can we move from simply observing our environment to actively and intelligently shaping its future for climate resilience?",
        answer: "This is where data becomes action. The FutureScape Simulator is a powerful, prescriptive engine that I built to allow anyone, from a city planner to a community group, to design and simulate the real-world impact of a new greening project. Draw an area, select the perfect species, and instantly see the cooler, more beautiful future you can build.",
        capabilities: [
          { title: "Strategic Site Selection", description: "Identify urban heat islands and barren land with integrated satellite and temperature overlays, ensuring you plant where it matters most." },
          { title: "Data-Driven Recommendations", description: "Receive a curated list of top-performing tree species, ranked by their scientifically-calculated cooling potential of up to 13.9°C." },
          { title: "Predictive Impact Analysis", description: "See the future. Instantly forecast the change in surface temperature and quantify the cooling benefit of your design before breaking ground." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/nIfCS2JaBXA', alt: 'Demonstration of the FutureScape Simulator feature.' }
      },
      {
        title: 'The Canopy View',
        question: "How can we truly appreciate the physical presence and spatial impact of our trees beyond the flatness of a traditional map?",
        answer: "The Canopy View brings the city's data to life. I moved beyond 2D points to render a fully three-dimensional model of the urban forest, where each tree is represented with its true-to-data height and canopy size. This isn't just a visualization; it's a new way to feel the scale, density, and protective embrace of your city's green infrastructure.",
        capabilities: [
          { title: "Immersive 3D Exploration", description: "Fly through a stunning, city-scale 3D model of all 1.79 million trees and the surrounding built environment." },
          { title: "Intuitive Spatial Awareness", description: "Gain a visceral understanding of canopy density and the relationship between your green and gray infrastructure." },
          { title: "Visionary Simulation", description: "Preview your greening projects rendered in 3D, providing a realistic and inspiring vision of a cooler, greener tomorrow." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/XQDsfFfoH2U', alt: 'Demonstration of the 3D Canopy View feature.' }
      },
      {
        title: 'The Streetscape Vision',
        question: "What does this transformation actually look and feel like for a citizen walking down their own street?",
        answer: "This is the ultimate goal: to make the future tangible, personal, and real. I am now pioneering a way to move beyond maps and models into photorealistic simulation. By leveraging real-world street-level imagery, my platform will soon allow you to see your own neighborhood transform before your eyes.",
        media: {
          type: 'image-pair',
          src: ['/images/product1-street-simulate.png', '/images/product1-street.jpeg'],
          alt: ['The same street after being transformed with a lush tree canopy in the simulation.', 'A barren street before the greening simulation.']
        }
      }
    ]
  },
  {
    id: 'treefolio',
    title: 'TreeFolio',
    intro: "The digital lens for our urban forests. A revolutionary platform that places the power of a complete ecological survey into the palm of your hand, fusing advanced AI and photogrammetry to create the most accessible dendrometry tool ever built.",
    sections: [
      {
        title: 'The Digital Arborist',
        question: "What if we could measure the physical world with the same ease we capture a picture?",
        answer: "The Digital Arborist is where your photograph becomes a scientific tool. By pairing a single image with its distance from the subject, my engine uses advanced photogrammetry and AI to prepare the scene for a complete dimensional analysis. A single click on the tree trunk is all it takes.",
        capabilities: [
          { title: "Photo as Instrument", description: "Simply upload a photo and input its distance. My engine uses EXIF data and photogrammetry to prepare the scene for analysis." },
          { title: "One-Click Segmentation", description: "Powered by Meta's Segment Anything Model (SAM), a single tap isolates the tree from its background, instantly." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/KbK1R8zvUDY', alt: 'Demonstration of capturing a tree with the Digital Arborist.' }
      },
      {
        title: 'The Blueprint',
        question: "How can we trust an automated measurement in the messy, unpredictable real world?",
        answer: "The Blueprint provides a complete, high-fidelity dimensional profile of the tree. I don't just give you numbers; I give you a visual confirmation overlaid on your original image. For complex environments, my proprietary 'Elite Adaptive' workflow empowers you to refine the AI's work or take full manual control.",
        capabilities: [
          { title: "Instantaneous Calculation", description: "Generate precise measurements for Height, Canopy Diameter, and DBH in a fraction of a second." },
          { title: "Interactive Verification", description: "Immediately see the segmented tree mask overlaid on your image, so you can trust the data you capture." },
          { title: "Elite Adaptive Workflow", description: "For complex urban environments, seamlessly refine the AI's work or take full manual control to ensure scientific accuracy." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/G7o9kZIsQ38', alt: 'Demonstration of the Blueprint measurement results.' }
      },
      {
        title: 'The Carbon Ledger',
        question: "A tree is more than its dimensions; how do we quantify its vital role in our ecosystem?",
        answer: "The Carbon Ledger transforms physical measurements into profound ecological insight. By identifying the tree's species from a simple close-up, I unlock its unique biological properties. I cross-reference this data with the Global Wood Density Database and apply proven allometric equations to calculate the total carbon dioxide it has sequestered.",
        capabilities: [
          { title: "AI-Powered Species ID", description: "Identify a tree's species from a single photo of its leaf, bark, or flower with remarkable accuracy." },
          { title: "Global Scientific Database", description: "Seamlessly cross-reference data with the Global Wood Density Database to unlock biological properties." },
          { title: "Automated CO₂ Calculation", description: "Instantly transform physical dimensions into the ultimate metric: total kilograms of sequestered CO₂." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/yiR0VWKoGSU', alt: 'Demonstration of the species identification and carbon calculation.' }
      },
      {
        title: 'The Digital Dossier',
        question: "How do we transform a single measurement into a rich, permanent record that's ready for analysis?",
        answer: "The Digital Dossier is the final, crucial step where data becomes a comprehensive asset. Here, you enrich the quantitative metrics with qualitative, on-the-ground observations. With a single click, this complete dossier is saved to your expedition log, a live and interactive table where individual records become a powerful, hyperlocal dataset.",
        capabilities: [
          { title: "Enriched Data Capture", description: "Add crucial qualitative context with structured inputs for tree condition and ownership." },
          { title: "Persistent Session History", description: "Commit every record to your expedition log with one click, creating a powerful hyperlocal dataset as you work." },
          { title: "Effortless Export", description: "Instantly export your entire session log as a CSV for universal compatibility and deeper analysis." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/Hc_Qoo95gsw', alt: 'Demonstration of the session log and data export.' }
      }
    ]
  },
  {
    id: 'eco-path-navigator',
    title: 'The Pune Eco-Path Navigator',
    intro: "What if our technology could bridge the divide between digital efficiency and environmental connection? Leveraging a census of over 1.7 million trees, I engineered an experience that transforms navigation into an opportunity for well-being.",
    sections: [
      {
        title: "The Intelligent Co-Pilot",
        question: "What if your GPS understood that the best route isn't always the shortest, but the one that benefits both you and your city?",
        answer: "I reimagined urban navigation from first principles. The Intelligent Co-Pilot moves beyond speed to consider a holistic set of variables that define a truly 'good' journey. By fusing real-time traffic data with my proprietary Environmental Quality Score, the system presents routes that balance efficiency and environmental consciousness.",
        capabilities: [
          { title: "Balanced Eco-Routing", description: "Go beyond 'fastest'. Choose the best path based on a perfect balance of speed, emissions, and exposure to urban greenery." },
          { title: "Environmental Quality Score", description: "Every route is graded with my comprehensive EQS, derived from the city's vast ecological data." },
          { title: "Actionable Impact Metrics", description: "Make informed decisions with a clear breakdown of estimated CO₂ emissions for every potential route." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/Vr_hnoFp4uo', alt: 'Demonstration of the Intelligent Co-Pilot for driving routes.' }
      },
      {
        title: "The Route Report Card",
        question: "How can you trust that one route is truly 'better' than another?",
        answer: "Transparency is at the heart of my design. The Route Report Card is a detailed, analytical breakdown that reveals the precise methodology used to score your route. It demystifies the algorithm, transforming abstract data into a clear story of costs and benefits, giving you the full context to understand the trade-offs.",
        capabilities: [
          { title: "Holistic Score Analysis", description: "Instantly deconstruct a route's score into its core components: costs like time and emissions, and benefits like environmental quality." },
          { title: "Granular Green Breakdown", description: "See the specific green assets along your path, including canopy cover, CO₂ absorption potential, and biodiversity levels." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/G24MWMQOick', alt: 'Demonstration of the detailed Route Report Card.' }
      },
      {
        title: "The Serenity Engine",
        question: "How can we find a moment of peace in a bustling city, especially when we only have a few minutes to spare?",
        answer: "My Serenity Engine intelligently generates a personalized, closed-loop route designed for walking, jogging, or cycling, tailored to your desired duration. It analyzes the surrounding area to craft a path that maximizes your exposure to nature and tranquility. It’s a curated escape, designed by data, that starts and ends right at your doorstep.",
        capabilities: [
          { title: "Intelligent Loop Generation", description: "Create a perfect, circular path from any starting point, ensuring you always end up where you began." },
          { title: "Time-Based Pathfinding", description: "Simply set a duration—from a 5-minute breather to a 60-minute journey—and the engine builds a route to match." },
          { title: "Serenity Score Optimization", description: "Every path is evaluated against my custom Serenity Score, guaranteeing the most pleasant and restorative route available." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/DgXoHO13kyU', alt: 'Demonstration of generating a serenity route.' }
      },
      {
        title: "The Living Guide",
        question: "Can a digital experience connect us more deeply to the physical world, instead of distracting us from it?",
        answer: "This is where data transforms into a personal, narrative experience. My real-time AI pipeline analyzes your route, selects significant trees, and generates a unique, guided meditation script. As you walk, it uses the very trees you pass as anchors for mindfulness, sharing their ecological and cultural stories. This is a meditation written by AI, narrated by your environment.",
        capabilities: [
          { title: "Real-Time AI Scripting", description: "Utilizing Google's Gemini API, the system generates a complete, themed meditation script for your walk in seconds." },
          { title: "Proximity-Based Audio", description: "A custom audio orchestrator uses your GPS to trigger narrative segments as you approach specific trees for a seamless, context-aware experience." },
          { title: "Deep Environmental Context", description: "Turn a simple walk into a journey of discovery by learning the unique stories and significance of the trees on your path." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/zwn3infLCT8', alt: 'Demonstration of the guided meditation experience.' }
      }
    ]
  },
  {
    id: 'berlin-case-study',
    title: 'Urban Tree Intelligence: A Berlin Case Study',
    intro: "A data-driven methodology to quantify and communicate the tangible environmental benefits of an urban forest, developed as a DAAD Scholar at the Technical University of Berlin.",
    sections: [
      {
        title: 'Quantifying the Urban Lungs',
        question: "Beyond aesthetics, what is the direct contribution of the urban forest to the air we breathe?",
        answer: "I applied scientific allometric equations to the city's 885,825-tree census to calculate the biomass and subsequent annual oxygen yield for the entire urban forest. The model then allows for this data to be analyzed at a hyperlocal level, such as along a specific commute.",
        capabilities: [
          { title: "Route-Specific Census", description: "The system identifies and counts every tree within a buffer of a given path." },
          { title: "Tangible Oxygen Yield", description: "For a 12km commute, the visualization quantifies the impact of 1,738 trees producing ~1,336 kg of O₂ annually." },
          { title: "An Ecological Journey", description: "This transforms a routine commute into a powerful demonstration of the urban forest's life-sustaining role." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/jxFk7FYSTbk', alt: 'A GIF showing the geospatial data processing and analysis in QGIS.' }
      },
      {
        title: 'Mapping the Urban Oasis Effect',
        question: "How can we prove and visualize the cooling power of trees in a dense urban environment?",
        answer: "By correlating tree density with high-resolution temperature data from Germany's National Meteorological Service, my analysis revealed a direct, measurable relationship between green infrastructure and the mitigation of the Urban Heat Island effect.",
        capabilities: [
          { title: "Data-Driven Cooling", description: "The analysis proved that high-density tree areas are up to 1.48°C cooler than their treeless counterparts." },
          { title: "Hyperlocal Temperature Analysis", description: "The visualization demonstrates this principle in action, showing a real-time temperature decrease of 0.846°C as the user passes through a medium-density grove." },
          { title: "A Blueprint for Climate Adaptation", description: "This methodology provides a powerful tool for urban planners to identify and prioritize areas for greening interventions." }
        ],
        media: { type: 'video', src: 'https://www.youtube.com/embed/kbExmZkOcq8', alt: 'A GIF demonstrating the interactive commute visualization, showing real-time data updates.' }
      }
    ]
  }
];

const PUBLICATIONS_DATA: Publication[] = [
  {
    citation: "Ravi, K., & Brück, A. (2025). Citizen Centered Climate Intelligence: Operationalizing Open Tree Data for Urban Cooling and Eco-Routing in Indian Cities. In HackYourDistrict (Forthcoming Book Chapter, In Review).",
    link: "https://doi.org/10.48550/arXiv.2508.17648",
    status: "Under Review",
    summary: "As the primary author, I developed a citizen-centric framework that transforms open tree data into actionable climate intelligence for Indian cities using a three-part system for measurement, analysis, and eco-routing. This work presents a replicable model for citizen-driven urban intelligence to create climate-resilient, co-produced, and radically local practice."
  },
  {
    citation: "Ravi, K., & Brück, A. (2024). Urban Tree Density and Its Impact on Temperature and Oxygen Production: A Case Study of Berlin. Technische Universität Berlin.",
    link: "https://www.tu.berlin/en/isr/klab/news-details/labor-k-x-national-institute-of-technology-tiruchirappalli-indien",
    status: "Published",
    summary: "As the primary author, I investigated the impact of urban tree density on temperature and oxygen levels in Berlin using open-source data. This study quantifies the ecological benefits of urban trees and presents the findings interactively to improve public engagement in urban environmental management."
  }
];

const CIVIC_PROJECTS_DATA: CivicProject[] = [
  {
    title: "Automated Water Diversion & Conservation",
    role: "Lead Designer & Community Advocate",
    narrative: "Motivated by a direct observation of water wastage, I designed and built a low-cost, automated water overflow controller using an Arduino and distance sensors. The project evolved from a breadboard prototype to a soldered, weatherproof system designed for reliable, long-term deployment. This technical solution was coupled with a community awareness campaign to promote water conservation.",
    outcomes: [
      "Engineered a system that saves 3,000 liters of water per household per month.",
      "Quantified the saved resource as sufficient to supply 5 additional homes per day in a water-scarce region.",
      "Overcame a personal speech disorder (Puberphonia) through the process of advocating for this solution with family, neighbors, and community members, reinforcing my commitment to impactful work."
    ],
    image: "/images/water.webp"
  },
  {
    title: "Data-Driven Restoration of Bathalapalli Lake",
    role: "Lead Investigator & Civic Advocate",
    narrative: "I initiated an independent investigation to address the systemic degradation of a local lake. Using Google Earth Pro, I identified a long-term reduction in the lake's perimeter due to pollution and encroachment. I systematically documented the sources—vandalism from a nearby wine shop and illegal sewer connections—and engaged with local panchayat members and persistently advocated to the Sub-Collector of Hosur.",
    outcomes: [
      "Successfully advocated for the official relocation of the polluting wine shop.",
      "Secured the repair of broken sewer pipes, preventing further contamination.",
      "Catalyzed corporate CSR contributions to build a protective wall around the lake.",
      "Contributed to ecological restoration, evidenced by residents reporting the return of indigenous birds."
    ],
    image: "/images/lake.webp"
  },
  {
    title: "Community-Led Urban Forest Mapping",
    role: "Mentor & Technical Lead",
    narrative: "To address the critical data gap in hyperlocal urban ecology, I developed and led a program to equip community members and students with the tools of civic technology. I designed a replicable workflow for mapping trees using a smartphone, identifying \"Green Hotspots\" for planting with satellite imagery, and integrating the data into a public Samaaj Data Map.",
    outcomes: [
      "Mapped over 245 trees in under 3 hours, demonstrating a highly efficient, scalable methodology.",
      "Directly influenced a 4% increase in local green cover through targeted community planting efforts.",
      "Established a sustainable community practice, with residents committing to planting 3 new trees at each of their monthly meetings."
    ],
    image: "/images/tree mapping.webp"
  }
];

const ACCOLADES_DATA: Accolade[] = [
  {
    year: "2025",
    title: "Millennium Fellowship & Campus Director",
    institution: "UN Academic Impact & MCN",
    description: "Selected as one of 4,000 fellows from a global pool of over 52,000 applicants for a leadership program advancing UN SDGs; appointed to lead the campus cohort."
  },
  {
    year: "2024",
    title: "DAAD WISE Scholarship",
    institution: "German Academic Exchange Service",
    description: "A highly competitive national scholarship funding a research internship at a top German technical university, awarded to 150 scholars from several thousand applicants."
  },
  {
    year: "2022",
    title: "Avery Dennison InvEnt Scholarship",
    institution: "Avery Dennison Foundation",
    description: "A national-level award for innovation in combating climate change; one of 10 scholars selected from over 500 applicants across five premier national institutes in India."
  },
  {
    year: "2023-2025",
    title: "Academic Excellence Awards",
    institution: "National Institute of Technology, Tiruchirappalli",
    description: "Awarded the Ranga Class of 1974 Award (2025) and the Seetharaman Narayanan 1984 Trust Scholarship (2023 & 2024) for consistent and outstanding academic performance."
  }
];

const LEADERSHIP_ROLES_DATA: LeadershipRole[] = [
  {
    logo: "/images/World_Bank-modified.png",
    role: "Youth Advisor, Climate Thematic Group",
    organization: "The World Bank (Solutions for Youth Employment)",
    description: "As one of 140 members of the global Youth Advisory Group, I provide a youth-centric perspective on global climate policies and co-create strategies for impactful, youth-led climate engagement."
  },
  {
    logo: "/images/Reap_Benefit-modified.png",
    role: "Youth Board Member",
    organization: "Reap Benefit",
    description: "I serve as a voting member on the strategic youth board for a leading national civic-tech NGO, contributing to long-term governance and influencing the roadmap for product development and analytics."
  },
  {
    logo: "/images/MCN.png",
    role: "Campus Director & Fellow",
    organization: "Millennium Fellowship (UN Academic Impact & MCN)",
    description: "Selected from a global pool of 52,000+ applicants to lead and mentor the campus cohort at NIT Trichy in advancing UN SDGs."
  }
];

// --- IMAGE COMPARISON SLIDER COMPONENT ---

const ImageComparisonSlider = ({ before, after, beforeAlt, afterAlt }: { before: string; after: string; beforeAlt: string; afterAlt: string; }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, [isDragging]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);

  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    const upHandler = () => setIsDragging(false);
    window.addEventListener('mouseup', upHandler);
    window.addEventListener('touchend', upHandler);
    return () => {
      window.removeEventListener('mouseup', upHandler);
      window.removeEventListener('touchend', upHandler);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="comparison-slider"
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <img src={before} alt={beforeAlt} className="comparison-image" />
      <div className="comparison-after-wrapper" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <img src={after} alt={afterAlt} className="comparison-image" />
      </div>
      <div className="comparison-handle" style={{ left: `${sliderPosition}%` }}>
        <div className="comparison-handle-line"></div>
        <div className="comparison-handle-icon">
          <ChevronsLeftRight size={24} />
        </div>
        <div className="comparison-handle-line"></div>
      </div>
    </div>
  );
};


// --- MODAL COMPONENT ---

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const modalClasses = `fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`;

  return (
    <div className={modalClasses} onClick={handleClose}>
      <div
        className="modal-scrollbar absolute inset-0 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="fixed top-4 right-4 z-50 text-slate-400 hover:text-white transition-colors"
          aria-label="Close project details"
        >
          <CloseIcon size={32} />
        </button>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <header className="flex flex-col justify-center text-center pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-serif text-slate-100 font-medium mb-6">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {project.intro}
            </p>
          </header>

          {project.sections.map((section, index) => (
            <section key={index} className="keynote-section">
              <h2 className="keynote-title">{section.title}</h2>
              <h3 className="keynote-subtitle">{section.question}</h3>
              <p className="keynote-body">{section.answer}</p>

              <div className="mt-12 lg:mt-16 w-full">
                {section.capabilities && section.media ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center text-left">
                    <div className={`space-y-6 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                      {section.capabilities.map((cap, capIndex) => (
                        <div key={capIndex}>
                          <h4 className="font-semibold text-lg text-slate-100">{cap.title}</h4>
                          <p className="text-slate-400 mt-1">{cap.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                      {section.media.type === 'video' && typeof section.media.src === 'string' && (
                        section.media.src.includes('youtube.com') ? (
                          <div className="responsive-video-wrapper keynote-media-wrapper">
                            <iframe src={section.media.src} title={section.media.alt as string} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                          </div>
                        ) : (
                          <div className="keynote-media-wrapper">
                            <img src={section.media.src} alt={section.media.alt as string} className="w-full h-full object-contain" />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  section.media && (
                    <>
                      {section.media.type === 'image-pair' && Array.isArray(section.media.src) && (
                        <ImageComparisonSlider before={section.media.src[0]} after={section.media.src[1]} beforeAlt={section.media.alt[0]} afterAlt={section.media.alt[1]} />
                      )}
                    </>
                  )
                )}
              </div>
            </section>
          ))}

        </div>
      </div>
    </div>
  );
};

const CivicProjectModal = ({ project, onClose }: { project: CivicProject | null; onClose: () => void; }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!project) return;
    setIsClosing(false);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project]);

  if (!project) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const modalClasses = `fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing || !project ? 'opacity-0 pointer-events-none' : 'opacity-100'}`;

  return (
    <div className={modalClasses} onClick={handleClose}>
      <div className="civic-modal-overlay absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
      <div
        className="relative max-w-4xl w-full bg-slate-900 rounded-lg border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <img src={project.image} alt={project.title} className="w-full h-64 object-cover flex-shrink-0" />
        <div className="p-6 sm:p-8 overflow-y-auto modal-scrollbar">
          <h3 className="text-2xl sm:text-3xl font-serif text-slate-100 mb-2">{project.title}</h3>
          <p className="text-md uppercase tracking-wider text-amber-500 mb-4">{project.role}</p>
          <p className="text-slate-400 mb-6 leading-relaxed">{project.narrative}</p>
          <h4 className="text-lg font-semibold text-slate-200 mb-3">Key Outcomes</h4>
          <ul className="space-y-2">
            {project.outcomes.map((outcome, oIndex) => (
              <li key={oIndex} className="flex items-start">
                <CheckCircle className="flex-shrink-0 w-5 h-5 text-amber-500 mt-0.5 mr-3" />
                <span className="text-slate-300">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          aria-label="Close project details"
        >
          <CloseIcon size={28} />
        </button>
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCivicProject, setActiveCivicProject] = useState<CivicProject | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (projectId) {
      const projectToShow = PROJECTS_DATA.find(p => p.id === projectId);
      if (projectToShow) {
        setActiveProject(projectToShow);
      }
    }
  }, []); // This empty array ensures the effect runs only once when the app loads

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (activeProject || activeCivicProject || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeProject, activeCivicProject, isMobileMenuOpen]);

  const statusStyles: { [key: string]: string } = {
    'Published': 'bg-green-900/50 text-green-300',
    'Under Review': 'bg-amber-900/50 text-amber-300',
    'Conference Proceeding': 'bg-blue-900/50 text-blue-300'
  };


  return (
    <>
      <div className="min-h-screen bg-slate-900 text-slate-300">
        {/* Navigation */}
        <nav className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            <button onClick={() => scrollToSection('hero')} className="text-lg sm:text-xl font-serif text-slate-100 font-medium">Kaushik Ravi</button>

            <div className="hidden md:flex items-center space-x-6">
              <div className="relative group">
                <button className="nav-link flex items-center">
                  Work <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="nav-dropdown">
                  <button onClick={() => scrollToSection('research')} className="nav-dropdown-link">Featured Research</button>
                  <button onClick={() => scrollToSection('civic-impact')} className="nav-dropdown-link">Civic Impact</button>
                  <button onClick={() => scrollToSection('publications')} className="nav-dropdown-link">Publications</button>
                </div>
              </div>
              <div className="relative group">
                <button className="nav-link flex items-center">
                  Profile <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="nav-dropdown">
                  <button onClick={() => scrollToSection('accolades')} className="nav-dropdown-link">Accolades</button>
                  <button onClick={() => scrollToSection('foundation')} className="nav-dropdown-link">Foundation</button>
                </div>
              </div>
              <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
              <a
                href="/CV_Kaushik_Ravi.pdf"
                target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900 transition-all rounded-sm font-medium text-sm"
              >
                View CV
              </a>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-200">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-slate-400">
              <CloseIcon size={32} />
            </button>
            <div className="flex flex-col items-center space-y-6 text-xl">
              <button onClick={() => scrollToSection('research')} className="text-slate-300 hover:text-amber-500">Featured Research</button>
              <button onClick={() => scrollToSection('civic-impact')} className="text-slate-300 hover:text-amber-500">Civic Impact</button>
              <button onClick={() => scrollToSection('publications')} className="text-slate-300 hover:text-amber-500">Publications</button>
              <button onClick={() => scrollToSection('accolades')} className="text-slate-300 hover:text-amber-500">Accolades</button>
              <button onClick={() => scrollToSection('foundation')} className="text-slate-300 hover:text-amber-500">Foundation</button>
              <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-amber-500">About</button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section id="hero" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-100 mb-4 font-normal leading-tight">Kaushik Ravi</h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-serif text-slate-300 mb-6 sm:mb-8 font-normal leading-relaxed">Civic Technologist & Urban Systems Researcher</h2>

            <div className="prose prose-base sm:prose-lg max-w-none text-slate-300 mb-8 sm:mb-12 leading-relaxed">
              <p className="mb-4 sm:mb-6">
                My research confronts the critical gap between our cities' complex infrastructure and the citizens who inhabit them. I architect <strong>computational sensory systems</strong> that make invisible urban dynamics tangible. By fusing signals from everyday technology, from the vibrations of a road to the thermal signature of a tree canopy, my frameworks translate raw data into high-fidelity, actionable intelligence.
              </p>
              <p>
                This work moves beyond passive monitoring to create a direct feedback loop between people and place. It empowers communities with quantifiable metrics, such as a <strong>13.9°C localized cooling potential</strong> from urban trees or the precise location of infrastructure decay, catalyzing a shift from passive habitation to the active, data-informed co-creation of more resilient and responsive urban ecosystems.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('research')}
                className="px-6 sm:px-8 py-3 bg-amber-500 text-slate-900 hover:bg-amber-400 transition-colors font-medium rounded-sm text-center"
              >
                View Research
              </button>
              <a
                href="/CV_Kaushik_Ravi.pdf"
                download="CV_Kaushik_Ravi.pdf"
                className="px-6 sm:px-8 py-3 text-amber-500 hover:text-amber-400 transition-colors font-medium flex items-center justify-center sm:justify-start space-x-2"
              >
                <FileText size={20} />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </section>

        {/* Featured Research */}
        <section id="research" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-100 mb-4 sm:mb-6">Featured Research</h2>
            <p className="text-base sm:text-lg text-slate-400 mb-8 sm:mb-12 lg:mb-16 leading-relaxed">
              A selection of self-directed projects demonstrating an end-to-end methodology, from large-scale data analysis to the development of tools for citizen-led data collection and real-world application.
            </p>

            {/* Project 1: SensePath */}
            <div
              onClick={() => setActiveProject(PROJECTS_DATA.find(p => p.id === 'sensepath')!)}
              className="group relative cursor-pointer mb-12 sm:mb-16 lg:mb-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src="/images/Product 4 Title Image.png"
                    alt="Abstract visualization of a data network"
                    className="w-full rounded-lg border border-slate-700 aspect-video object-cover"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <div className="text-xs uppercase tracking-wider text-amber-500 mb-2 sm:mb-3">Civic Technology</div>
                  <h3 className="text-xl sm:text-2xl font-serif text-slate-100 mb-3 sm:mb-4">SensePath: A Nervous System for Our Roads</h3>
                  <p className="text-slate-400 mb-4 sm:mb-6 leading-relaxed">
                    This platform transforms the smartphone in every pocket into a high-fidelity road sensor, creating a living, self-improving map of our physical infrastructure. The system is built on a fully asynchronous architecture and a dual-stage intelligence engine: a real-time physics core for orientation-invariant analysis, and an adaptive learning model that normalizes data from any context, enabling universal, high-fidelity insight.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {['Real-Time Physics Engine', 'Orientation-Invariant Sensing', 'Asynchronous Architecture', 'Self-Improving AI'].map((tag) => (
                      <span key={tag} className="px-2 sm:px-3 py-1 bg-slate-800 text-slate-300 text-xs sm:text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl font-semibold text-amber-500 mb-1">The Universal Translator</div>
                    <div className="text-xs sm:text-sm text-slate-400">An adaptive AI that learns the unique signature of any phone placement and normalizes it for universal accuracy.</div>
                  </div>
                  <div className="mt-6 md:hidden">
                    <div className="inline-block px-4 py-2 border border-slate-200 text-slate-200 font-medium text-sm rounded-md">View Project</div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 md:flex items-center justify-center transition-opacity duration-300 rounded-lg hidden">
                <span className="px-6 py-3 border-2 border-slate-200 text-slate-200 font-medium text-lg">View Project</span>
              </div>
            </div>

            {/* Project 2: Pune Dashboard */}
            <div
              onClick={() => setActiveProject(PROJECTS_DATA.find(p => p.id === 'pune-dashboard')!)}
              className="group relative cursor-pointer mb-12 sm:mb-16 lg:mb-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="order-1 lg:order-2">
                  <img
                    src="/images/Product 1 Title Image.jpeg"
                    alt="Urban Analytics Dashboard Interface"
                    className="w-full rounded-lg border border-slate-700 aspect-video object-cover"
                  />
                </div>
                <div className="order-2 lg:order-1">
                  <div className="text-xs uppercase tracking-wider text-amber-500 mb-2 sm:mb-3">Urban Analytics & Planning</div>
                  <h3 className="text-xl sm:text-2xl font-serif text-slate-100 mb-3 sm:mb-4">Pune Urban Tree Intelligence Dashboard</h3>
                  <p className="text-slate-400 mb-4 sm:mb-6 leading-relaxed">
                    I engineered an end-to-end urban analytics platform to transform a 1.79 million-tree census into actionable climate intelligence, bridging the critical gap between raw data and community-led climate action. The system features a prescriptive 'Planting Advisor' that simulates greening interventions, allowing users to forecast the real-world cooling impact of new urban forestry.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {['Data Pipeline Engineering', 'Interactive Geovisualization', 'Geospatial Data Science', 'Vector Tile Optimization'].map((tag) => (
                      <span key={tag} className="px-2 sm:px-3 py-1 bg-slate-800 text-slate-300 text-xs sm:text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl font-semibold text-amber-500 mb-1">13.9°C</div>
                    <div className="text-xs sm:text-sm text-slate-400">Maximum cooling potential identified via Tree Archetype analysis</div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3 relative z-20">
                    <a
                      href="https://pune-tree-dashboard-sample.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-900 hover:bg-amber-400 transition-colors font-medium text-sm rounded-md"
                    >
                      <ExternalLink size={16} />
                      View Live Demo
                    </a>
                    <div className="md:hidden inline-block px-4 py-2 border border-slate-200 text-slate-200 font-medium text-sm rounded-md">View Details</div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 md:flex items-center justify-center transition-opacity duration-300 rounded-lg hidden">
                <span className="px-6 py-3 border-2 border-slate-200 text-slate-200 font-medium text-lg">View Project</span>
              </div>
            </div>

            {/* Project 3: TreeFolio */}
            <div
              onClick={() => setActiveProject(PROJECTS_DATA.find(p => p.id === 'treefolio')!)}
              className="group relative cursor-pointer mb-12 sm:mb-16 lg:mb-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src="/images/Product 2 Title Image.png"
                    alt="Mobile data collection interface"
                    className="w-full rounded-lg border border-slate-700 aspect-video object-cover"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <div className="text-xs uppercase tracking-wider text-amber-500 mb-2 sm:mb-3">Civic Technology & Data Collection</div>
                  <h3 className="text-xl sm:text-2xl font-serif text-slate-100 mb-3 sm:mb-4">TreeFolio: Citizen-Led Urban Forest Census</h3>
                  <p className="text-slate-400 mb-4 sm:mb-6 leading-relaxed">
                    To overcome the slow, unscalable methods of traditional urban forestry, I developed TreeFolio, a full-stack tool that turns any smartphone into a scientific-grade instrument for dendrometry. It fuses AI-powered image segmentation (Meta's SAM) with a complete scientific value chain to calculate not only a tree's physical dimensions but also its total sequestered CO₂.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {['AI-Powered Photogrammetry', 'Scientific Workflow Automation', 'Computer Vision (Meta SAM)', 'Full-Stack Python/React'].map((tag) => (
                      <span key={tag} className="px-2 sm:px-3 py-1 bg-slate-800 text-slate-300 text-xs sm:text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl font-semibold text-amber-500 mb-1">3,211 kg</div>
                    <div className="text-xs sm:text-sm text-slate-400">CO₂e sequestered by a single tree, calculated via the end-to-end pipeline</div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3 relative z-20">
                    <a
                      href="https://tree-measurement-frontend.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-900 hover:bg-amber-400 transition-colors font-medium text-sm rounded-md"
                    >
                      <ExternalLink size={16} />
                      View Live Demo
                    </a>
                    <div className="md:hidden inline-block px-4 py-2 border border-slate-200 text-slate-200 font-medium text-sm rounded-md">View Details</div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 md:flex items-center justify-center transition-opacity duration-300 rounded-lg hidden">
                <span className="px-6 py-3 border-2 border-slate-200 text-slate-200 font-medium text-lg">View Project</span>
              </div>
            </div>

            {/* Project 4: Eco-Path Navigator */}
            <div
              onClick={() => setActiveProject(PROJECTS_DATA.find(p => p.id === 'eco-path-navigator')!)}
              className="group relative cursor-pointer mb-12 sm:mb-16 lg:mb-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="order-1 lg:order-2">
                  <img
                    src="/images/Product 3 Title Image.jpeg"
                    alt="Urban pathway planning visualization"
                    className="w-full rounded-lg border border-slate-700 aspect-video object-cover"
                  />
                </div>
                <div className="order-2 lg:order-1">
                  <div className="text-xs uppercase tracking-wider text-amber-500 mb-2 sm:mb-3">Computational Urbanism</div>
                  <h3 className="text-xl sm:text-2xl font-serif text-slate-100 mb-3 sm:mb-4">Eco-Path Navigator: Climate-Optimized Urban Routing</h3>
                  <p className="text-slate-400 mb-4 sm:mb-6 leading-relaxed">
                    I created a novel 'Civic Wellness' application that redefines urban navigation by prioritizing well-being over speed. The system features a dual-mode engine: an eco-router that balances travel time with a custom Environmental Quality Score, and a first-of-its-kind wellness mode that uses a real-time AI pipeline to generate guided, location-aware walking meditations based on the user's surroundings.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {['Real-Time AI Pipeline', 'Heuristic Route Optimization', 'Geospatial API Integration', 'Proximity-Based Audio'].map((tag) => (
                      <span key={tag} className="px-2 sm:px-3 py-1 bg-slate-800 text-slate-300 text-xs sm:text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl font-semibold text-amber-500 mb-1">AI-Generated Guidance</div>
                    <div className="text-xs sm:text-sm text-slate-400">Generates a unique, guided walking meditation with a real-time AI pipeline using the Gemini API.</div>
                  </div>
                  <div className="mt-6 md:hidden">
                    <div className="inline-block px-4 py-2 border border-slate-200 text-slate-200 font-medium text-sm rounded-md">View Project</div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 md:flex items-center justify-center transition-opacity duration-300 rounded-lg hidden">
                <span className="px-6 py-3 border-2 border-slate-200 text-slate-200 font-medium text-lg">View Project</span>
              </div>
            </div>

            {/* Project 5: Berlin Case Study */}
            <div
              onClick={() => setActiveProject(PROJECTS_DATA.find(p => p.id === 'berlin-case-study')!)}
              className="group relative cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src="/images/Product 4 Title Image.jpeg"
                    alt="Visualization of Berlin's urban forest data"
                    className="w-full rounded-lg border border-slate-700 aspect-video object-cover"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <div className="text-xs uppercase tracking-wider text-amber-500 mb-2 sm:mb-3">Academic Research & Data Visualization</div>
                  <h3 className="text-xl sm:text-2xl font-serif text-slate-100 mb-3 sm:mb-4">Urban Tree Intelligence: A Berlin Case Study</h3>
                  <p className="text-slate-400 mb-4 sm:mb-6 leading-relaxed">
                    As a DAAD Scholar at TU Berlin, I developed a new methodology to make the environmental benefits of urban forests tangible. I engineered a data pipeline to process and analyze Berlin's 885,000-tree census against high-resolution climate data. The final output was an interactive visualization that translates a simple commute into a quantifiable ecological journey, revealing real-time temperature reduction and oxygen production.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {['Geospatial Analysis', 'Open Data Integration', 'Environmental Data Visualization', 'Academic Research'].map((tag) => (
                      <span key={tag} className="px-2 sm:px-3 py-1 bg-slate-800 text-slate-300 text-xs sm:text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl font-semibold text-amber-500 mb-1">1.48°C</div>
                    <div className="text-xs sm:text-sm text-slate-400">Average temperature reduction measured in high-density urban forest areas</div>
                  </div>
                  <div className="mt-6 md:hidden">
                    <div className="inline-block px-4 py-2 border border-slate-200 text-slate-200 font-medium text-sm rounded-md">View Project</div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 md:flex items-center justify-center transition-opacity duration-300 rounded-lg hidden">
                <span className="px-6 py-3 border-2 border-slate-200 text-slate-200 font-medium text-lg">View Project</span>
              </div>
            </div>

          </div>
        </section>

        {/* Research Translation & Civic Impact */}
        <section id="civic-impact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-100 mb-4 sm:mb-6">Research Translation & Civic Impact</h2>
            <p className="text-base sm:text-lg text-slate-400 mb-8 sm:mb-12 lg:mb-16 leading-relaxed">
              My research is grounded in the belief that data's true potential is realized when it empowers community action and informs public policy. Below are foundational initiatives where I translated technical inquiry into measurable civic outcomes, shaping the trajectory of my current academic pursuits.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CIVIC_PROJECTS_DATA.map((project) => (
                <article key={project.title} className="group relative rounded-lg overflow-hidden h-96 cursor-pointer" onClick={() => setActiveCivicProject(project)}>
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 civic-card-gradient"></div>
                  <div className="relative h-full flex flex-col justify-end p-6">
                    <h3 className="text-xl font-serif text-slate-100">{project.title}</h3>
                    <div className="mt-4 md:hidden">
                      <div className="inline-block px-4 py-2 border border-slate-200 text-slate-200 font-medium text-sm rounded-md">View Details</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-slate-900/70 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-6 py-3 border-2 border-slate-200 text-slate-200 font-medium text-lg">View Details</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Publications */}
        <section id="publications" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-slate-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-100 mb-8 sm:mb-12">Publications & Pre-Prints</h2>
            <div className="space-y-8">
              {PUBLICATIONS_DATA.map((pub, index) => (
                <div key={index} className="border-l-4 border-amber-500/30 pl-4 sm:pl-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${statusStyles[pub.status] || 'bg-slate-700 text-slate-300'}`}>
                      {pub.status}
                    </span>
                    {pub.link !== "N/A" && (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 flex items-center space-x-1 text-sm self-start sm:self-auto">
                        <span>{pub.status === "Under Review" ? "View Preprint" : "View Publication"}</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: pub.citation }}></p>
                  <blockquote className="text-slate-400 text-xs sm:text-sm bg-slate-800/50 p-3 sm:p-4 rounded border-l-2 border-slate-700 italic leading-relaxed">
                    {pub.summary}
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition & Accolades */}
        <section id="accolades" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-100 mb-12 sm:mb-16">Recognition & Accolades</h2>
            <div className="relative">
              <div className="timeline-spine"></div>
              {ACCOLADES_DATA.map((accolade, index) => (
                <div key={index} className={`timeline-entry ${index % 2 === 0 ? 'lg:items-start' : 'lg:items-end lg:text-right'}`}>
                  <div className={`timeline-content-container ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <p className="timeline-year">{accolade.year}</p>
                    <h3 className="timeline-title">{accolade.title}</h3>
                    <p className="timeline-institution">{accolade.institution}</p>
                    <p className="timeline-description">{accolade.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Foundation & Leadership */}
        <section id="foundation" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-100 mb-12 sm:mb-16">Academic Foundation & Leadership</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h3 className="text-xl font-serif text-slate-200 mb-6">Education</h3>
                <div className="space-y-8">
                  <div>
                    <p className="font-semibold text-slate-100 text-lg">National Institute of Technology, Tiruchirappalli</p>
                    <p className="text-slate-400 text-sm">Tiruchirappalli, India</p>
                    <p className="text-slate-300 mt-2">Bachelor of Technology, Civil Engineering</p>
                    <p className="text-slate-300">Minor, Energy & Environmental Engineering</p>
                    <p className="text-slate-400 mt-1">Cumulative GPA: 9.5 / 10.0</p>
                    <p className="text-slate-500 text-sm mt-1">Dec 2021 – May 2025</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100 text-lg">Technische Universität Berlin</p>
                    <p className="text-slate-400 text-sm">Berlin, Germany</p>
                    <p className="text-slate-300 mt-2">DAAD WISE Visiting Research Scholar</p>
                    <p className="text-slate-500 text-sm mt-1">Jun 2024 – Aug 2024</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif text-slate-200 mb-6">Leadership & Advisory Roles</h3>
                <div className="space-y-8">
                  {LEADERSHIP_ROLES_DATA.map((role, index) => (
                    <div key={index} className="flex items-start group/item md:cursor-pointer" onClick={() => setExpandedRole(expandedRole === index ? null : index)}>
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 overflow-hidden">
                          <img src={role.logo} alt={`${role.organization} logo`} className="h-full w-full object-cover" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-slate-100">{role.role}</p>
                            <p className="text-amber-500 text-sm">{role.organization}</p>
                          </div>
                          <ChevronDown size={20} className={`text-slate-500 md:hidden transition-transform duration-300 ${expandedRole === index ? 'rotate-180' : ''}`} />
                        </div>
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out md:max-h-0 md:group-hover/item:max-h-48 ${expandedRole === index ? 'max-h-48' : 'max-h-0'}`}>
                          <p className="text-slate-400 text-sm mt-2 leading-relaxed">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-100 mb-6 sm:mb-8">About Me</h2>

            <div className="prose prose-base sm:prose-lg max-w-none text-slate-300 mb-8 sm:mb-12 leading-relaxed">
              <p className="mb-4 sm:mb-6">
                I am a researcher and technologist driven to bridge the gap between the complex, invisible systems that govern our cities and the citizens who inhabit them. My work is grounded in the conviction that the most pressing urban challenges are not just technical, but social; they require new relationships between data, people, and the processes that govern our cities.
              </p>
              <p>
                This focus stems from my background in urban sustainability and on-the-ground civic engagement, which revealed a persistent disconnect between high-level policy and hyperlocal reality. My approach is therefore defined by a synthesis of rigorous computational methods and participatory design, ensuring the systems I build are not only technically robust but also democratically valuable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <a
                href="mailto:official.kaushik.r@gmail.com"
                className="flex items-center space-x-2 text-slate-400 hover:text-amber-500 transition-colors"
              >
                <Mail size={20} />
                <span>Email</span>
              </a>
              <a
                href="https://www.linkedin.com/in/kaushik2002"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-400 hover:text-amber-500 transition-colors"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Kaushik-Ravi"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-400 hover:text-amber-500 transition-colors"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-slate-800 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-slate-500 text-xs sm:text-sm">
              © 2025 Kaushik Ravi. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      <CivicProjectModal project={activeCivicProject} onClose={() => setActiveCivicProject(null)} />
    </>
  );
}

export default App;