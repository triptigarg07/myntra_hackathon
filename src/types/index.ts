export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  myntraId?: string;
}

export interface Room {
  id: string;
  name: string;
  ownerId: string;
  visibility: 'private' | 'public';
  inviteCode: string;
  createdAt: Date;
  memberCount: number;
}

export interface RoomMember {
  id: string;
  roomId: string;
  userId: string;
  user: User;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
  isOnline: boolean;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  rating: number;
  reviews: number;
  sizes?: string[];
  colors?: string[];
}

export interface RoomActivity {
  id: string;
  roomId: string;
  userId: string | null;
  user?: User;
  actionType: 'view' | 'add' | 'recommend' | 'remove' | 'comment';
  productId?: string;
  product?: Product;
  message?: string;
  isSecret: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface Recommendation {
  id: string;
  roomId: string;
  type: 'similar' | 'complementary' | 'trending' | 'packing';
  products: Product[];
  reason: string;
  triggeredBy?: string;
  createdAt: Date;
}

export interface TripPlan {
  destination: string;
  tripType: string;
  duration: number;
  climate: string;
  travelers: number;
  occasion?: string;
}

export interface PackingItem {
  id: string;
  category: string;
  name: string;
  description: string;
  quantity: number;
  priority: 'essential' | 'recommended' | 'optional';
  product?: Product;
  isSelected: boolean;
  reason: string;
}

export interface PackingList {
  id: string;
  tripPlan: TripPlan;
  items: PackingItem[];
  generatedAt: Date;
  totalItems: number;
  selectedItems: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  lastUpdated: Date;
}