import { faker } from '@faker-js/faker';
import { TripPlan, PackingItem, PackingList, Product } from '../types';

// Location-based packing recommendations
const locationPackingRules = {
  // Beach destinations
  'goa': {
    climate: 'hot',
    essentials: ['swimwear', 'sunscreen', 'sunglasses', 'hat', 'flip-flops', 'beach towel'],
    categories: ['Swimwear', 'Sunglasses', 'Accessories', 'Footwear'],
    avoid: ['Formal Wear', 'Watches']
  },
  'mumbai': {
    climate: 'hot',
    essentials: ['light cotton', 'umbrella', 'comfortable shoes', 'sunscreen'],
    categories: ['Casual Wear', 'Accessories', 'Footwear'],
    avoid: ['Swimwear']
  },
  'kerala': {
    climate: 'moderate',
    essentials: ['light layers', 'rain jacket', 'comfortable walking shoes', 'mosquito repellent'],
    categories: ['Casual Wear', 'Accessories', 'Footwear'],
    avoid: ['Swimwear']
  },
  'delhi': {
    climate: 'moderate',
    essentials: ['layers', 'comfortable shoes', 'sunglasses'],
    categories: ['Casual Wear', 'Formal Wear', 'Accessories', 'Footwear'],
    avoid: ['Swimwear']
  },
  'kashmir': {
    climate: 'cold',
    essentials: ['warm layers', 'jacket', 'boots', 'gloves', 'hat'],
    categories: ['Sportswear', 'Accessories', 'Footwear'],
    avoid: ['Swimwear', 'Sunglasses']
  },
  'rajasthan': {
    climate: 'hot',
    essentials: ['light cotton', 'hat', 'sunscreen', 'comfortable shoes'],
    categories: ['Ethnic Wear', 'Casual Wear', 'Accessories', 'Footwear'],
    avoid: ['Swimwear']
  }
};

// Trip type specific recommendations
const tripTypeRules = {
  'leisure': {
    categories: ['Casual Wear', 'Accessories', 'Footwear'],
    essentials: ['comfortable clothes', 'camera', 'comfortable shoes']
  },
  'business': {
    categories: ['Formal Wear', 'Accessories', 'Footwear'],
    essentials: ['formal attire', 'dress shoes', 'briefcase']
  },
  'adventure': {
    categories: ['Sportswear', 'Accessories', 'Footwear'],
    essentials: ['hiking boots', 'backpack', 'water bottle', 'first aid']
  },
  'beach': {
    categories: ['Swimwear', 'Sunglasses', 'Accessories'],
    essentials: ['swimwear', 'sunscreen', 'beach towel', 'flip-flops']
  },
  'mountain': {
    categories: ['Sportswear', 'Accessories', 'Footwear'],
    essentials: ['warm layers', 'hiking boots', 'backpack', 'water bottle']
  },
  'city': {
    categories: ['Casual Wear', 'Formal Wear', 'Accessories', 'Footwear'],
    essentials: ['comfortable walking shoes', 'city-appropriate attire']
  }
};

// Climate-based recommendations
const climateRules = {
  'hot': {
    materials: ['cotton', 'linen'],
    colors: ['light', 'white', 'pastel'],
    avoid: ['wool', 'synthetic'],
    essentials: ['sunscreen', 'hat', 'light clothing']
  },
  'cold': {
    materials: ['wool', 'fleece', 'down'],
    colors: ['dark', 'warm'],
    avoid: ['cotton', 'linen'],
    essentials: ['warm layers', 'jacket', 'gloves', 'hat']
  },
  'moderate': {
    materials: ['cotton', 'light wool'],
    colors: ['neutral', 'versatile'],
    avoid: ['heavy wool'],
    essentials: ['layers', 'versatile clothing']
  },
  'rainy': {
    materials: ['waterproof', 'quick-dry'],
    colors: ['dark', 'waterproof'],
    avoid: ['silk', 'suede'],
    essentials: ['rain jacket', 'umbrella', 'waterproof shoes']
  }
};

export const generatePackingList = (
  tripPlan: TripPlan,
  availableProducts: Product[]
): PackingList => {
  const location = tripPlan.destination.toLowerCase();
  const locationRules = locationPackingRules[location as keyof typeof locationPackingRules] || 
    locationPackingRules['mumbai'];
  
  const currentTripTypeRules = tripTypeRules[tripPlan.tripType as keyof typeof tripTypeRules] || 
    tripTypeRules['leisure'];
  
  const currentClimateRules = climateRules[tripPlan.climate as keyof typeof climateRules] || 
    climateRules['moderate'];

  // Generate packing items based on rules
  const packingItems: PackingItem[] = [];
  
  // Essential items based on location and trip type
  const essentialItems = [
    ...locationRules.essentials,
    ...currentTripTypeRules.essentials,
    ...currentClimateRules.essentials
  ];

  // Create packing items for each essential
  essentialItems.forEach((item, index) => {
    const matchingProducts = findMatchingProducts(item, availableProducts, {
      categories: [...locationRules.categories, ...currentTripTypeRules.categories],
      avoid: locationRules.avoid || []
    });

    // Always create the item, with or without a product match
    const selectedProduct = matchingProducts.length > 0 
      ? faker.helpers.arrayElement(matchingProducts)
      : undefined;

    const packingItem = {
      id: `item-${index + 1}`,
      category: getCategoryFromItem(item),
      name: item,
      description: generateItemDescription(item, tripPlan),
      quantity: calculateQuantity(item, tripPlan),
      priority: 'essential' as const,
      product: selectedProduct,
      isSelected: true,
      reason: generateReason(item, tripPlan, locationRules)
    };

    packingItems.push(packingItem);
  });

  // Add recommended items based on duration and travelers
  const recommendedItems = generateRecommendedItems(tripPlan, availableProducts, locationRules);
  packingItems.push(...recommendedItems);

  // Add optional items
  const optionalItems = generateOptionalItems(tripPlan, availableProducts, locationRules);
  packingItems.push(...optionalItems);

  // Ensure we always have at least some items
  if (packingItems.length === 0) {
    // Fallback: add some basic items
    const fallbackItems = [
      'comfortable clothes',
      'comfortable shoes',
      'toiletries',
      'phone charger',
      'travel documents'
    ];

    fallbackItems.forEach((item, index) => {
      packingItems.push({
        id: `fallback-${index + 1}`,
        category: 'Accessories',
        name: item,
        description: `Essential item for your trip to ${tripPlan.destination}`,
        quantity: 1,
        priority: 'essential' as const,
        product: undefined,
        isSelected: true,
        reason: 'Basic travel essential'
      });
    });
  }

  return {
    id: faker.string.uuid(),
    tripPlan,
    items: packingItems,
    generatedAt: new Date(),
    totalItems: packingItems.length,
    selectedItems: packingItems.filter(item => item.isSelected).length
  };
};

const findMatchingProducts = (
  item: string,
  products: Product[],
  rules: { categories: string[]; avoid: string[] }
): Product[] => {
  return products.filter(product => {
    // Check if product category matches
    const categoryMatch = rules.categories.some(cat => 
      product.category.toLowerCase().includes(cat.toLowerCase()) ||
      cat.toLowerCase().includes(product.category.toLowerCase())
    );
    
    // Check if product should be avoided
    const avoidMatch = rules.avoid.some(avoid => 
      product.category.toLowerCase().includes(avoid.toLowerCase())
    );
    
    // Check if product title/description matches item (more flexible matching)
    const itemMatch = product.title.toLowerCase().includes(item.toLowerCase()) ||
                     product.description.toLowerCase().includes(item.toLowerCase()) ||
                     product.category.toLowerCase().includes(item.toLowerCase()) ||
                     item.toLowerCase().includes(product.category.toLowerCase()) ||
                     product.brand.toLowerCase().includes(item.toLowerCase());
    
    return categoryMatch && !avoidMatch && itemMatch;
  });
};

const getCategoryFromItem = (item: string): string => {
  const categoryMap: { [key: string]: string } = {
    'swimwear': 'Swimwear',
    'sunscreen': 'Beauty',
    'sunglasses': 'Sunglasses',
    'hat': 'Accessories',
    'flip-flops': 'Footwear',
    'beach towel': 'Accessories',
    'light cotton': 'Casual Wear',
    'umbrella': 'Accessories',
    'comfortable shoes': 'Footwear',
    'rain jacket': 'Casual Wear',
    'walking shoes': 'Footwear',
    'mosquito repellent': 'Beauty',
    'layers': 'Casual Wear',
    'warm layers': 'Sportswear',
    'jacket': 'Casual Wear',
    'boots': 'Footwear',
    'gloves': 'Accessories',
    'formal attire': 'Formal Wear',
    'dress shoes': 'Footwear',
    'briefcase': 'Bags',
    'hiking boots': 'Footwear',
    'backpack': 'Bags',
    'water bottle': 'Accessories',
    'first aid': 'Accessories',
    'camera': 'Accessories',
    'comfortable clothes': 'Casual Wear'
  };
  
  return categoryMap[item.toLowerCase()] || 'Accessories';
};

const generateItemDescription = (item: string, tripPlan: TripPlan): string => {
  const descriptions: { [key: string]: string } = {
    'swimwear': `Essential for ${tripPlan.destination} beach activities`,
    'sunscreen': `SPF 50+ protection for ${tripPlan.duration} days in ${tripPlan.destination}`,
    'sunglasses': `UV protection for ${tripPlan.destination} sunshine`,
    'hat': `Sun protection for ${tripPlan.duration} days`,
    'comfortable shoes': `For ${tripPlan.duration} days of walking in ${tripPlan.destination}`,
    'rain jacket': `Waterproof protection for ${tripPlan.destination} weather`,
    'warm layers': `Essential for ${tripPlan.destination} cold climate`,
    'formal attire': `Required for ${tripPlan.tripType} trip to ${tripPlan.destination}`
  };
  
  return descriptions[item.toLowerCase()] || `Recommended for your ${tripPlan.tripType} trip to ${tripPlan.destination}`;
};

const calculateQuantity = (item: string, tripPlan: TripPlan): number => {
  const baseQuantity = 1;
  
  // Adjust quantity based on duration and travelers
  if (item.includes('clothes') || item.includes('shirt') || item.includes('dress')) {
    return Math.min(tripPlan.duration, 7) * tripPlan.travelers;
  }
  
  if (item.includes('sunscreen') || item.includes('toiletries')) {
    return Math.ceil(tripPlan.duration / 3) * tripPlan.travelers;
  }
  
  if (item.includes('shoes') || item.includes('boots')) {
    return tripPlan.travelers;
  }
  
  return baseQuantity * tripPlan.travelers;
};

const generateReason = (item: string, tripPlan: TripPlan, locationRules: any): string => {
  const reasons = [
    `Essential for ${tripPlan.destination} climate`,
    `Recommended for ${tripPlan.tripType} activities`,
    `Perfect for ${tripPlan.duration} day trip`,
    `Ideal for ${tripPlan.travelers} travelers`,
    `Weather-appropriate for ${tripPlan.destination}`
  ];
  
  return faker.helpers.arrayElement(reasons);
};

const generateRecommendedItems = (
  tripPlan: TripPlan,
  products: Product[],
  locationRules: any
): PackingItem[] => {
  const recommendedItems: PackingItem[] = [];
  const categories = locationRules.categories || ['Casual Wear', 'Accessories'];
  
  // Add 3-5 recommended items
  const numRecommended = faker.number.int({ min: 3, max: 5 });
  
  for (let i = 0; i < numRecommended; i++) {
    const category = faker.helpers.arrayElement(categories);
    const categoryProducts = products.filter(p => p.category === category);
    
    if (categoryProducts.length > 0) {
      const product = faker.helpers.arrayElement(categoryProducts);
      recommendedItems.push({
        id: `rec-${i + 1}`,
        category,
        name: product.title,
        description: `Great addition for your ${tripPlan.tripType} trip`,
        quantity: 1,
        priority: 'recommended',
        product,
        isSelected: false,
        reason: `Popular choice for ${tripPlan.destination} trips`
      });
    }
  }
  
  return recommendedItems;
};

const generateOptionalItems = (
  tripPlan: TripPlan,
  products: Product[],
  locationRules: any
): PackingItem[] => {
  const optionalItems: PackingItem[] = [];
  const allCategories = ['Accessories', 'Beauty', 'Bags', 'Jewelry'];
  
  // Add 2-3 optional items
  const numOptional = faker.number.int({ min: 2, max: 3 });
  
  for (let i = 0; i < numOptional; i++) {
    const category = faker.helpers.arrayElement(allCategories);
    const categoryProducts = products.filter(p => p.category === category);
    
    if (categoryProducts.length > 0) {
      const product = faker.helpers.arrayElement(categoryProducts);
      optionalItems.push({
        id: `opt-${i + 1}`,
        category,
        name: product.title,
        description: `Nice to have for your trip`,
        quantity: 1,
        priority: 'optional',
        product,
        isSelected: false,
        reason: `Luxury item for ${tripPlan.destination}`
      });
    }
  }
  
  return optionalItems;
};
