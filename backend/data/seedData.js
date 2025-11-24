// Realistic Karnataka-oriented seed data (demo / non-official)

module.exports = [
  // 1) GPU-28 – actually Ragi, not Groundnut
  {
    varietyName: "GPU-28",
    varietyNameKannada: "ಜಿ ಪಿ ಯು-೨೮",
    cropName: "Ragi (Finger millet)",
    type: "High Yield",
    suitableRegions: ["All Karnataka (rainfed & irrigated)"],
    suitableDistricts: [
      "Tumakuru",
      "Mandya",
      "Chitradurga",
      "Hassan",
      "Chikkamagaluru",
      "Ramanagara"
    ],
    brand: "UAS Bengaluru / KSSCL",
    supplier: "University of Agricultural Sciences, Bengaluru & KSSCL",
    image: "https://th.bing.com/th/id/OIP.Pt33Vjn040gjQheg_bBXJAHaEK?w=283&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    pricePerKg: 120, // indicative only
    germinationRate: "85-90%",
    duration: "110-115 days",
    specialFeatures: [
      "High yielding under rainfed and irrigated conditions",
      "Resistant to neck and finger blast",
      "Widely adopted ragi variety in Karnataka"
    ],
    contact: "080-23330153",
    rating: 4.7
  },

  // 2) TAG-24 – Groundnut
  {
    varietyName: "TAG-24",
    varietyNameKannada: "ಟ್ಯಾಗ್-೨೪",
    cropName: "Groundnut",
    type: "Traditional",
    suitableRegions: ["All Karnataka (irrigated & rainfed)"],
    suitableDistricts: ["Dharwad", "Belagavi", "Gadag", "Bagalkot", "Raichur"],
    brand: "KSSCL",
    supplier: "Karnataka State Seeds Corporation",
    image: "https://5.imimg.com/data5/SELLER/Default/2022/12/VV/HD/BV/57033069/whatsapp-image-2022-12-19-at-10-43-46-am-500x500.jpeg",
    pricePerKg: 110,
    germinationRate: "80-85%",
    duration: "95-100 days",
    specialFeatures: [
      "Bunch type, early maturing",
      "High pod and kernel yield",
      "Suitable for Kharif and summer",
      "High oil content"
    ],
    contact: "0836-2447788",
    rating: 4.3
  },

  // 3) Rashi – Cotton hybrid (keep as you had, refine text)
  {
    varietyName: "Rashi",
    varietyNameKannada: "ರಾಶಿ",
    cropName: "Cotton",
    type: "Hybrid",
    suitableRegions: ["North Karnataka"],
    suitableDistricts: ["Dharwad", "Belagavi", "Raichur", "Kalaburagi"],
    brand: "KSSCL",
    supplier: "https://th.bing.com/th/id/OIP.MEJyiSKuosVX33USTnVg_wHaET?w=287&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    pricePerKg: 950,
    germinationRate: "75-80%",
    duration: "160-170 days",
    specialFeatures: [
      "Long staple lint",
      "High yield potential under irrigated conditions",
      "Suitable for North Karnataka cotton belt"
    ],
    contact: "0836-2447788",
    rating: 4.6
  },

  // 4) DH-86 – Cotton
  {
    varietyName: "DH-86",
    varietyNameKannada: "ಡಿ ಎಚ್-೮೬",
    cropName: "Cotton",
    type: "Disease Resistant",
    suitableRegions: ["North Karnataka"],
    suitableDistricts: ["Dharwad", "Belagavi", "Gadag"],
    brand: "UAS Dharwad",
    supplier: "University of Agricultural Sciences, Dharwad",
    image: "https://tse1.explicit.bing.net/th/id/OIP.U52dY49q8h9dZYOPFj4XyAHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3",
    pricePerKg: 850,
    germinationRate: "78-82%",
    duration: "155-165 days",
    specialFeatures: [
      "Resistance/tolerance to wilt and foliar diseases",
      "Medium staple fibre",
      "Performs well under rainfed conditions"
    ],
    contact: "0836-2447722",
    rating: 4.4
  },

  // 5) Jaya – Paddy
  {
    varietyName: "Jaya",
    varietyNameKannada: "ಜಯ",
    cropName: "Paddy",
    type: "High Yield",
    suitableRegions: ["Irrigated tracts of Karnataka"],
    suitableDistricts: ["Shivamogga", "Raichur", "Koppal", "Mandya"],
    brand: "KSSCL",
    supplier: "Karnataka State Seeds Corporation",
    image: "https://th.bing.com/th/id/OIP.xNLEMmdqPZZs6heFt8AHJAHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    pricePerKg: 45,
    germinationRate: "90-95%",
    duration: "120-125 days",
    specialFeatures: [
      "Dwarf plant type (~80 cm)",
      "Long bold white grain",
      "High yield potential",
      "Susceptible to BPH and some pests (needs protection)"
    ],
    contact: "0824-2456789",
    rating: 4.6
  },

  // 6) Indrayani – corrected to Paddy (not sugarcane)
  {
    varietyName: "Indrayani",
    varietyNameKannada: "ಇಂದ್ರಾಯಣಿ",
    cropName: "Paddy",
    type: "Traditional",
    suitableRegions: ["Western Maharashtra", "Bordering North Karnataka (irrigated)"],
    suitableDistricts: ["Belagavi", "Kolhapur region (MH)", "Sangli region (MH)"],
    brand: "State Agriculture Universities / Private",
    supplier: "Regional seed agencies",
    image: "https://gonefarmers.com/cdn/shop/files/image_0b34ce7f-de47-488d-84e4-b91a3542fc8a_1024x1024@2x.jpg?v=1685078538",
    pricePerKg: 50,
    germinationRate: "85-90%",
    duration: "120-130 days",
    specialFeatures: [
      "Highly aromatic, soft and slightly sticky cooked rice",
      "Popular table rice in Western Maharashtra",
      "Can be grown in similar irrigated tracts of North Karnataka"
    ],
    contact: "Local agriculture department",
    rating: 4.7
  },

  // 7) K-65 – Ragi (used in some states; kept as finger millet)
  {
    varietyName: "K-65",
    varietyNameKannada: "ಕೆ-೬೫",
    cropName: "Ragi (Finger millet)",
    type: "Traditional",
    suitableRegions: ["Southern Karnataka", "parts of North India"],
    suitableDistricts: ["Bengaluru Rural", "Kolar", "Tumakuru", "Mandya"],
    brand: "UAS Bengaluru / State varieties",
    supplier: "Agriculture universities / seed agencies",
    image: "https://th.bing.com/th/id/R.535232b3d939b6407fca94454749cf02?rik=nmeEqalpu4QFJA&pid=ImgRaw&r=0",
    pricePerKg: 60,
    germinationRate: "80-85%",
    duration: "105-110 days (approx.)",
    specialFeatures: [
      "Known for good grain quality and calcium content",
      "Performs well in red soils under rainfed conditions"
    ],
    contact: "080-23330153",
    rating: 4.5
  },

  // 8) Byadagi Dabbi – famous Karnataka chilli
  {
    varietyName: "Byadagi Dabbi",
    varietyNameKannada: "ಬ್ಯಾಡಗಿ ಡಬ್ಬಿ",
    cropName: "Chilli",
    type: "Traditional",
    suitableRegions: ["All Karnataka (especially Haveri belt)"],
    suitableDistricts: ["Haveri", "Dharwad", "Ballari", "Koppal"],
    brand: "IIHR / Local",
    supplier: "Indian Institute of Horticultural Research & Seed growers",
    image: "https://tse2.mm.bing.net/th/id/OIP.2jQOCIcVvm_Ub08bCsf16wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    pricePerKg: 550,
    germinationRate: "85-90%",
    duration: "150-160 days",
    specialFeatures: [
      "Deep red colour, high oleoresin",
      "Lower pungency, excellent for masala",
      "GI-tagged chilli of Karnataka"
    ],
    contact: "080-28466420",
    rating: 4.8
  },

  // 9) KBSH-53 – Sunflower hybrid (UAS Dharwad)
  {
    varietyName: "KBSH-53",
    varietyNameKannada: "ಕೆಬಿಎಸ್‌ಎಚ್-೫೩",
    cropName: "Sunflower",
    type: "Hybrid",
    suitableRegions: ["Kalyana Karnataka", "Central & North-Eastern dry zones"],
    suitableDistricts: ["Kalaburagi", "Raichur", "Ballari", "Davanagere", "Haveri"],
    brand: "UAS Dharwad",
    supplier: "University of Agricultural Sciences, Dharwad & KSSCL",
    image: "https://wallpapercave.com/wp/wp3759899.jpg",
    pricePerKg: 200,
    germinationRate: "85-90%",
    duration: "95-100 days",
    specialFeatures: [
      "High oil content",
      "Performs well in dryland conditions",
      "Recommended hybrid for several dry zones of Karnataka"
    ],
    contact: "0836-2447722",
    rating: 4.6
  },

  // 10) MTU-1010 – Paddy
  {
    varietyName: "MTU-1010",
    varietyNameKannada: "ಎಂ ಟಿ ಯು-೧೦೧೦",
    cropName: "Paddy",
    type: "High Yield",
    suitableRegions: ["Irrigated areas of Karnataka & neighbouring states"],
    suitableDistricts: ["Raichur", "Koppal", "Shivamogga", "Mandya"],
    brand: "KSSCL",
    supplier: "Karnataka State Seeds Corporation",
    image: "https://th.bing.com/th/id/OIP._rfxjnR6thFCdQotjSXDOAHaHa?w=151&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    pricePerKg: 42,
    germinationRate: "90-95%",
    duration: "120-130 days (field range 115-130)",
    specialFeatures: [
      "Mega-variety in India, high yield",
      "Long slender grain",
      "Performs well under irrigated aerobic and flooded conditions"
    ],
    contact: "0831-2478899",
    rating: 4.5
  },

  // 11) M-35-1 – Jowar (Rabi sorghum)
  {
    varietyName: "M-35-1",
    varietyNameKannada: "ಎಂ-೩೫-೧",
    cropName: "Jowar (Rabi sorghum)",
    type: "Drought Tolerant",
    suitableRegions: ["Northern dry & central dry zones"],
    suitableDistricts: ["Belagavi", "Bagalkot", "Vijayapura", "Kalaburagi", "Raichur"],
    brand: "State variety",
    supplier: "Agriculture universities / KSSCL",
    image: "https://img1.exportersindia.com/product_images/bc-full/2020/9/7814382/jowar-seeds-1599542324-5577389.jpeg",
    pricePerKg: 55,
    germinationRate: "80-85%",
    duration: "115-120 days (post-rainy)",
    specialFeatures: [
      "Excellent grain quality for jowar roti",
      "High fodder value",
      "Dominant rabi sorghum variety in many dryland areas"
    ],
    contact: "0836-2447722",
    rating: 4.7
  },

  // 12) PR-202 (Godavari) – Ragi
  {
    varietyName: "PR-202 (Godavari)",
    varietyNameKannada: "ಗೋದಾವರಿ (ಪಿ ಆರ್-೨೦೨)",
    cropName: "Ragi (Finger millet)",
    type: "High Yield",
    suitableRegions: ["Karnataka & other finger-millet regions"],
    suitableDistricts: ["Tumakuru", "Chitradurga", "Mandya", "Kolar", "Hassan"],
    brand: "AICRP Small Millets",
    supplier: "Agriculture universities / KSSCL",
    image: "https://th.bing.com/th/id/OIP.t_ZoW_XSC-xMJ2i_V_7IAQHaHa?w=171&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    pricePerKg: 62,
    germinationRate: "85-90%",
    duration: "110-120 days",
    specialFeatures: [
      "Medium tall plants with orange-brown grains",
      "Good yield potential (about 28-30 q/ha)",
      "Suited for Kharif under rainfed conditions"
    ],
    contact: "080-23330153",
    rating: 4.8
  },

  // 13) Nithyashree (NAH-2049) – Maize hybrid
  {
    varietyName: "Nithyashree (NAH-2049)",
    varietyNameKannada: "ನಿತ್ಯಶ್ರೀ",
    cropName: "Maize",
    type: "Hybrid",
    suitableRegions: ["All Karnataka (especially northern transition zone)"],
    suitableDistricts: ["Belagavi", "Haveri", "Shivamogga", "Hassan"],
    brand: "UAS Bengaluru",
    supplier: "University of Agricultural Sciences, Bengaluru & KSSCL",
    image: "https://th.bing.com/th/id/OIP.YH158Ww0RLhKnREVCG-OiwHaFT?w=203&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    pricePerKg: 150,
    germinationRate: "90%",
    duration: "95-110 days (medium duration)",
    specialFeatures: [
      "Hybrid grown widely in northern transition zone of Karnataka",
      "High grain and fodder yield",
      "Responds well to good nitrogen management"
    ],
    contact: "0836-2447788",
    rating: 4.6
  },

  // 14) Co 86032 – Sugarcane
  {
    varietyName: "Co 86032",
    varietyNameKannada: "ಸಿ ಓ-೮೬೦೩೨",
    cropName: "Sugarcane",
    type: "High Yield",
    suitableRegions: ["Belagavi & Mandya sugarcane belts"],
    suitableDistricts: ["Belagavi", "Bagalkot", "Mandya", "Mysuru"],
    brand: "Co series (ICAR-SBI)",
    supplier: "Sugar factories, seed nurseries, KSSCL (where applicable)",
    image: "https://wallpaperbat.com/img/8614910-sugar-cane.jpg",
    pricePerKg: 28,
    germinationRate: "85-90%",
    duration: "11-12 months",
    specialFeatures: [
      "High cane yield and high sugar recovery",
      "Good ratooning ability",
      "Performs well across many soil types"
    ],
    contact: "0831-2478899",
    rating: 4.7
  },

  // 15) KDL Chilli-4 – keep as improved chilli hybrid
  {
    varietyName: "KDL Chilli-4",
    varietyNameKannada: "ಕೆಡಿಎಲ್ ಮೆಣಸಿನಕಾಯಿ-೪",
    cropName: "Chilli",
    type: "Hybrid",
    suitableRegions: ["North Karnataka"],
    suitableDistricts: ["Haveri", "Gadag", "Dharwad"],
    brand: "IIHR / Private",
    supplier: "Indian Institute of Horticultural Research / seed companies",
    image: "https://th.bing.com/th/id/OIP.rTazIbxHpWQrG_hk-q2KzQHaEo?w=216&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    pricePerKg: 480,
    germinationRate: "85%",
    duration: "130-140 days",
    specialFeatures: [
      "High pungency (good for dry chilli)",
      "Good yield under irrigated conditions",
      "Tolerance to major foliar diseases (varies by source)"
    ],
    contact: "080-28466420",
    rating: 4.5
  }
];
