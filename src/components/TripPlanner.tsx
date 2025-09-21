import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Thermometer, Sparkles, Package } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useApp } from '../context/AppContext';
import { generatePackingList as generatePackingListUtil } from '../utils/packingGenerator';
import { PackingListComponent } from './PackingList';

export const TripPlanner: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPackingList, setShowPackingList] = useState(false);
  const [tripPlan, setTripPlan] = useState({
    destination: '',
    tripType: 'leisure',
    duration: 3,
    climate: 'moderate',
    travelers: 2,
    occasion: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePackingList = async () => {
    if (!tripPlan.destination.trim()) {
      alert('Please enter a destination');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate packing list using our utility
      const packingList = generatePackingListUtil(tripPlan, state.products);
      
      if (!packingList || packingList.items.length === 0) {
        alert('Failed to generate packing list. Please try again.');
        return;
      }
      
      // Dispatch to context
      dispatch({ type: 'SET_PACKING_LIST', payload: packingList });
      
      setShowPackingList(true);
    } catch (error) {
      console.error('Error generating packing list:', error);
      alert('An error occurred while generating the packing list. Please try again.');
    } finally {
      setIsGenerating(false);
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
        <p className="text-sm text-gray-600">
          Let AI help you plan and pack for your family trip
        </p>
      )}

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                type="text"
                value={tripPlan.destination}
                onChange={(e) => setTripPlan(prev => ({ ...prev, destination: e.target.value }))}
                placeholder="e.g., Goa, Mumbai, Kerala"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

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
            onClick={handleGeneratePackingList}
            isLoading={isGenerating}
            className="w-full mt-6"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Packing List & Outfit Suggestions
          </Button>

          {isGenerating && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                🤖 AI is analyzing your trip details and generating personalized recommendations...
              </p>
            </div>
          )}

          {state.packingList && !showPackingList && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">
                    ✅ Packing list generated successfully!
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {state.packingList.totalItems} items found for your trip to {state.packingList.tripPlan.destination}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowPackingList(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Package className="w-4 h-4 mr-2" />
                  View Packing List
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {showPackingList && state.packingList && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <PackingListComponent onClose={() => setShowPackingList(false)} />
        </motion.div>
      )}
    </Card>
  );
};
