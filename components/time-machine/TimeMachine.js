'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimeMachineInput from './TimeMachineInput';
import TimeMachineLoading from './TimeMachineLoading';
import DecayChart from './DecayChart';
import BasketTable from './BasketTable';
import LifeMarkers from './LifeMarkers';
import SummaryStats from './SummaryStats';
import ShareActions from './ShareActions';
import purchasingPowerData from '@/data/purchasing-power.json';

const CURRENT_YEAR = 2024;

// Utility to interpolate values for years not in dataset
function getValueForYear(data, year) {
  if (data[year] !== undefined) return data[year];
  
  const years = Object.keys(data).map(Number).sort((a, b) => a - b);
  
  // Find surrounding years
  let lower = years[0];
  let upper = years[years.length - 1];
  
  for (let i = 0; i < years.length - 1; i++) {
    if (years[i] <= year && years[i + 1] >= year) {
      lower = years[i];
      upper = years[i + 1];
      break;
    }
  }
  
  if (year <= lower) return data[lower];
  if (year >= upper) return data[upper];
  
  // Linear interpolation
  const ratio = (year - lower) / (upper - lower);
  return data[lower] + (data[upper] - data[lower]) * ratio;
}

// Calculate all derived data from birth year
function calculateData(birthYear) {
  const cpi = purchasingPowerData.cpi;
  const birthCPI = getValueForYear(cpi, birthYear);
  const currentCPI = cpi[CURRENT_YEAR];
  
  // Calculate purchasing power for each year
  const yearlyData = [];
  for (let year = birthYear; year <= CURRENT_YEAR; year++) {
    const yearCPI = getValueForYear(cpi, year);
    const purchasingPower = 100 * (birthCPI / yearCPI);
    
    // Calculate age
    const age = year - birthYear;
    
    // Check for events
    const event = purchasingPowerData.events[year] || null;
    
    yearlyData.push({
      year,
      age,
      purchasingPower: Math.round(purchasingPower * 100) / 100,
      event,
    });
  }
  
  // Final purchasing power
  const finalPurchasingPower = 100 * (birthCPI / currentCPI);
  const erosion = 100 - finalPurchasingPower;
  
  // Calculate basket comparison
  const basket = [
    {
      id: 'gas',
      name: 'Gallons of Gas',
      icon: '⛽',
      birthValue: 100 / getValueForYear(purchasingPowerData.gas, birthYear),
      currentValue: finalPurchasingPower / purchasingPowerData.gas[CURRENT_YEAR],
    },
    {
      id: 'bigMac',
      name: 'Big Macs',
      icon: '🍔',
      birthValue: 100 / getValueForYear(purchasingPowerData.bigMac, birthYear),
      currentValue: finalPurchasingPower / purchasingPowerData.bigMac[CURRENT_YEAR],
    },
    {
      id: 'movieTicket',
      name: 'Movie Tickets',
      icon: '🎬',
      birthValue: 100 / getValueForYear(purchasingPowerData.movieTicket, birthYear),
      currentValue: finalPurchasingPower / purchasingPowerData.movieTicket[CURRENT_YEAR],
    },
    {
      id: 'gold',
      name: 'Oz of Gold',
      icon: '🥇',
      birthValue: 100 / getValueForYear(purchasingPowerData.gold, birthYear),
      currentValue: finalPurchasingPower / purchasingPowerData.gold[CURRENT_YEAR],
    },
    {
      id: 'sp500',
      name: 'S&P 500 Shares',
      icon: '📈',
      birthValue: 100 / getValueForYear(purchasingPowerData.sp500, birthYear),
      currentValue: finalPurchasingPower / purchasingPowerData.sp500[CURRENT_YEAR],
    },
  ];
  
  // Add delta calculation
  basket.forEach(item => {
    item.delta = ((item.currentValue - item.birthValue) / item.birthValue) * 100;
  });
  
  // Life markers
  const markers = [
    { age: 0, year: birthYear, label: 'Born' },
  ];
  
  if (birthYear + 18 <= CURRENT_YEAR) {
    markers.push({ age: 18, year: birthYear + 18, label: 'Age 18' });
  }
  if (birthYear + 30 <= CURRENT_YEAR) {
    markers.push({ age: 30, year: birthYear + 30, label: 'Age 30' });
  }
  if (birthYear + 40 <= CURRENT_YEAR) {
    markers.push({ age: 40, year: birthYear + 40, label: 'Age 40' });
  }
  markers.push({ age: CURRENT_YEAR - birthYear, year: CURRENT_YEAR, label: 'Today' });
  
  // Add purchasing power and home affordability to markers
  markers.forEach(marker => {
    const markerCPI = getValueForYear(cpi, marker.year);
    marker.purchasingPower = 100 * (birthCPI / markerCPI);
    
    const homePrice = getValueForYear(purchasingPowerData.medianHome, marker.year);
    const income = getValueForYear(purchasingPowerData.medianIncome, marker.year);
    marker.homeMultiple = homePrice / income;
    
    marker.collegeCost = getValueForYear(purchasingPowerData.collegeTuition, marker.year);
  });
  
  // Determine generation
  let generation = 'Unknown';
  for (const [gen, range] of Object.entries(purchasingPowerData.generations)) {
    if (birthYear >= range.start && birthYear <= range.end) {
      generation = gen;
      break;
    }
  }
  
  // Calculate generation rankings
  const genErosions = {
    'Silent': { start: 1940, erosion: 95.5 },
    'Boomer': { start: 1955, erosion: 91.2 },
    'Gen X': { start: 1975, erosion: 83.0 },
    'Millennial': { start: 1990, erosion: 58.6 },
    'Gen Z': { start: 2005, erosion: 37.9 },
  };
  
  const sortedGens = Object.entries(genErosions)
    .sort((a, b) => b[1].erosion - a[1].erosion);
  
  const genRank = sortedGens.findIndex(([gen]) => gen === generation) + 1;
  
  return {
    birthYear,
    currentYear: CURRENT_YEAR,
    yearlyData,
    finalPurchasingPower,
    erosion,
    basket,
    markers,
    generation,
    genRank,
    totalGenerations: Object.keys(purchasingPowerData.generations).length,
  };
}

export default function TimeMachine() {
  const [birthYear, setBirthYear] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  
  const handleSubmit = useCallback((year) => {
    setBirthYear(year);
    setIsLoading(true);
    setData(null);
    
    // Simulate loading for dramatic effect
    setTimeout(() => {
      const calculatedData = calculateData(year);
      setData(calculatedData);
      setIsLoading(false);
    }, 1500);
  }, []);
  
  const handleReset = useCallback(() => {
    setBirthYear(null);
    setData(null);
  }, []);
  
  return (
    <div className="space-y-6">
      {/* Input Section */}
      <TimeMachineInput 
        onSubmit={handleSubmit} 
        disabled={isLoading}
        currentYear={birthYear}
        onReset={handleReset}
      />
      
      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <TimeMachineLoading />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Results */}
      <AnimatePresence>
        {data && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
            data-export-container
          >
            {/* Decay Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <DecayChart data={data} />
            </motion.div>
            
            {/* Basket Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BasketTable data={data} />
            </motion.div>
            
            {/* Life Markers & Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <LifeMarkers data={data} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <SummaryStats data={data} />
              </motion.div>
            </div>
            
            {/* Share Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ShareActions data={data} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
