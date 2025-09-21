import { Product } from '../types';

export interface TripDestination {
  name: string;
  type: string;
  climate: string;
  image: string;
  description:string;
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
    climate: 'Tropical - Hot & Humid (25-35°C)',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop',
    description: 'Known for pristine beaches, Portuguese architecture, vibrant nightlife, and water sports. Perfect for beach lovers, adventure seekers, and those seeking relaxation by the Arabian Sea.',
    packingList: [
      {
        category: 'Beachwear',
        items: [
          'Swimwear/Bikinis (2-3 sets)',
          'Beach cover-ups and kaftans',
          'Sarongs and lightweight wraps',
          'Waterproof flip-flops',
          'Wide-brim sun hat',
          'UV protection sunglasses'
        ]
      },
      {
        category: 'Casual Day Wear',
        items: [
          'Cotton/linen t-shirts and tank tops',
          'Breathable shorts and skirts',
          'Sundresses and maxi dresses',
          'Light cotton pants',
          'Comfortable walking sandals',
          'Canvas sneakers for sightseeing'
        ]
      },
      {
        category: 'Evening & Night Out',
        items: [
          'Casual dresses for beach shacks',
          'Linen shirts and chinos',
          'Comfortable walking shoes',
          'Light jacket for AC restaurants',
          'Dressy sandals or loafers'
        ]
      },
      {
        category: 'Beach & Water Essentials',
        items: [
          'Waterproof sunscreen SPF 50+',
          'After-sun aloe vera gel',
          'Waterproof phone pouch',
          'Beach towel (quick-dry)',
          'Snorkeling gear (optional)',
          'Waterproof watch'
        ]
      },
      {
        category: 'Health & Safety',
        items: [
          'Insect repellent (strong)',
          'Anti-diarrheal medication',
          'Hand sanitizer',
          'First aid kit',
          'Oral rehydration salts',
          'Motion sickness tablets'
        ]
      }
    ],
    recommendedProducts: [
      {
        title: 'Tropical Print Bikini Set',
        category: 'Swimwear',
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=600&fit=crop',
        price: 1699,
        description: 'UV-protective bikini set perfect for Goa beaches with vibrant tropical prints'
      },
      {
        title: 'Cotton Beach Cover-up',
        category: 'Beachwear',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
        price: 999,
        description: 'Lightweight cotton kaftan ideal for beach walks and cafe visits'
      },
      {
        title: 'Linen Beach Shirt',
        category: 'Men Shirts',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop',
        price: 1299,
        description: 'Breathable linen shirt perfect for Goa\'s humid climate'
      },
      {
        title: 'Comfort Flip Flops',
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&h=600&fit=crop',
        price: 999,
        description: 'Waterproof flip-flops with excellent grip for beach and pool'
      },
      {
        title: 'Wide Brim Sun Hat',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=600&fit=crop',
        price: 799,
        description: 'Essential sun protection for Goa\'s strong UV rays'
      },
      {
        title: 'Aviator Sunglasses',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=600&fit=crop',
        price: 3999,
        description: 'High-quality UV protection sunglasses for beach activities'
      }
    ]
  },
  manali: {
    name: 'Manali',
    type: 'Hill Station & Adventure',
    climate: 'Temperate - Cool to Cold (10-25°C)',
    image: 'https://images.unsplash.com/photo-1606044842584-d7b7f0a9a4c8?w=800&h=600&fit=crop',
    description: 'Nestled in the Himalayas, famous for snow-capped peaks, adventure sports, apple orchards, and serene landscapes. Perfect for trekking, paragliding, and mountain adventures.',
    packingList: [
      {
        category: 'Warm Clothing',
        items: [
          'Heavy woolen sweaters and cardigans',
          'Insulated jackets/down jackets',
          'Thermal underwear (top and bottom)',
          'Warm socks (wool/thermal)',
          'Insulated gloves and mittens',
          'Woolen caps and ear warmers'
        ]
      },
      {
        category: 'Layering Essentials',
        items: [
          'Long-sleeve base layers',
          'Fleece jackets and hoodies',
          'Warm scarves and mufflers',
          'Waterproof outer shells',
          'Windproof jackets',
          'Merino wool shirts'
        ]
      },
      {
        category: 'Mountain Footwear',
        items: [
          'Waterproof trekking boots',
          'Warm ankle boots',
          'Thick hiking socks',
          'Indoor warm slippers',
          'Gaiters for snow protection',
          'Anti-slip shoe grips'
        ]
      },
      {
        category: 'Adventure Gear',
        items: [
          'Waterproof backpack',
          'Trekking poles',
          'Headlamp/flashlight',
          'Power bank (cold weather drains batteries)',
          'Waterproof gloves',
          'First aid kit for altitude'
        ]
      },
      {
        category: 'Cold Weather Essentials',
        items: [
          'Heavy moisturizer and lip balm',
          'Sunscreen (high altitude)',
          'Altitude sickness medication',
          'Hand and foot warmers',
          'Thermos flask',
          'Waterproof phone case'
        ]
      }
    ],
    recommendedProducts: [
      {
        title: 'Puffer Down Jacket',
        category: 'Men Jackets',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop',
        price: 4999,
        description: 'Warm down-filled jacket essential for Manali\'s cold weather'
      },
      {
        title: 'Wool Blend Cardigan',
        category: 'Women Sweaters',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
        price: 2199,
        description: 'Cozy wool cardigan perfect for layering in mountain weather'
      },
      {
        title: 'Waterproof Hiking Boots',
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=600&fit=crop',
        price: 3799,
        description: 'Essential for trekking and mountain exploration in Manali'
      },
      {
        title: 'Thermal Wear Set',
        category: 'Innerwear',
        image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&h=600&fit=crop',
        price: 1299,
        description: 'Base layer thermal clothing for extreme cold protection'
      },
      {
        title: 'Adventure Backpack',
        category: 'Bags',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop',
        price: 2499,
        description: 'Waterproof backpack perfect for mountain treks and adventures'
      },
      {
        title: 'Woolen Beanie',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=600&fit=crop',
        price: 599,
        description: 'Warm woolen cap essential for Manali\'s cold mountain air'
      }
    ]
  },
  rajasthan: {
    name: 'Rajasthan',
    type: 'Cultural & Heritage',
    climate: 'Arid - Very Hot Days, Cool Nights (20-45°C)',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop',
    description: 'Land of maharajas, featuring majestic palaces, desert safaris, vibrant culture, and rich heritage. Perfect for history enthusiasts and cultural explorers.',
    packingList: [
      {
        category: 'Desert Day Wear',
        items: [
          'Light cotton long-sleeve shirts',
          'Breathable cotton pants/trousers',
          'Loose-fitting cotton dresses',
          'Light-colored clothing to reflect heat',
          'Cotton scarves for dust protection',
          'Comfortable walking shoes'
        ]
      },
      {
        category: 'Cultural Attire',
        items: [
          'Traditional kurtas and kurtis',
          'Palazzo pants and salwar sets',
          'Bandhani dupattas and scarves',
          'Mojari footwear (traditional)',
          'Ethnic jewelry (oxidized silver)',
          'Colorful turbans or head wraps'
        ]
      },
      {
        category: 'Desert Evening Wear',
        items: [
          'Light cardigans for cool nights',
          'Warm shawls and wraps',
          'Closed-toe shoes for desert walks',
          'Long pants to protect from insects',
          'Light wool socks',
          'Warm inner layers'
        ]
      },
      {
        category: 'Sun & Dust Protection',
        items: [
          'High SPF sunscreen (50+)',
          'Large sunglasses',
          'Wide-brim hats',
          'Dust masks/bandanas',
          'Lip balm with SPF',
          'After-sun cooling gel'
        ]
      },
      {
        category: 'Desert Essentials',
        items: [
          'Large water bottles',
          'Electrolyte packets',
          'Cooling face mist',
          'Wet wipes for dust',
          'Hand sanitizer',
          'Camera with dust protection'
        ]
      }
    ],
    recommendedProducts: [
      {
        title: 'Embroidered Cotton Kurta',
        category: 'Women Kurtas',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=600&fit=crop',
        price: 1399,
        description: 'Traditional Rajasthani-style kurta perfect for cultural exploration'
      },
      {
        title: 'Cotton Palazzo Set',
        category: 'Women Ethnic',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop',
        price: 1199,
        description: 'Comfortable and breathable for Rajasthan\'s hot climate'
      },
      {
        title: 'Linen Desert Shirt',
        category: 'Men Shirts',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop',
        price: 1499,
        description: 'Light linen shirt ideal for desert heat and cultural sites'
      },
      {
        title: 'Mojari Shoes',
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=600&fit=crop',
        price: 899,
        description: 'Traditional Rajasthani footwear perfect for palace visits'
      },
      {
        title: 'Bandhani Dupatta',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=600&fit=crop',
        price: 699,
        description: 'Authentic Rajasthani tie-dye scarf for cultural immersion'
      },
      {
        title: 'Desert Sun Hat',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=600&fit=crop',
        price: 999,
        description: 'Essential protection from intense Rajasthan sun'
      }
    ]
  },
  kerala: {
    name: 'Kerala',
    type: 'Backwaters & Nature',
    climate: 'Tropical - Hot & Humid with Monsoons (22-35°C)',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop',
    description: 'God\'s Own Country featuring lush backwaters, spice plantations, Ayurvedic treatments, and serene houseboats. Perfect for nature lovers and wellness seekers.',
    packingList: [
      {
        category: 'Tropical Wear',
        items: [
          'Lightweight cotton clothing',
          'Moisture-wicking t-shirts',
          'Breathable shorts and capris',
          'Loose-fitting cotton dresses',
          'Quick-dry clothing',
          'Light cotton pants'
        ]
      },
      {
        category: 'Monsoon Gear',
        items: [
          'Waterproof rain jacket',
          'Umbrella (compact)',
          'Quick-dry clothes',
          'Waterproof sandals',
          'Plastic bags for electronics',
          'Rainproof backpack cover'
        ]
      },
      {
        category: 'Backwater Essentials',
        items: [
          'Swimwear for backwaters',
          'Water shoes/aqua socks',
          'Sun protection clothing',
          'Insect repellent clothing',
          'Light evening wear',
          'Comfortable boat shoes'
        ]
      },
      {
        category: 'Health & Wellness',
        items: [
          'Strong insect repellent',
          'Anti-malarial medication',
          'Digestive medicines',
          'Cooling powder/talc',
          'Ayurvedic oils (if interested)',
          'Mosquito nets (if camping)'
        ]
      },
      {
        category: 'Kerala Specials',
        items: [
          'Traditional Kerala saree/mundu',
          'Comfortable walking sandals',
          'Spice storage containers',
          'Waterproof camera',
          'Cash for local markets',
          'Traditional ayurvedic soap'
        ]
      }
    ],
    recommendedProducts: [
      {
        title: 'Quick-Dry Cotton Dress',
        category: 'Women Dresses',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
        price: 1299,
        description: 'Perfect for Kerala\'s humid climate and backwater cruises'
      },
      {
        title: 'Moisture-Wicking Polo',
        category: 'Men Shirts',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop',
        price: 899,
        description: 'Breathable fabric ideal for Kerala\'s tropical weather'
      },
      {
        title: 'Waterproof Sandals',
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&h=600&fit=crop',
        price: 1199,
        description: 'Essential for backwater activities and monsoon travel'
      },
      {
        title: 'Anti-Mosquito Shirt',
        category: 'Men Shirts',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop',
        price: 1599,
        description: 'Insect-repellent fabric perfect for Kerala\'s tropical environment'
      },
      {
        title: 'Rain Jacket',
        category: 'Jackets',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop',
        price: 1999,
        description: 'Lightweight waterproof protection for Kerala monsoons'
      },
      {
        title: 'Traditional Kerala Saree',
        category: 'Ethnic Wear',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=600&fit=crop',
        price: 2499,
        description: 'Beautiful traditional attire for cultural experiences'
      }
    ]
  }
};

export const getDestinationRecommendations = (destination: string): TripDestination | null => {
  const key = destination.toLowerCase();
  return tripDestinations[key] || null;
};

export const generateRecommendationsFromWeather = (weatherData: any, allProducts: Product[]): TripDestination => {
  const { name, main, weather } = weatherData;
  const temp = main.temp;
  const condition = weather[0].main;
  const conditionDesc = weather[0].description;

  let climateType = 'Temperate';
  const packingList: TripDestination['packingList'] = [];
  const recommendedProductCategories: string[] = [];

  if (temp > 25) {
    climateType = `Hot (${temp.toFixed(0)}°C)`;
    packingList.push({ category: 'Hot Weather Wear', items: ['Shorts & T-shirts', 'Sundresses', 'Sandals', 'Sun Hat', 'Sunglasses'] });
    recommendedProductCategories.push('Women Dresses', 'Men Shirts', 'Swimwear', 'Footwear', 'Accessories');
  } else if (temp < 10) {
    climateType = `Cold (${temp.toFixed(0)}°C)`;
    packingList.push({ category: 'Cold Weather Wear', items: ['Heavy Jacket', 'Sweaters', 'Thermals', 'Boots', 'Beanie & Gloves'] });
    recommendedProductCategories.push('Men Jackets', 'Women Sweaters', 'Innerwear', 'Footwear');
  } else {
    climateType = `Moderate (${temp.toFixed(0)}°C)`;
    packingList.push({ category: 'Layering Essentials', items: ['Light Jacket', 'Long-sleeve shirts', 'Jeans', 'Sneakers'] });
    recommendedProductCategories.push('Men Jeans', 'Women Tops', 'Footwear', 'Men Jackets');
  }

  if (condition === 'Rain') {
    packingList.push({ category: 'Rain Gear', items: ['Waterproof Jacket', 'Umbrella', 'Waterproof Shoes'] });
    recommendedProductCategories.push('Men Jackets'); // Assuming rain jackets are in this category
  }

  packingList.push({ category: 'Basics', items: ['Personal toiletries', 'Medications', 'Chargers', 'ID & Documents'] });

  const recommendedProducts = allProducts
    .filter(p => recommendedProductCategories.some(cat => p.category === cat))
    .sort(() => 0.5 - Math.random()) // Randomize selection
    .slice(0, 6)
    .map(p => ({
      title: p.title,
      category: p.category,
      image: p.images[0],
      price: p.price,
      description: p.description.substring(0, 80) + '...',
    }));

  return {
    name: name,
    type: `Custom Trip - ${condition}`,
    climate: climateType,
    image: `https://source.unsplash.com/800x600/?${name.split(' ')[0]},city`,
    description: `A trip to ${name} with current weather: ${temp.toFixed(0)}°C and ${conditionDesc}. Here is a suggested packing list and curated products based on these conditions.`,
    packingList,
    recommendedProducts,
  };
};

export const getAllDestinations = (): TripDestination[] => {
  return Object.values(tripDestinations);
};
