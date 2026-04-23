import { GiftCategory } from "@/components/cart/CartContext";

export type Gift = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: GiftCategory;
  description: string;
  stock: number;
  discount?: number; // percentage discount (0-100)
};

export const categories: GiftCategory[] = [
  "Cakes",
  "Flowers",
  "Dolls",
  "Scarves",
  "Chocolates",
];

export const gifts: Gift[] = [
  // Cakes
  {
    id: "cake-1",
    name: "Strawberry Whisper Cake",
    price: 1450,
    image: "https://media.istockphoto.com/id/1218487059/photo/fresh-fruit-cream-cake.jpg?s=612x612&w=0&k=20&c=HeTM_oneGotZ_BMDf08dV_F05SVS589XJtOFEH7wkG0=",
    category: "Cakes",
    description:
      "Soft vanilla sponge with fresh strawberries and whipped cream.",
    stock: 15,
    discount: 10,
  },
  {
    id: "cake-2",
    name: "Midnight Velvet Chocolate",
    price: 1650,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmKccYYVotVySWM1UU_ZO2gsUfmBxnUyyLc4P7bfVnbU1gHv3GtqSuDwk&s",
    category: "Cakes",
    description: "Rich dark chocolate layers with silky ganache.",
    stock: 12,
  },
  {
    id: "cake-3",
    name: "Rose Petal Cheesecake",
    price: 1550,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1VtyKUdTmm5tHuSgUAR5ZP6miznayI916sOT890aEZ9a57bf3xcP_S0&s",
    category: "Cakes",
    description: "Creamy cheesecake finished with candied rose petals.",
    stock: 8,
  },
  {
    id: "cake-4",
    name: "Blush Celebration Cake",
    price: 1350,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmKccYYVotVySWM1UU_ZO2gsUfmBxnUyyLc4P7bfVnbU1gHv3GtqSuDwk&s",
    category: "Cakes",
    description: "Elegant pink buttercream cake for heartfelt moments.",
    stock: 20,
    discount: 15,
  },
  // Flowers
  {
    id: "flowers-1",
    name: "Elara Rose Bouquet",
    price: 950,
    image: "https://www.bullandrabbit.com.my/wp-content/uploads/2025/06/bullandrabbit_Elarabouquet_preservedsoapflower-2.jpg",
    category: "Flowers",
    description: "Twelve long-stem red roses wrapped in soft blush paper.",
    stock: 25,
  },
  {
    id: "flowers-2",
    name: "Blush Pastel Arrangement",
    price: 880,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfJ6krsJnapXpbR9Xb2R-ml9s6sG2HRiDO-LPySOOamkEkHQ8BwokYcsY&s",
    category: "Flowers",
    description: "Pastel roses and baby’s breath in a glass vase.",
    stock: 18,
    discount: 5,
  },
  {
    id: "flowers-3",
    name: "Sunset Romance Basket",
    price: 990,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyHmwbNrEOl3PIa1OdvqF9SnMGkbyxmBUO5zmWPcQY5fgVMmBM3LX274c&s",
    category: "Flowers",
    description: "Warm-toned bouquet in a woven basket.",
    stock: 10,
  },
  {
    id: "flowers-4",
    name: "Minimalist White Roses",
    price: 820,
    image: "https://i.pinimg.com/736x/00/4c/5e/004c5e871b02cb634d043dce5998e970.jpg",
    category: "Flowers",
    description: "Nine white roses for pure, timeless love.",
    stock: 22,
  },
  // Dolls
  {
    id: "doll-1",
    name: "Classic Teddy Embrace",
    price: 620,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKp4QeVcDUc358ZMDS0jF0fK5r2NmMw3BU7ttY0wQpqrBtf8Cgvwtx7QXFw&s",
    category: "Dolls",
    description: "Soft beige teddy with a tiny heart ribbon.",
    stock: 30,
  },
  {
    id: "doll-2",
    name: "Blush Bunny Cuddle",
    price: 580,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs0Aqgq8dzOFKZdCFv8GekA4Ycwq3HJOfON5gTUr_H1uUWEPAr06XZExA&s",
    category: "Dolls",
    description: "Pastel pink bunny doll with floppy ears.",
    stock: 28,
    discount: 20,
  },
  
  
  // Scarves
  {
    id: "scarf-1",
    name: "Rose Silk Scarf",
    price: 730,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fPCK2rlzxbABWssPl6w9XYpgF5ITN-iUP-Y6LAYgQ6vCrMom3K5cOPk&s",
    category: "Scarves",
    description: "Lightweight silk scarf with subtle rose print.",
    stock: 20,
  },
  {
    id: "scarf-2",
    name: "Blush Cashmere Touch",
    price: 820,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSdmp1ZWM0ZABRprtgLk54cJpfcq8cQ7wPXKfpgLIG9gEUVIyuNvBDAlw&s",
    category: "Scarves",
    description: "Soft cashmere-feel scarf in pastel pink.",
    stock: 16,
  },
  {
    id: "scarf-3",
    name: "Night Sky Wrap",
    price: 790,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj2Z9K9VRWjC2kUzVmtbsxVr7lpVuD0KlOTF49rrRhDBep9JaWVp85F88&s",
    category: "Scarves",
    description: "Deep navy scarf with tiny star details.",
    stock: 14,
    discount: 10,
  },
  
  // Chocolates
  
  {
    id: "choco-2",
    name: "Dark Romance Truffles",
    price: 720,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTikMyeT99m8tbn658_99NFsvNN0Uvo88_1zQ&s",
    category: "Chocolates",
    description: "Bittersweet dark chocolate truffles.",
    stock: 25,
  },
  {
    id: "choco-3",
    name: "Strawberry Filled Hearts",
    price: 650,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbf0Fr4Dcrha8EvzAA06yC5BkQ1XqfKq81Sw&s",
    category: "Chocolates",
    description: "Heart-shaped chocolates with strawberry cream.",
    stock: 30,
  },
  
];

export function getGiftsByCategory(category: GiftCategory): Gift[] {
  return gifts.filter((gift) => gift.category === category);
}

export type { GiftCategory };
