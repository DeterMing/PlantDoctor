import { Plant } from '../types';
import { PlantCard } from './PlantCard';
import { Plus, Filter } from 'lucide-react';
import { useState } from 'react';
import { PlantDetailView } from './PlantDetailView';
import { AnimatePresence, motion } from 'motion/react';

interface MyPlantsViewProps {
  plants: Plant[];
}

export function MyPlantsView({ plants }: MyPlantsViewProps) {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const handlePlantClick = (plant: Plant) => {
    setSelectedPlant(plant);
  };

  return (
    <div className="py-12 animate-fade-in relative min-h-screen">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-headline text-primary font-bold mb-4">Vườn của tôi</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">Bộ sưu tập những người bạn thực vật của bạn. Quản lý {plants.length} mẫu vật trên các vùng tiểu khí hậu địa phương.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface-container-high text-on-surface px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            <Filter className="h-5 w-5" />
            Lọc
          </button>
          <button className="botanical-gradient text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-primary/10">
            <Plus className="h-5 w-5" />
            Thêm cây
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {plants.map((plant) => (
          <div 
            key={plant.id} 
            onClick={() => handlePlantClick(plant)}
            className="cursor-pointer"
          >
            <PlantCard plant={plant} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPlant && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlant(null)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />
            <PlantDetailView 
              plant={selectedPlant} 
              onClose={() => setSelectedPlant(null)} 
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
