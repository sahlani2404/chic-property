export type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  images: string[]; // satu atau banyak foto — ditampilkan sebagai slide di pop-up
  bedrooms: number;
  bathrooms: number;
  area: number; // m²
  type: string;
  description: string;
  highlights: string[];
};

// Auto-load semua gambar dari folder assets

const terraRumaImages = Object.values(
  import.meta.glob("../assets/Terra Ruma/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  })
) as string[];

const nebulaParkImages = Object.values(
  import.meta.glob("../assets/Nebula Park/*", {
    eager: true,
    import: "default",
  })
) as string[];
console.log("Nebula Images:", nebulaParkImages.length);
console.log(nebulaParkImages);

const kaiaEstateImages = Object.values(
  import.meta.glob("../assets/KAIA ESTATE/*", {
    eager: true,
    import: "default",
  })
) as string[];
console.log("KAIA:", kaiaEstateImages.length);
console.log(kaiaEstateImages);

const balboaEstateImages = Object.values(
  import.meta.glob("../assets/BALBOA ESTATE/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  })
) as string[];
export const defaultProperties: Property[] = [
  {
    id: "1",
    title: "Terra Ruma",
    location: "Jakarta Selatan",
    price: "Rp 12,5 M",
    images: terraRumaImages,
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    type: "Villa",
    description:
      "Hunian eksklusif di kawasan premium Jakarta Selatan dengan desain kontemporer dan sentuhan tropis. Dikelilingi taman privat, kolam renang, serta jendela floor-to-ceiling yang memaksimalkan cahaya alami.",
    highlights: [
      "Kolam Renang Privat",
      "Smart Home System",
      "Taman Tropis",
      "Garasi 3 Mobil",
    ],
  },

  {
    id: "3",
    title: "Nebula Park",
    location: "Jakarta Pusat",
    price: "Rp 5,4 M",
    images: nebulaParkImages,
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    type: "Apartemen",
    description:
      "Unit apartemen mewah di lantai 32 dengan pemandangan skyline kota Jakarta. Akses langsung ke MRT, mall, dan pusat bisnis utama.",
    highlights: [
      "City View",
      "Concierge 24 Jam",
      "Sky Lounge",
      "Fully Furnished",
    ],
  },

  {
    id: "4",
    title: "Kaia Estate",
    location: "Jakarta Selatan",
    price: "Rp 18,2 M",
    images: kaiaEstateImages,
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    type: "Rumah",
    description:
      "Rumah keluarga megah dua lantai dengan halaman luas dan ruang keluarga yang lapang. Berada di kompleks elite dengan keamanan 24 jam.",
    highlights: [
      "Halaman 200 m²",
      "Home Theater",
      "Walk-in Closet",
      "Servant Quarter",
    ],
  },

  {
    id: "5",
    title: "Balboa Estate",
    location: "Dago Pakar, Bandung",
    price: "Rp 6,7 M",
    images: balboaEstateImages,
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    type: "Villa",
    description:
      "Villa berbalut alam pegunungan dengan udara sejuk khas Bandung Utara. Desain minimalis dengan jendela panorama menghadap lembah hijau.",
    highlights: [
      "Mountain View",
      "Fireplace",
      "Wine Cellar",
      "Roof Deck",
    ],
  },
];
