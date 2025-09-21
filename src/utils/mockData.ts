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

export const generateMockProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `product-${index + 1}`,
    sku: `SKU${faker.string.alphanumeric(8).toUpperCase()}`,
    title: faker.commerce.productName(),
    brand: faker.helpers.arrayElement(brands),
    category: faker.helpers.arrayElement(categories),
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
  }));
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
