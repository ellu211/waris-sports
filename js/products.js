// WARIS SPORTS - Product Catalog Database
const PRODUCTS_DATA = [
  // CRICKET
  {
    id: 'cricket-01',
    name: 'Waris Pro Master English Willow Cricket Bat',
    category: 'cricket',
    brand: 'Waris Pro',
    price: 18999,
    originalPrice: 24999,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Bestseller',
    inStock: true,
    stockCount: 8,
    image: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted from Grade 1 Selected English Willow. Huge 40mm contoured edges, feather-light balance, and massive sweet spot designed for aggressive power hitters and stroke players alike.',
    specs: {
      'Willow Grade': 'Grade 1 Premium English Willow',
      'Weight': '1180 - 1220 grams (2.9 - 2.11 lbs)',
      'Handle': '12-piece Singapore cane handle',
      'Grain Count': '8-11 straight, clear grains',
      'Profile': 'Full spine with minimal concaving'
    },
    sizes: ['Full Size (SH)', 'Short Handle Light (1160g)', 'Harrow (Junior)'],
    hasKnockingOption: true,
    featured: true
  },
  {
    id: 'cricket-02',
    name: 'SG Club Four-Piece Leather Cricket Ball (Box of 6)',
    category: 'cricket',
    brand: 'SG',
    price: 3499,
    originalPrice: 4200,
    rating: 4.8,
    reviewsCount: 96,
    badge: 'Tournament Grade',
    inStock: true,
    stockCount: 25,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    description: 'Top grade alum tanned waterproof leather with prominent hand-stitched seam. Excellent shape retention and consistent seam response for 50-over matches and club tournaments.',
    specs: {
      'Material': 'Alum tanned leather, Portuguese cork core',
      'Seam': '75-80 hand stitches',
      'Color': 'Cherry Red',
      'Quantity': 'Box of 6 Balls'
    },
    sizes: ['Standard Men (5.5 oz)', 'Youth (4.75 oz)', 'White Match Edition'],
    featured: false
  },
  {
    id: 'cricket-03',
    name: 'SS Professional Matrix Batting Pads & Gloves Combo',
    category: 'cricket',
    brand: 'SS',
    price: 6499,
    originalPrice: 7999,
    rating: 4.7,
    reviewsCount: 68,
    badge: 'Pro Protection',
    inStock: true,
    stockCount: 14,
    image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80',
    description: 'High-density plastazote foam padding with reinforced cane inserts and 3-piece contoured knee locator. Sheep leather palm gloves with split-finger XRD impact protection.',
    specs: {
      'Protection Level': 'Test Match Standard (up to 145 km/h)',
      'Padding': 'High Density EVA & Polycarbonate Cane',
      'Palm': 'Genuine Pittards Sheep Leather',
      'Closure': 'Triple padded Velcro straps'
    },
    sizes: ['Men Standard (Right Hand)', 'Men Standard (Left Hand)', 'Youth Size'],
    featured: true
  },
  {
    id: 'cricket-04',
    name: 'Shrey Master Class Air Titanium Cricket Helmet',
    category: 'cricket',
    brand: 'Shrey',
    price: 7999,
    originalPrice: 9500,
    rating: 4.9,
    reviewsCount: 88,
    badge: 'BSI Certified',
    inStock: true,
    stockCount: 6,
    image: 'https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-lightweight high-impact polymer shell with titanium grille. Meets the latest BS 7928:2013 safety standards against 150 km/h cricket ball impacts.',
    specs: {
      'Shell': 'Carbon-composite polymer',
      'Grille': 'Grade 5 Titanium (Ultra-light)',
      'Certification': 'BSI 7928:2013 Tested',
      'Ventilation': '12 aerofoil intake vents'
    },
    sizes: ['Medium (57-59cm)', 'Large (59-61cm)', 'Extra Large (61-63cm)'],
    featured: false
  },
  {
    id: 'cricket-05',
    name: 'Waris Pro Grand Wheelie Cricket Kitbag (120L)',
    category: 'cricket',
    brand: 'Waris Pro',
    price: 4999,
    originalPrice: 6500,
    rating: 4.8,
    reviewsCount: 54,
    badge: 'Heavy Duty',
    inStock: true,
    stockCount: 12,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: '1680D ballistic waterproof nylon kitbag with heavy-duty tractor wheels, padded external 3-bat compartment, vented shoe tunnel, and cooler pocket for hydration.',
    specs: {
      'Material': '1680 Denier Ballistic Polyester',
      'Capacity': '120 Liters',
      'Wheels': 'Triple all-terrain heavy-duty bearing wheels',
      'Compartments': 'Dedicated 3-bat sleeve + dirty shoe garage'
    },
    sizes: ['Standard Pro (120L)', 'XL Tour Edition (140L)'],
    featured: false
  },

  // FOOTBALL
  {
    id: 'football-01',
    name: 'Nike Flight Pro Official FIFA Match Ball',
    category: 'football',
    brand: 'Nike',
    price: 8999,
    originalPrice: 10999,
    rating: 4.9,
    reviewsCount: 112,
    badge: 'FIFA Quality Pro',
    inStock: true,
    stockCount: 11,
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered with Nike Aerowsculpt technology featuring molded grooves that disrupt airflow across the ball for true flight. 3D-printed ink overlays fine-tune touch and grip.',
    specs: {
      'Construction': '4-panel fuse welded',
      'Bladder': 'Latex bladder for optimal air retention',
      'Certification': 'FIFA Quality Pro 10046',
      'Surface': 'Micro-textured synthetic leather'
    },
    sizes: ['Size 5 (Official)', 'Size 4 (Junior/Futsal)'],
    featured: true
  },
  {
    id: 'football-02',
    name: 'Adidas Predator Elite Firm Ground Football Cleats',
    category: 'football',
    brand: 'Adidas',
    price: 14999,
    originalPrice: 18999,
    rating: 4.9,
    reviewsCount: 78,
    badge: 'Top Tier',
    inStock: true,
    stockCount: 7,
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=800&q=80',
    description: 'Strikeskin rubber fins strategically placed across the striking zone for pinpoint swerve and power. HybridTouch 2.0 synthetic suede upper delivers unmatched ball feel.',
    specs: {
      'Upper': 'HybridTouch 2.0 with Strikeskin fins',
      'Outsole': 'Controlframe 2.0 lightweight FG tooling',
      'Collar': 'Primeknit adaptive laceless collar',
      'Stud Type': 'Molded firm ground conical & chevron studs'
    },
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    featured: true
  },
  {
    id: 'football-03',
    name: 'Puma Ultra Grip 1 Hybrid Pro Goalkeeper Gloves',
    category: 'football',
    brand: 'Puma',
    price: 4499,
    originalPrice: 5999,
    rating: 4.7,
    reviewsCount: 45,
    badge: 'Pro Grip',
    inStock: true,
    stockCount: 15,
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80',
    description: '4mm Superior Grip latex palm provides outstanding tackiness in wet and dry conditions. Hybrid cut maximizes latex-to-ball contact with silicon punching zone on the backhand.',
    specs: {
      'Palm': '4mm Ultimate Grip German Latex',
      'Cut': 'Hybrid Roll/Negative Cut',
      'Backhand': 'Breathable mesh with silicone punch shield',
      'Wrist': 'Full wrap latex strap with pull loop'
    },
    sizes: ['Size 8', 'Size 9', 'Size 10'],
    featured: false
  },
  {
    id: 'football-04',
    name: 'Nivia Carbonite Pro Shin Guards with Ankle Guard',
    category: 'football',
    brand: 'Nivia',
    price: 899,
    originalPrice: 1299,
    rating: 4.6,
    reviewsCount: 120,
    badge: 'Budget Pick',
    inStock: true,
    stockCount: 40,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    description: 'Impact-resistant PP hard shield backed by high-density EVA shock absorbing cushion. Integrated cushioned ankle sock provides comprehensive lower-leg defense.',
    specs: {
      'Shield': 'Hardened Polypropylene',
      'Lining': '5mm shock absorbing EVA foam',
      'Fit': 'Ankle boot strap + calf velcro strap'
    },
    sizes: ['Small (Kids)', 'Medium (Youth)', 'Large (Adult)'],
    featured: false
  },

  // BADMINTON & TENNIS
  {
    id: 'badminton-01',
    name: 'Yonex Astrox 99 Pro Tour Badminton Racket',
    category: 'badminton',
    brand: 'Yonex',
    price: 15499,
    originalPrice: 18999,
    rating: 5.0,
    reviewsCount: 135,
    badge: 'Pro Choice',
    inStock: true,
    stockCount: 9,
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    description: 'Head-heavy racket engineered with Namd graphite and Rotational Generator System. Unleashes devastating steep smashes with rapid recovery for the next offensive strike.',
    specs: {
      'Frame': 'H.M. Graphite + NAMD + Tungsten',
      'Shaft': 'H.M. Graphite + NAMD Ultra Slim',
      'Weight / Grip': '4U (Avg. 83g) G5',
      'String Tension': 'Up to 28 lbs supported',
      'Origin': 'Made in Japan'
    },
    sizes: ['4U / G5 (Standard Pro)', '3U / G4 (Heavier Power)'],
    hasStringingOption: true,
    featured: true
  },
  {
    id: 'badminton-02',
    name: 'Yonex Mavis 350 Nylon Shuttles (Pack of 6)',
    category: 'badminton',
    brand: 'Yonex',
    price: 1099,
    originalPrice: 1399,
    rating: 4.8,
    reviewsCount: 310,
    badge: 'Club Favorite',
    inStock: true,
    stockCount: 60,
    image: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=800&q=80',
    description: 'The world benchmark for durable nylon shuttlecocks. Precision manufactured to replicate the trajectory, recovery time, and sound of natural feather shuttles with 4x longevity.',
    specs: {
      'Skirt': 'Precision Molded Virgin Nylon',
      'Base': 'Natural Portuguese Wood Cork',
      'Speed': 'Slow (Green) / Medium (Blue)'
    },
    sizes: ['Medium Speed (Blue Cap - All Weather)', 'Slow Speed (Green Cap - Summer)'],
    featured: false
  },
  {
    id: 'badminton-03',
    name: 'Wilson Pro Staff 97 v14 Precision Tennis Racket',
    category: 'badminton',
    brand: 'Wilson',
    price: 21999,
    originalPrice: 25999,
    rating: 4.9,
    reviewsCount: 42,
    badge: 'Legendary Control',
    inStock: true,
    stockCount: 4,
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80',
    description: 'Braid 45 construction arranges double-braided fibers at 45-degree angles for superior pocketing and stability. Designed for pinpoint precision attacking tennis players.',
    specs: {
      'Head Size': '97 sq in / 626 sq cm',
      'Unstrung Weight': '315 grams (11.1 oz)',
      'Balance': '31 cm / 10 pts HL',
      'String Pattern': '16 x 19'
    },
    sizes: ['Grip 2 (4 1/4")', 'Grip 3 (4 3/8")', 'Grip 4 (4 1/2")'],
    hasStringingOption: true,
    featured: true
  },
  {
    id: 'badminton-04',
    name: 'Waris Pro Overgrip Tacky Feel (Pack of 12)',
    category: 'badminton',
    brand: 'Waris Pro',
    price: 799,
    originalPrice: 1200,
    rating: 4.7,
    reviewsCount: 88,
    badge: 'Value Pack',
    inStock: true,
    stockCount: 50,
    image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80',
    description: 'High moisture absorption polyurethane grip with micro-perforations. Provides non-slip grip during intense long rallies and sweaty games.',
    specs: {
      'Thickness': '0.6mm',
      'Width': '25mm x Length 1100mm',
      'Quantity': '12 rolls + adhesive finishing tapes',
      'Colors': 'Assorted Neon & Black'
    },
    sizes: ['Assorted Neon Colors', 'All Stealth Black', 'All Pure White'],
    featured: false
  },

  // FITNESS & GYM
  {
    id: 'fitness-01',
    name: 'Waris Hex Commercial Rubber Dumbbell Set (Pair)',
    category: 'fitness',
    brand: 'Waris Pro',
    price: 3899,
    originalPrice: 5200,
    rating: 4.9,
    reviewsCount: 165,
    badge: 'Heavy Duty',
    inStock: true,
    stockCount: 18,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    description: 'Cast iron heads encased in high-grade odorless virgin rubber. Anti-roll hexagonal profile with chrome-plated knurled ergonomic steel handles for confident grip.',
    specs: {
      'Handle': 'Solid steel with diamond knurling',
      'Coating': 'Impact-absorbing virgin rubber',
      'Design': 'Anti-roll Hexagonal heads'
    },
    sizes: ['Pair of 5 kg', 'Pair of 10 kg', 'Pair of 15 kg', 'Pair of 20 kg'],
    featured: true
  },
  {
    id: 'fitness-02',
    name: 'Waris Heavy Powerlifting Lever Belt (10mm Genuine Leather)',
    category: 'fitness',
    brand: 'Waris Pro',
    price: 3499,
    originalPrice: 4800,
    rating: 4.9,
    reviewsCount: 94,
    badge: 'IPF Spec',
    inStock: true,
    stockCount: 10,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted from 10mm thick full-grain vegetable-tanned cowhide leather with matte black zinc alloy quick-release lever. Unyielding intra-abdominal support for heavy squats and deadlifts.',
    specs: {
      'Thickness': '10mm uniform competition spec',
      'Width': '4 inches (competition standard)',
      'Buckle': 'Heavy duty zinc-alloy lever buckle',
      'Stitching': 'Quad-row industrial bonded nylon'
    },
    sizes: ['Small (26-32 inch waist)', 'Medium (30-36 inch waist)', 'Large (34-40 inch waist)', 'XL (38-44 inch waist)'],
    featured: true
  },
  {
    id: 'fitness-03',
    name: 'Pro Loop Heavy Resistance Pull-Up Bands (Set of 4)',
    category: 'fitness',
    brand: 'Waris Pro',
    price: 1699,
    originalPrice: 2499,
    rating: 4.7,
    reviewsCount: 110,
    badge: '100% Latex',
    inStock: true,
    stockCount: 30,
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
    description: 'Multi-layered natural Malaysian latex power bands. Ideal for pull-up progression, mobility warmups, powerlifting accommodated resistance, and full-body home workouts.',
    specs: {
      'Material': '100% Natural Malaysian Latex',
      'Resistance Range': 'Red (15-35 lbs), Black (25-65 lbs), Purple (35-85 lbs), Green (50-125 lbs)',
      'Length': '208cm loop circumference'
    },
    sizes: ['Full Set of 4 Bands + Travel Pouch', 'Heavy Combo (Purple + Green)'],
    featured: false
  },
  {
    id: 'fitness-04',
    name: 'Dual-Layer Eco-Friendly High Density TPE Yoga Mat',
    category: 'fitness',
    brand: 'Waris Pro',
    price: 1499,
    originalPrice: 2199,
    rating: 4.8,
    reviewsCount: 77,
    badge: 'Eco Friendly',
    inStock: true,
    stockCount: 22,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80',
    description: '6mm high-resilience TPE material with laser-etched body alignment lines. Dual texture non-slip surface prevents slipping even during hot yoga and high-sweat sessions.',
    specs: {
      'Thickness': '6mm orthopedic cushioning',
      'Dimensions': '183cm x 61cm',
      'Material': 'Non-toxic, PVC-free Eco TPE',
      'Includes': 'Carry strap & breathable mesh bag'
    },
    sizes: ['Standard 6mm (Navy/Cyan)', 'Standard 6mm (Charcoal/Orange)', 'Pro 8mm Extra Thick (Black)'],
    featured: false
  },

  // RUNNING & SHOES
  {
    id: 'running-01',
    name: 'Nike ZoomX Vaporfly Marathon Carbon-Plated Running Shoes',
    category: 'running',
    brand: 'Nike',
    price: 19999,
    originalPrice: 23999,
    rating: 4.9,
    reviewsCount: 89,
    badge: 'Podium Winner',
    inStock: true,
    stockCount: 5,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    description: 'Full-length carbon fiber Flyplate coupled with responsive ZoomX foam provides the highest energy return of any racing shoe on the market. Engineered for half and full marathon PB chasers.',
    specs: {
      'Midsole': 'Full-length ZoomX foam + Carbon Fiber Flyplate',
      'Weight': '198 grams (Men US 9)',
      'Drop': '8mm offset',
      'Upper': 'VaporWeave translucent water-resistant upper'
    },
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    featured: true
  },
  {
    id: 'running-02',
    name: 'Waris Ultra-Hydration 5L Running Vest with Dual Flasks',
    category: 'running',
    brand: 'Waris Pro',
    price: 2499,
    originalPrice: 3499,
    rating: 4.7,
    reviewsCount: 63,
    badge: 'Trail Ready',
    inStock: true,
    stockCount: 16,
    image: 'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&w=800&q=80',
    description: 'Bounces-free ergonomic vest with breathable 3D air-mesh harness. Comes equipped with two 500ml BPA-free bite-valve soft flasks, water-resistant phone pouch, and trekking pole clips.',
    specs: {
      'Volume': '5L storage capacity',
      'Weight': '190 grams unladen',
      'Includes': '2x 500ml TPU Soft Hydration Flasks',
      'Reflective': '360-degree night visibility strips'
    },
    sizes: ['S/M (Chest 78-94cm)', 'L/XL (Chest 92-110cm)'],
    featured: false
  },

  // SPORTSWEAR & JERSEYS
  {
    id: 'apparel-01',
    name: 'Waris Custom Pro Team Dri-Fit Match Jersey',
    category: 'apparel',
    brand: 'Waris Pro',
    price: 1299,
    originalPrice: 1999,
    rating: 4.9,
    reviewsCount: 220,
    badge: 'Customizable',
    inStock: true,
    stockCount: 100,
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-breathable micro-mesh athletic jersey with sweat-wicking AeroDry technology. Customize with your personal name and favorite squad number directly on our live 3D visualizer!',
    specs: {
      'Fabric': '100% Recycled AeroDry Polyester',
      'Weight': '145 GSM Light Knit',
      'Print': 'High-definition sublimation (Never peels or fades)',
      'Fit': 'Athletic Slim Fit'
    },
    sizes: ['Small (38")', 'Medium (40")', 'Large (42")', 'XL (44")', 'XXL (46")'],
    isCustomJersey: true,
    featured: true
  },
  {
    id: 'apparel-02',
    name: 'Under Armour HeatGear Compression Tights',
    category: 'apparel',
    brand: 'Under Armour',
    price: 2799,
    originalPrice: 3500,
    rating: 4.8,
    reviewsCount: 84,
    badge: 'Muscle Support',
    inStock: true,
    stockCount: 14,
    image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
    description: 'Super-light HeatGear fabric delivers superior coverage without weighing you down. Targeted 4-way stretch compression supports quadriceps and hamstrings to accelerate recovery.',
    specs: {
      'Material': '84% Polyester / 16% Elastane',
      'Technology': 'Anti-odor & moisture transport system',
      'Waistband': 'Engineered elastic waistband with wordmark'
    },
    sizes: ['Small (30")', 'Medium (32")', 'Large (34")', 'XL (36")'],
    featured: false
  },
  {
    id: 'apparel-03',
    name: 'Pro Cushion Anti-Blister Crew Athletic Socks (Pack of 3)',
    category: 'apparel',
    brand: 'Waris Pro',
    price: 699,
    originalPrice: 999,
    rating: 4.8,
    reviewsCount: 195,
    badge: 'Essential',
    inStock: true,
    stockCount: 45,
    image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80',
    description: 'Reinforced heel and toe Terry-loop cushioning absorbs high-impact foot strikes. Arch band compression stabilizes your midfoot during quick directional sprints.',
    specs: {
      'Yarn': 'Comb cotton with Lycra spandex',
      'Cushion': 'Double density Terry loop bottom',
      'Quantity': '3 pairs (Black, White, Charcoal)'
    },
    sizes: ['Free Size (Fits UK 6 to 11)'],
    featured: false
  },

  // ACCESSORIES
  {
    id: 'acc-01',
    name: 'Waris Pro Stainless Steel Thermal Insulated Sports Flask (1000ml)',
    category: 'accessories',
    brand: 'Waris Pro',
    price: 1199,
    originalPrice: 1799,
    rating: 4.8,
    reviewsCount: 140,
    badge: 'Cold for 24h',
    inStock: true,
    stockCount: 28,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    description: 'Double-walled vacuum insulated food-grade 18/8 stainless steel bottle. Keeps iced water freezing cold for 24 hours or hot drinks steaming for 12 hours. Sweat-proof matte powder coat.',
    specs: {
      'Volume': '1000ml (34 oz)',
      'Material': '18/8 Pro-Grade Stainless Steel',
      'Lid': 'Chug sports cap with carry carabiner loop',
      'BPA Free': '100% Toxins & BPA Free'
    },
    sizes: ['1000ml Matte Onyx Black', '1000ml Matte Waris Red', '750ml Compact Navy'],
    featured: false
  },
  {
    id: 'acc-02',
    name: 'Fast-Dry Microfiber Sports Cooling Gym Towel',
    category: 'accessories',
    brand: 'Waris Pro',
    price: 499,
    originalPrice: 799,
    rating: 4.7,
    reviewsCount: 88,
    badge: 'Quick Dry',
    inStock: true,
    stockCount: 35,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    description: 'Silky soft, ultra-absorbent microfiber towel that absorbs 4x its weight in sweat and dries in minutes. Includes zip pocket for locker key or phone.',
    specs: {
      'Size': '100cm x 40cm',
      'Material': '85% Polyester / 15% Polyamide Microfiber',
      'Features': 'Hidden zippered corner pocket'
    },
    sizes: ['Standard 100x40cm (Cobalt Blue)', 'Standard 100x40cm (Stealth Gray)'],
    featured: false
  }
];

// Workshop Services
const WORKSHOP_SERVICES = [
  {
    id: 'srv-knock',
    title: 'Machine Bat Knocking & Oiling',
    sport: 'Cricket',
    icon: 'fa-baseball-bat-ball',
    turnaround: '24 - 48 Hours',
    price: 799,
    description: '25,000 automated hammer strikes across edges, toe, and face followed by linseed oil conditioning and protective anti-scuff sheet application.'
  },
  {
    id: 'srv-string',
    title: 'Computerized Electronic Racket Stringing',
    sport: 'Badminton & Tennis',
    icon: 'fa-table-tennis-paddle-ball',
    turnaround: 'Same Day / 3 Hours',
    price: 499,
    description: 'Constant pull electronic tensioning on Yonex ES5 machines with zero tension loss. Range from 22 lbs to 32 lbs with wide selection of strings.'
  },
  {
    id: 'srv-repair',
    title: 'Handle Replacement & Weight Balancing',
    sport: 'Cricket',
    icon: 'fa-screwdriver-wrench',
    turnaround: '2 - 3 Days',
    price: 1199,
    description: 'Cracked or loose handle extraction and installation of genuine 12-piece Singapore cane handle with custom grip contouring.'
  },
  {
    id: 'srv-jersey',
    title: 'Custom Team Kit Sublimation & Printing',
    sport: 'All Sports',
    icon: 'fa-shirt',
    turnaround: '3 - 5 Days',
    price: 450,
    description: 'Full team kits with club logos, player names, and numbers. High-definition thermal dye sublimation for minimum 10 jerseys.'
  }
];

// Customer Testimonials
const TESTIMONIALS = [
  {
    name: 'Coach Tariq Siddiqui',
    role: 'Head Cricket Coach, City Sports Academy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'Waris Sports is our go-to shop for English Willow bats and academy kitballs. Their machine bat knocking service is top-notch. Every bat comes match-ready!',
    rating: 5,
    sport: 'Cricket'
  },
  {
    name: 'Zoya Khan',
    role: 'State Level Badminton Player',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    comment: 'I get my Yonex rackets strung exclusively at Waris Sports. The electronic stringing machine gives precise 27 lbs tension without frame distortion.',
    rating: 5,
    sport: 'Badminton'
  },
  {
    name: 'Rahul Varma',
    role: 'Marathoner & Fitness Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    comment: 'Bought the powerlifting lever belt and Nike ZoomX shoes. 100% original authentic gear, super fast delivery, and very knowledgeable staff.',
    rating: 5,
    sport: 'Running & Fitness'
  }
];


// Export to window for global access
if (typeof window !== 'undefined') {
  window.DEFAULT_PRODUCTS = PRODUCTS_DATA;
  window.WORKSHOP_SERVICES = WORKSHOP_SERVICES;
  window.TESTIMONIALS = TESTIMONIALS;
}
