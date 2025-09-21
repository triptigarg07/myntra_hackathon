export interface TripDestination {
  name: string;
  type: string;
  climate: string;
  image: string;
  description: string;
  packingList: {
    category: string;
    items: string[];
  }[];
  recommendedProducts: {
    title: string;
    category: string;
    image: string;
    price: number;
    description: string;
  }[];
}

export const tripDestinations: Record<string, TripDestination> = {
  goa: {
    name: 'Goa',
    type: 'Beach & Leisure',
    climate: 'Tropical - Hot & Humid',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sun, sand, and sea! Perfect for beach activities, water sports, and vibrant nightlife.',
    packingList: [
      {
        category: 'Beachwear',
        items: [
          'Swimwear/Bikinis',
          'Beach cover-ups',
          'Sarongs/Pareos',
          'Flip-flops',
          'Beach hat',
          'Sunglasses'
        ]
      },
      {
        category: 'Casual Wear',
        items: [
          'Cotton t-shirts',
          'Tank tops',
          'Shorts',
          'Sundresses',
          'Light cotton pants',
          'Comfortable sandals'
        ]
      },
      {
        category: 'Evening Wear',
        items: [
          'Casual dresses',
          'Linen shirts',
          'Chinos',
          'Comfortable walking shoes',
          'Light jacket for AC'
        ]
      },
      {
        category: 'Essentials',
        items: [
          'Sunscreen SPF 50+',
          'After-sun lotion',
          'Waterproof phone case',
          'Beach bag',
          'Quick-dry towel',
          'Insect repellent'
        ]
      }
    ],
    recommendedProducts: [
      {
        title: 'Floral Print Bikini Set',
        category: 'Swimwear',
        image: 'https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 1299,
        description: 'Perfect for Goa beaches with UV protection'
      },
      {
        title: 'Cotton Beach Cover-up',
        category: 'Beachwear',
        image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 899,
        description: 'Light and breezy for beach walks'
      },
      {
        title: 'Tropical Print Sundress',
        category: 'Dresses',
        image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 1599,
        description: 'Perfect for Goa evenings and beach cafes'
      },
      {
        title: 'Linen Beach Shirt',
        category: 'Men Shirts',
        image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 1199,
        description: 'Breathable linen for hot Goa weather'
      }
    ]
  },
  mumbai: {
    name: 'Mumbai',
    type: 'Urban & Business',
    climate: 'Tropical - Hot & Humid with Monsoons',
    image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'The city that never sleeps! Business meetings, street food, and Bollywood glamour.',
    packingList: [
      {
        category: 'Business Wear',
        items: [
          'Formal shirts',
          'Blazers',
          'Trousers',
          'Business dresses',
          'Formal shoes',
          'Belt and accessories'
        ]
      },
      {
        category: 'Casual Wear',
        items: [
          'Cotton kurtas',
          'Jeans',
          'T-shirts',
          'Casual dresses',
          'Comfortable walking shoes',
          'Light cardigan'
        ]
      },
      {
        category: 'Monsoon Gear',
        items: [
          'Umbrella',
          'Raincoat/Poncho',
          'Waterproof shoes',
          'Quick-dry clothes',
          'Plastic bags for electronics'
        ]
      },
      {
        category: 'Essentials',
        items: [
          'Comfortable backpack',
          'Power bank',
          'Hand sanitizer',
          'Face masks',
          'Tissues',
          'Local transport card'
        ]
      }
    ],
    recommendedProducts: [
      {
        title: 'Formal Cotton Shirt',
        category: 'Men Shirts',
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 1499,
        description: 'Perfect for Mumbai business meetings'
      },
      {
        title: 'Printed Cotton Kurta',
        category: 'Women Kurtas',
        image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 1299,
        description: 'Comfortable for Mumbai street exploration'
      },
      {
        title: 'Waterproof Sneakers',
        category: 'Footwear',
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 2499,
        description: 'Essential for Mumbai monsoons'
      },
      {
        title: 'Compact Travel Umbrella',
        category: 'Accessories',
        image: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 599,
        description: 'Must-have for Mumbai rains'
      }
    ]
  },
  darjeeling: {
    name: 'Darjeeling',
    type: 'Hill Station & Nature',
    climate: 'Temperate - Cool to Cold',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Queen of Hills! Tea gardens, mountain views, and cool weather perfect for nature lovers.',
    packingList: [
      {
        category: 'Warm Clothing',
        items: [
          'Woolen sweaters',
          'Jackets/Coats',
          'Thermal wear',
          'Warm socks',
          'Gloves',
          'Woolen cap/Beanie'
        ]
      },
      {
        category: 'Layering Essentials',
        items: [
          'Long-sleeve shirts',
          'Cardigans',
          'Hoodies',
          'Scarves',
          'Shawls',
          'Light fleece'
        ]
      },
      {
        category: 'Footwear',
        items: [
          'Trekking shoes',
          'Warm boots',
          'Thick socks',
          'Indoor slippers',
          'Waterproof shoes'
        ]
      },
      {
        category: 'Essentials',
        items: [
          'Moisturizer',
          'Lip balm',
          'Sunscreen (high altitude)',
          'Camera for scenic views',
          'Thermos flask',
          'Hand warmers'
        ]
      }
    ],
    recommendedProducts: [
      {
        title: 'Woolen Cardigan',
        category: 'Sweaters',
        image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 1899,
        description: 'Perfect for Darjeeling\'s cool evenings'
      },
      {
        title: 'Trekking Jacket',
        category: 'Jackets',
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 2999,
        description: 'Windproof and warm for mountain weather'
      },
      {
        title: 'Thermal Wear Set',
        category: 'Innerwear',
        image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 1199,
        description: 'Essential base layer for cold Darjeeling nights'
      },
      {
        title: 'Hiking Boots',
        category: 'Footwear',
        image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 3499,
        description: 'Perfect for Darjeeling tea garden walks'
      }
    ]
  }
};

export const getDestinationRecommendations = (destination: string): TripDestination | null => {
  const key = destination.toLowerCase();
  return tripDestinations[key] || null;
};

export const getAllDestinations = (): TripDestination[] => {
  return Object.values(tripDestinations);
};