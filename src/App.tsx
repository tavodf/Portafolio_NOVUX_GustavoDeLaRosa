/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Home } from './components/Home';
import { ServiceDetail } from './components/ServiceDetail';
import { MatrixRain } from './components/MatrixRain';
import { services } from './data';
import { ServiceId } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'HOME' | ServiceId>('HOME');

  const handleSelectService = (id: ServiceId) => {
    setCurrentView(id);
  };

  const handleBack = () => {
    setCurrentView('HOME');
  };

  return (
    <div className="w-full min-h-screen bg-[#060608] overflow-hidden relative">
      <MatrixRain />
      <div className="relative z-10 w-full min-h-screen overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentView === 'HOME' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <Home onSelectService={handleSelectService} />
            </motion.div>
          ) : (
            <motion.div
              key={currentView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <ServiceDetail 
                service={services[currentView as ServiceId] || Object.values(services)[0]} 
                onBack={handleBack} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


