import { faker } from '@faker-js/faker';
import { User, Product, Room, RoomMember, RoomActivity } from '../types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b950?w=150&h=150&fit=crop&crop=face',
  myntraId: 'MYNTRA123',
};

const categories = [
  'Women Kurtas', 'Men Shirts', 'Kids Wear', 'Footwear', 'Accessories',
  'Bags', 'Sunglasses', 'Watches', 'Jewelry', 'Beauty', 'Swimwear',
  'Sportswear', 'Formal Wear', 'Casual Wear', 'Ethnic Wear'
];

const brands = [
  'Roadster', 'HERE&NOW', 'Libas', 'Sangria', 'W', 'Fabindia',
  'Mango', 'H&M', 'Zara', 'Nike', 'Adidas', 'Puma', 'Levis',
  'Van Heusen', 'Arrow', 'Peter England'
];

// Product image URLs organized by category for better variety
const productImages = {
  'Women Kurtas': [
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571513720993-4d1a0b0b5b5b?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&q=80',
  ],
  'Men Shirts': [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a3ef?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=400&h=600&fit=crop',
  ],
  'Kids Wear': [
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503944583220-79d8926adca1?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503944583220-79d8926adca1?w=400&h=600&fit=crop&q=80',
  ],
  'Footwear': [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop&q=80',
  ],
  'Accessories': [
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=600&fit=crop&q=80',
  ],
  'Bags': [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop&q=80',
  ],
  'Sunglasses': [
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1572635196234-14e3d114f0ec?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1572635196234-14e3d114f0ec?w=400&h=600&fit=crop&q=80',
  ],
  'Watches': [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1524592094714-0f0654e20315?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524592094714-0f0654e20315?w=400&h=600&fit=crop&q=80',
  ],
  'Jewelry': [
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=600&fit=crop&q=80',
  ],
  'Beauty': [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=600&fit=crop&q=80',
  ],
  'Swimwear': [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&q=80',
  ],
  'Sportswear': [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&q=80',
  ],
  'Formal Wear': [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a3ef?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a3ef?w=400&h=600&fit=crop&q=80',
  ],
  'Casual Wear': [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&q=80',
  ],
  'Ethnic Wear': [
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571513720993-4d1a0b0b5b5b?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&q=80',
  ],
};

export const generateMockProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, index) => {
    const category = faker.helpers.arrayElement(categories);
    const categoryImages = productImages[category as keyof typeof productImages] || productImages['Casual Wear'];
    
    return {
      id: `product-${index + 1}`,
      sku: `SKU${faker.string.alphanumeric(8).toUpperCase()}`,
      title: faker.commerce.productName(),
      brand: faker.helpers.arrayElement(brands),
      category,
      price: parseInt(faker.commerce.price({ min: 500, max: 8000 })),
      originalPrice: parseInt(faker.commerce.price({ min: 800, max: 12000 })),
      images: faker.helpers.arrayElements(categoryImages, { min: 2, max: 4 }),
      description: faker.commerce.productDescription(),
      rating: parseFloat(faker.number.float({ min: 3.5, max: 5.0 }).toFixed(1)),
      reviews: faker.number.int({ min: 10, max: 2500 }),
      sizes: faker.helpers.arrayElements(['XS', 'S', 'M', 'L', 'XL', 'XXL'], { min: 3, max: 6 }),
      colors: faker.helpers.arrayElements(['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink'], { min: 2, max: 4 }),
    };
  });
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
