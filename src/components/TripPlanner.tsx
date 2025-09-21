import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MapPin, Calendar, Users, Thermometer, Sparkles, Package, ShoppingBag, AlertCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useApp } from '../context/AppContext';
import { tripDestinations, getDestinationRecommendations, generateRecommendationsFromWeather } from '../utils/tripData';

export const TripPlanner: React.FC = () => {
  const { state } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [tripPlan, setTripPlan] = useState({
    destination: 'goa',
    tripType: 'leisure',
    duration: 3,
    travelers: 2,
  });
  const [customLocation, setCustomLocation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState(tripDestinations.goa);

  const generatePackingList = async () => {
    setIsGenerating(true);
    setApiError(null);

    if (customLocation.trim()) {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        if (!apiKey || apiKey === 'YOUR_API_KEY') {
          setApiError('OpenWeather API key is not configured. Please add it to your .env file.');
          setIsGenerating(false);
          return;
        }
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${customLocation}&appid=${apiKey}&units=metric`);
        const recommendations = generateRecommendationsFromWeather(response.data, state.products);
        setSelectedDestination(recommendations);
      } catch (error) {
        setApiError('Could not fetch weather data. Please check the location name and your API key.');
        console.error(error);
      }
    } else {
      // Simulate processing for pre-defined destinations
      await new Promise(resolve => setTimeout(resolve, 1000));
      const destData = getDestinationRecommendations(tripPlan.destination);
      if (destData) {
        setSelectedDestination(destData);
      }
    }
    setIsGenerating(false);
  };

  const handleDestinationChange = (destination: string) => {
    setTripPlan(prev => ({ ...prev, destination }));
    setCustomLocation(''); // Clear custom location when a card is clicked
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
          <h3 className="text-lg font-semibold text-gray-900">AI Trip Planner</h3>
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
            Let AI help you plan and pack for your family trip with destination-specific recommendations.
          </p>
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
          className="space-y-6"
        >
          {/* Destination Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose a Popular Destination
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(tripDestinations).map(([key, dest]) => (
                <div
                  key={key}
                  onClick={() => handleDestinationChange(key)}
                  className={`cursor-pointer rounded-lg border-2 transition-all ${
                    tripPlan.destination === key && !customLocation
                      ? 'border-pink-500 ring-2 ring-pink-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-24 object-cover rounded-t-lg"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">{dest.name}</h4>
                    <p className="text-xs text-gray-600">{dest.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Location Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or Enter a Custom Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={customLocation}
                onChange={(e) => {
                  setCustomLocation(e.target.value);
                  if (e.target.value) setTripPlan(prev => ({ ...prev, destination: '' }));
                }}
                placeholder="e.g., Paris, London, Tokyo..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          <Button
            onClick={generatePackingList}
            isLoading={isGenerating}
            disabled={!customLocation.trim() && !tripPlan.destination}
            className="w-full"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Smart Packing List
          </Button>

          {apiError && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-700">{apiError}</p>
            </div>
          )}

          {isGenerating && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                🤖 AI is analyzing your trip details and generating personalized recommendations for {customLocation || selectedDestination.name}...
              </p>
            </div>
          )}

          {!isGenerating && (
            <div className="space-y-6 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">About {selectedDestination.name}</h4>
                <p className="text-sm text-blue-700">{selectedDestination.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-green-600" />
                <h4 className="text-lg font-semibold text-gray-900">
                  Smart Packing List for {selectedDestination.name}
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

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-purple-600" />
                  <h4 className="text-lg font-semibold text-gray-900">
                    Curated Products for {selectedDestination.name}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedDestination.recommendedProducts.map((product, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                        <h6 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                          {product.title}
                        </h6>
                        <p className="text-xs text-gray-600 mb-3">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-pink-600">₹{product.price.toLocaleString()}</p>
                          <Button size="sm" className="text-xs px-3 py-1">
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                 {selectedDestination.recommendedProducts.length === 0 && (
                  <p className="text-sm text-gray-500">No specific products found for this custom location. Try exploring the full product grid!</p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </Card>
  );
};
