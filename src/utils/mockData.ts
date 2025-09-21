import { faker } from '@faker-js/faker';
import { User, Product, Room, RoomMember, RoomActivity } from '../types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b950?w=150&h=150&fit=crop&crop=face',
  myntraId: 'MYNTRA123',
};

// Hardcoded real products with proper images
const hardcodedProducts: Omit<Product, 'id'>[] = [
  // Beach/Summer Clothing
  {
    sku: 'WK001',
    title: 'Floral Print Maxi Dress',
    brand: 'W',
    category: 'Women Dresses',
    price: 1299,
    originalPrice: 2599,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop'
    ],
    description: 'Beautiful floral print maxi dress perfect for beach vacations and summer outings',
    rating: 4.2,
    reviews: 186,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Pink', 'White']
  },
  {
    sku: 'MS001',
    title: 'Cotton Beach Shirt',
    brand: 'Roadster',
    category: 'Men Shirts',
    price: 899,
    originalPrice: 1499,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=600&fit=crop'
    ],
    description: 'Lightweight cotton shirt ideal for beach walks and casual summer days',
    rating: 4.1,
    reviews: 156,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Khaki']
  },
  {
    sku: 'SW001',
    title: 'Tropical Print Bikini Set',
    brand: 'Zivame',
    category: 'Swimwear',
    price: 1699,
    originalPrice: 2299,
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop'
    ],
    description: 'Stylish tropical print bikini set with UV protection for beach activities',
    rating: 4.5,
    reviews: 89,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Tropical Print', 'Navy Blue']
  },
  {
    sku: 'AC001',
    title: 'Woven Straw Sun Hat',
    brand: 'Accessorize',
    category: 'Accessories',
    price: 799,
    originalPrice: 1299,
    images: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506629905607-d03b5e4dd2c6?w=400&h=600&fit=crop'
    ],
    description: 'Wide-brim straw hat perfect for sun protection during beach holidays',
    rating: 4.3,
    reviews: 67,
    sizes: ['One Size'],
    colors: ['Natural', 'Brown']
  },

  // Winter/Mountain Clothing
  {
    sku: 'WJ001',
    title: 'Wool Blend Cardigan',
    brand: 'H&M',
    category: 'Women Sweaters',
    price: 2199,
    originalPrice: 3299,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559563458-527698bf5295?w=400&h=600&fit=crop'
    ],
    description: 'Cozy wool blend cardigan perfect for hill stations and cool weather',
    rating: 4.4,
    reviews: 134,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Beige', 'Navy']
  },
  {
    sku: 'MJ001',
    title: 'Puffer Jacket',
    brand: 'The North Face',
    category: 'Men Jackets',
    price: 4999,
    originalPrice: 7499,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop'
    ],
    description: 'Warm puffer jacket ideal for mountain trips and cold weather adventures',
    rating: 4.7,
    reviews: 98,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Green']
  },
  {
    sku: 'FW001',
    title: 'Hiking Boots',
    brand: 'Woodland',
    category: 'Footwear',
    price: 3799,
    originalPrice: 5999,
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=600&fit=crop'
    ],
    description: 'Durable hiking boots perfect for mountain treks and outdoor adventures',
    rating: 4.6,
    reviews: 156,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['Brown', 'Black']
  },
  {
    sku: 'TH001',
    title: 'Thermal Wear Set',
    brand: 'Jockey',
    category: 'Innerwear',
    price: 1299,
    originalPrice: 1999,
    images: [
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=600&fit=crop'
    ],
    description: 'Warm thermal wear set essential for cold mountain destinations',
    rating: 4.2,
    reviews: 89,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Grey']
  },

  // Business/Formal Wear
  {
    sku: 'FB001',
    title: 'Formal Cotton Shirt',
    brand: 'Van Heusen',
    category: 'Men Shirts',
    price: 1699,
    originalPrice: 2499,
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400&h=600&fit=crop'
    ],
    description: 'Professional cotton shirt perfect for business meetings and formal occasions',
    rating: 4.5,
    reviews: 234,
    sizes: ['38', '40', '42', '44', '46'],
    colors: ['White', 'Blue', 'Pink']
  },
  {
    sku: 'WB001',
    title: 'Silk Blend Blouse',
    brand: 'W',
    category: 'Women Tops',
    price: 1899,
    originalPrice: 2799,
    images: [
      'https://images.unsplash.com/photo-1551048632-d4b43e5d6915?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop'
    ],
    description: 'Elegant silk blend blouse suitable for business and formal events',
    rating: 4.3,
    reviews: 167,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy']
  },

  // Casual/Everyday Wear
  {
    sku: 'CK001',
    title: 'Embroidered Cotton Kurta',
    brand: 'Fabindia',
    category: 'Women Kurtas',
    price: 1399,
    originalPrice: 2099,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop'
    ],
    description: 'Traditional embroidered cotton kurta perfect for cultural events and casual wear',
    rating: 4.4,
    reviews: 198,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Pink', 'Yellow']
  },
  {
    sku: 'DJ001',
    title: 'Slim Fit Denim Jeans',
    brand: 'Levis',
    category: 'Men Jeans',
    price: 2199,
    originalPrice: 3499,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551010750-6a77ab35cd5a?w=400&h=600&fit=crop'
    ],
    description: 'Classic slim fit denim jeans suitable for casual and semi-formal occasions',
    rating: 4.6,
    reviews: 456,
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black', 'Grey']
  },

  // Footwear
  {
    sku: 'CS001',
    title: 'Canvas Sneakers',
    brand: 'Converse',
    category: 'Footwear',
    price: 2799,
    originalPrice: 3999,
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608667508764-6add6073a9a4?w=400&h=600&fit=crop'
    ],
    description: 'Classic canvas sneakers perfect for casual outings and city exploration',
    rating: 4.5,
    reviews: 289,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['White', 'Black', 'Red']
  },
  {
    sku: 'FS001',
    title: 'Comfort Flip Flops',
    brand: 'Havaianas',
    category: 'Footwear',
    price: 999,
    originalPrice: 1499,
    images: [
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609340803129-5e2b65ca4eed?w=400&h=600&fit=crop'
    ],
    description: 'Comfortable flip flops ideal for beach vacations and poolside relaxation',
    rating: 4.3,
    reviews: 134,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['Blue', 'Black', 'Pink', 'White']
  },

  // Accessories
  {
    sku: 'SG001',
    title: 'Aviator Sunglasses',
    brand: 'Ray-Ban',
    category: 'Accessories',
    price: 3999,
    originalPrice: 5999,
    images: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=600&fit=crop'
    ],
    description: 'Classic aviator sunglasses with UV protection for outdoor activities',
    rating: 4.7,
    reviews: 178,
    sizes: ['One Size'],
    colors: ['Gold', 'Silver', 'Black']
  },
  {
    sku: 'BK001',
    title: 'Travel Backpack',
    brand: 'Wildcraft',
    category: 'Bags',
    price: 2499,
    originalPrice: 3999,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400&h=600&fit=crop'
    ],
    description: 'Durable travel backpack perfect for trips and outdoor adventures',
    rating: 4.4,
    reviews: 167,
    sizes: ['One Size'],
    colors: ['Black', 'Blue', 'Green']
  }
];

export const generateMockProducts = (count: number): Product[] => {
  const products = hardcodedProducts.map((product, index) => ({
    id: `product-${index + 1}`,
    ...product
  }));

  // Fill remaining slots with faker-generated products if needed
  while (products.length < count) {
    const index = products.length;
    products.push({
      id: `product-${index + 1}`,
      sku: `SKU${faker.string.alphanumeric(8).toUpperCase()}`,
      title: faker.commerce.productName(),
      brand: faker.helpers.arrayElement(['Roadster', 'HERE&NOW', 'Libas', 'Sangria', 'W', 'Fabindia']),
      category: faker.helpers.arrayElement(['Women Kurtas', 'Men Shirts', 'Kids Wear', 'Footwear', 'Accessories']),
      price: parseInt(faker.commerce.price({ min: 500, max: 8000 })),
      originalPrice: parseInt(faker.commerce.price({ min: 800, max: 12000 })),
      images: [
        `https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=600&fit=crop`,
        `https://images.unsplash.com/photo-${1500000000000 + index + 1000}?w=400&h=600&fit=crop`,
      ],
      description: faker.commerce.productDescription(),
      rating: parseFloat(faker.number.float({ min: 3.5, max: 5.0 }).toFixed(1)),
      reviews: faker.number.int({ min: 10, max: 2500 }),
      sizes: faker.helpers.arrayElements(['XS', 'S', 'M', 'L', 'XL', 'XXL'], { min: 3, max: 6 }),
      colors: faker.helpers.arrayElements(['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink'], { min: 2, max: 4 }),
    });
  }

  return products;
};

export const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `user-${index + 2}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: `https://images.unsplash.com/photo-${1500000000000 + index + 100}?w=150&h=150&fit=crop&crop=face`,
  }));
};

export const generateMockRoom = (): Room => ({
  id: `room-${faker.string.uuid()}`,
  name: `${faker.helpers.arrayElement(['Family', 'Friends', 'Cousins'])} ${faker.helpers.arrayElement(['Trip', 'Shopping', 'Wedding', 'Vacation'])}`,
  ownerId: mockUser.id,
  visibility: 'private',
  inviteCode: faker.string.alphanumeric(6).toUpperCase(),
  createdAt: new Date(),
  memberCount: faker.number.int({ min: 2, max: 8 }),
});

export const generateMockActivities = (roomId: string, products: Product[]): RoomActivity[] => {
  const users = [mockUser, ...generateMockUsers(5)];
  const actions = ['view', 'add', 'recommend', 'comment'] as const;
  
  return Array.from({ length: 20 }, (_, index) => {
    const user = faker.helpers.arrayElement(users);
    const action = faker.helpers.arrayElement(actions);
    const product = action !== 'comment' ? faker.helpers.arrayElement(products) : undefined;
    
    return {
      id: `activity-${index + 1}`,
      roomId,
      userId: user.id,
      user,
      actionType: action,
      productId: product?.id,
      product,
      message: action === 'comment' ? faker.lorem.sentence() : undefined,
      isSecret: faker.datatype.boolean({ probability: 0.2 }),
      createdAt: faker.date.recent({ days: 7 }),
    };
  });
};
