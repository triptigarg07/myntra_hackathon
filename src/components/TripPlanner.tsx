import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Thermometer, Sparkles, Package, ShoppingBag } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProductCard } from './ProductCard';
import { useApp } from '../context/AppContext';
import { tripDestinations, getDestinationRecommendations } from '../utils/tripData';

export const TripPlanner: React.FC = () => {
  const { state } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [tripPlan, setTripPlan] = useState({
    destination: 'goa',
    tripType: 'leisure',
    duration: 3,
    climate: 'moderate',
    travelers: 2,
    occasion: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(tripDestinations.goa);

  const generatePackingList = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get destination-specific recommendations
    const destData = getDestinationRecommendations(tripPlan.destination);
    if (destData) {
      setSelectedDestination(destData);
    }
    
    setIsGenerating(false);
  };

  const handleDestinationChange = (destination: string) => {
    setTripPlan(prev => ({ ...prev, destination }));
    const destData = getDestinationRecommendations(destination);
    if (destData) {
      setSelectedDestination(destData);
    }
  };
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Trip Planner</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse' : 'Plan Trip'}
        </Button>
      </div>

      {!isExpanded && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Let AI help you plan and pack for your family trip
          </p>
          
          {/* Quick destination preview */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <img
              src={selectedDestination.image}
              alt={selectedDestination.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{selectedDestination.name}</h4>
              <p className="text-sm text-gray-600">{selectedDestination.type}</p>
              <p className="text-xs text-gray-500">{selectedDestination.climate}</p>
            </div>
          </div>
        </div>
      )}

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          {/* Destination Selection with Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose Your Destination
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(tripDestinations).map(([key, dest]) => (
                <div
                  key={key}
                  onClick={() => handleDestinationChange(key)}
                  className={`cursor-pointer rounded-lg border-2 transition-all ${
                    tripPlan.destination === key
                      ? 'border-pink-500 ring-2 ring-pink-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-900">{dest.name}</h4>
                    <p className="text-sm text-gray-600">{dest.type}</p>
                    <p className="text-xs text-gray-500 mt-1">{dest.climate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Destination Description */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">About {selectedDestination.name}</h4>
            <p className="text-sm text-blue-700">{selectedDestination.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trip Type
              </label>
              <select
                value={tripPlan.tripType}
                onChange={(e) => setTripPlan(prev => ({ ...prev, tripType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="leisure">Leisure</option>
                <option value="business">Business</option>
                <option value="adventure">Adventure</option>
                <option value="beach">Beach</option>
                <option value="mountain">Mountain</option>
                <option value="city">City Break</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (days)
              </label>
              <input
                type="number"
                value={tripPlan.duration}
                onChange={(e) => setTripPlan(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                min="1"
                max="30"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Climate
              </label>
              <select
                value={tripPlan.climate}
                onChange={(e) => setTripPlan(prev => ({ ...prev, climate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="hot">Hot</option>
                <option value="moderate">Moderate</option>
                <option value="cold">Cold</option>
                <option value="rainy">Rainy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Travelers
              </label>
              <input
                type="number"
                value={tripPlan.travelers}
                onChange={(e) => setTripPlan(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Occasion (Optional)
              </label>
              <input
                type="text"
                value={tripPlan.occasion}
                onChange={(e) => setTripPlan(prev => ({ ...prev, occasion: e.target.value }))}
                placeholder="e.g., Wedding, Anniversary"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          <Button
            onClick={generatePackingList}
            isLoading={isGenerating}
            className="w-full"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Smart Packing List
          </Button>

          {isGenerating && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                🤖 AI is analyzing your trip details and generating personalized recommendations...
              </p>
            </div>
          )}

          {/* Packing List */}
          {!isGenerating && (
            <div className="space-y-6 mt-6">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-green-600" />
                <h4 className="text-lg font-semibold text-gray-900">
                  Packing List for {selectedDestination.name}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedDestination.packingList.map((category, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-3">{category.category}</h5>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
        </motion.div>
      )}
    </Card>
  );
};

              {/* Recommended Products */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-purple-600" />
                  <h4 className="text-lg font-semibold text-gray-900">
                    Recommended Products for {selectedDestination.name}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedDestination.recommendedProducts.map((product, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3">
                        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                        <h6 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                          {product.title}
                        </h6>
                        <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                        <p className="font-bold text-pink-600">₹{product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}