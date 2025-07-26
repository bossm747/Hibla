import { db } from "./db";
import { 
  categories, 
  products, 
  customers, 
  suppliers,
  shopSettings 
} from "@shared/schema";

async function seedEcommerce() {
  console.log("🌱 Seeding e-commerce data...");

  try {
    // Create demo customer
    await db.insert(customers).values({
      id: "demo-customer-1",
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "+63 917 123 4567",
      password: "hashedpassword123", // In real app, this would be properly hashed
      shippingAddress: "123 Rizal Street, Makati City",
      billingAddress: "123 Rizal Street, Makati City",
      city: "Makati",
      province: "Metro Manila",
      postalCode: "1200",
      emailVerified: true,
    }).onConflictDoNothing();

    // Create categories
    const categoryData = [
      {
        id: "cat-human",
        name: "Human Hair Extensions",
        slug: "human-hair",
        description: "Premium quality human hair extensions",
        displayOrder: 1,
      },
      {
        id: "cat-korean-hd",
        name: "Korean HD Lace",
        slug: "korean-hd-lace",
        description: "Korean HD lace hair extensions",
        displayOrder: 2,
      },
      {
        id: "cat-european-hd",
        name: "European HD Lace",
        slug: "european-hd-lace",
        description: "European HD lace hair extensions",
        displayOrder: 3,
      },
    ];

    // Insert categories one by one to ensure they're created before products reference them
    for (const category of categoryData) {
      await db.insert(categories).values(category).onConflictDoNothing();
    }

    // Create suppliers
    await db.insert(suppliers).values([
      {
        id: "supplier-1",
        name: "Premium Hair Supplier",
        contactPerson: "John Doe",
        email: "supplier@example.com",
        phone: "+63 917 000 0000",
        address: "Manila, Philippines",
      }
    ]).onConflictDoNothing();

    // Create products
    const productData = [
      {
        name: "Single Drawn Straight Hair 18\"",
        description: "Premium single drawn straight hair extensions, perfect for everyday styling.",
        categoryId: "cat-human",
        hairType: "human",
        texture: "straight",
        length: 18,
        color: "Natural Black",
        weight: "100g",
        sku: "SD-ST-18-BK",
        price: "2850.00",
        compareAtPrice: "3200.00",
        costPrice: "1500.00",
        currentStock: 25,
        lowStockThreshold: 5,
        supplierId: "supplier-1",
        images: ["/attached_assets/IMG_5403_1753520376490.jpeg"],
        featuredImage: "/attached_assets/IMG_5403_1753520376490.jpeg",
        tags: ["straight", "natural", "single-drawn"],
        features: ["100% Human Hair", "Heat Resistant", "Natural Look", "Long Lasting"],
        careInstructions: "Wash with sulfate-free shampoo, air dry, and use heat protectant.",
        isFeatured: true,
        isActive: true,
      },
      {
        name: "Double Drawn Curly Hair 20\"",
        description: "Luxurious double drawn curly hair extensions for voluminous styles.",
        categoryId: "cat-human",
        hairType: "human",
        texture: "curly",
        length: 20,
        color: "Dark Brown",
        weight: "120g",
        sku: "DD-CR-20-DB",
        price: "3850.00",
        compareAtPrice: "4500.00",
        costPrice: "2200.00",
        currentStock: 18,
        lowStockThreshold: 5,
        supplierId: "supplier-1",
        images: ["/attached_assets/IMG_5404_1753520376490.jpeg"],
        featuredImage: "/attached_assets/IMG_5404_1753520376490.jpeg",
        tags: ["curly", "double-drawn", "voluminous"],
        features: ["100% Human Hair", "Double Drawn Quality", "Natural Curl Pattern", "Long Lasting"],
        careInstructions: "Use curl-enhancing products, avoid excessive heat, gentle detangling.",
        isFeatured: true,
        isActive: true,
      },
      {
        name: "Korean HD Lace Closure 4x4\"",
        description: "High-definition Korean lace closure for seamless natural hairline.",
        categoryId: "cat-korean-hd",
        hairType: "human",
        texture: "straight",
        length: 14,
        color: "Natural Black",
        weight: "80g",
        sku: "KHD-CL-4X4-BK",
        price: "4250.00",
        compareAtPrice: "5000.00",
        costPrice: "2500.00",
        currentStock: 12,
        lowStockThreshold: 3,
        supplierId: "supplier-1",
        images: ["/attached_assets/IMG_5405_1753520376490.jpeg"],
        featuredImage: "/attached_assets/IMG_5405_1753520376490.jpeg",
        tags: ["korean", "hd-lace", "closure", "natural"],
        features: ["HD Lace", "Pre-Plucked Hairline", "Bleached Knots", "Natural Scalp Appearance"],
        careInstructions: "Handle with care, use lace-safe products, avoid excessive manipulation.",
        isFeatured: true,
        isActive: true,
      },
      {
        name: "European HD Lace Frontal 13x4\"",
        description: "Premium European HD lace frontal for complete hairline coverage.",
        categoryId: "cat-european-hd",
        hairType: "human",
        texture: "wavy",
        length: 16,
        color: "Honey Blonde",
        weight: "100g",
        sku: "EHD-FR-13X4-HB",
        price: "6850.00",
        compareAtPrice: "8000.00",
        costPrice: "4000.00",
        currentStock: 8,
        lowStockThreshold: 2,
        supplierId: "supplier-1",
        images: ["/attached_assets/IMG_5386_1753506444343.png"],
        featuredImage: "/attached_assets/IMG_5386_1753506444343.png",
        tags: ["european", "hd-lace", "frontal", "blonde"],
        features: ["Premium European Hair", "HD Lace", "13x4 Coverage", "Natural Density"],
        careInstructions: "Professional installation recommended, use premium hair care products.",
        isFeatured: true,
        isActive: true,
      },
      {
        name: "Premium Brazilian Weave 16\"",
        description: "Luxurious Brazilian human hair weave with natural texture.",
        categoryId: "cat-human",
        hairType: "human",
        texture: "wavy",
        length: 16,
        color: "Natural Brown",
        weight: "110g",
        sku: "BR-WV-16-NB",
        price: "3250.00",
        compareAtPrice: "3800.00",
        costPrice: "1800.00",
        currentStock: 20,
        lowStockThreshold: 5,
        supplierId: "supplier-1",
        images: ["/attached_assets/IMG_5389_1753506444343.png"],
        featuredImage: "/attached_assets/IMG_5389_1753506444343.png",
        tags: ["brazilian", "weave", "wavy", "premium"],
        features: ["100% Brazilian Hair", "Natural Wave Pattern", "Soft Texture", "Durable"],
        careInstructions: "Use moisturizing products, avoid excessive heat, regular conditioning.",
        isFeatured: true,
        isActive: true,
      },
      {
        name: "Peruvian Straight Bundle 20\"",
        description: "High-quality Peruvian straight hair bundle for sleek styles.",
        categoryId: "cat-human",
        hairType: "human",
        texture: "straight",
        length: 20,
        color: "Natural Black",
        weight: "115g",
        sku: "PE-ST-20-BK",
        price: "2950.00",
        compareAtPrice: "3400.00",
        costPrice: "1650.00",
        currentStock: 15,
        lowStockThreshold: 4,
        supplierId: "supplier-1",
        images: ["/attached_assets/IMG_5390_1753506444343.png"],
        featuredImage: "/attached_assets/IMG_5390_1753506444343.png",
        tags: ["peruvian", "straight", "bundle", "sleek"],
        features: ["100% Peruvian Hair", "Silky Straight", "Natural Shine", "Tangle-Free"],
        careInstructions: "Regular washing with gentle shampoo, use heat protectant.",
        isFeatured: true,
        isActive: true,
      },
      {
        name: "Malaysian Curly Hair 18\"",
        description: "Beautiful Malaysian curly hair with defined curl pattern.",
        categoryId: "cat-human",
        hairType: "human",
        texture: "curly",
        length: 18,
        color: "Chocolate Brown",
        weight: "105g",
        sku: "MY-CR-18-CB",
        price: "3450.00",
        compareAtPrice: "4000.00",
        costPrice: "1950.00",
        currentStock: 12,
        lowStockThreshold: 3,
        supplierId: "supplier-1",
        images: ["/attached_assets/IMG_5391_1753506444343.png"],
        featuredImage: "/attached_assets/IMG_5391_1753506444343.png",
        tags: ["malaysian", "curly", "defined", "chocolate"],
        features: ["100% Malaysian Hair", "Defined Curls", "Natural Volume", "Long-Lasting"],
        careInstructions: "Use curl cream, air dry when possible, gentle detangling.",
        isFeatured: true,
        isActive: true,
      },
      {
        name: "Indian Remy Hair 22\"",
        description: "Premium Indian Remy hair with cuticles intact for maximum durability.",
        categoryId: "cat-human",
        hairType: "human",
        texture: "straight",
        length: 22,
        color: "Dark Brown",
        weight: "125g",
        sku: "IN-RM-22-DB",
        price: "4150.00",
        compareAtPrice: "4800.00",
        costPrice: "2300.00",
        currentStock: 10,
        lowStockThreshold: 2,
        supplierId: "supplier-1",
        images: ["/attached_assets/IMG_5392_1753506444343.png"],
        featuredImage: "/attached_assets/IMG_5392_1753506444343.png",
        tags: ["indian", "remy", "cuticles", "premium"],
        features: ["100% Remy Hair", "Cuticles Intact", "Natural Direction", "Exceptional Quality"],
        careInstructions: "Professional care recommended, premium products only.",
        isFeatured: true,
        isActive: true,
      }
    ];

    // Insert products one by one to ensure proper handling
    for (const product of productData) {
      await db.insert(products).values(product).onConflictDoNothing();
    }

    // Create shop settings
    await db.insert(shopSettings).values({
      shopEmail: "info@hiblafilipinohair.com",
      shopPhone: "+63 917 123 HAIR",
      shopAddress: "Manila, Philippines",
      currency: "PHP",
      logoUrl: "/logo.png",
      socialLinks: {
        facebook: "https://facebook.com/hiblafilipinohair",
        instagram: "https://instagram.com/hibla.filipinohumanhair",
        tiktok: "https://tiktok.com/@hiblafilipinohair"
      }
    }).onConflictDoNothing();

    console.log("✅ E-commerce data seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding e-commerce data:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedEcommerce()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedEcommerce };