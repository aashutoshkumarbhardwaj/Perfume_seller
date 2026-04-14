import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { connectDB } from "../config/db.js";
import Product from "../models/Product.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const products = [
  {
    name: "Oud Royale",
    description: "A rich, smoky oud blended with rose and amber. An opulent scent fit for royalty.",
    price: 129.99,
    category: "Oriental",
    sizes: ["30ml", "50ml", "100ml"],
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600",
    ],
  },
  {
    name: "Velvet Rose",
    description: "Delicate Bulgarian rose petals wrapped in soft musk and sandalwood.",
    price: 89.99,
    category: "Floral",
    sizes: ["30ml", "50ml"],
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600",
    ],
  },
  {
    name: "Midnight Noir",
    description: "Dark bergamot and black pepper open into a heart of leather and vetiver.",
    price: 109.99,
    category: "Woody",
    sizes: ["50ml", "100ml"],
    stock: 10,
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600",
    ],
  },
  {
    name: "Citrus Bloom",
    description: "A fresh burst of Sicilian lemon and neroli with a warm cedarwood base.",
    price: 74.99,
    category: "Fresh",
    sizes: ["30ml", "50ml", "100ml"],
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600",
    ],
  },
  {
    name: "Amber Elixir",
    description: "Warm vanilla and golden amber fused with hints of spiced cardamom.",
    price: 99.99,
    category: "Oriental",
    sizes: ["50ml", "100ml"],
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1600612253971-57b7f5f8e8a0?w=600",
      "https://images.unsplash.com/photo-1547887538-047f814d0d9a?w=600",
    ],
  },
];

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("✅ Seeded 5 perfume products");
  mongoose.connection.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
