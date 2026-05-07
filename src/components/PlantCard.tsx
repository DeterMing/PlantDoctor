import { Droplets, Scissors, Sprout, ClipboardCheck } from 'lucide-react';
import { Plant } from '../types';
import { motion } from 'motion/react';

const careIcons = {
  'Tưới nước': Droplets,
  'Bón phân': Sprout,
  'Thay đất': ClipboardCheck,
  'Cắt tỉa': Scissors,
};

const statusColors = {
  'Xanh tốt': 'bg-emerald-500',
  'Cần nước': 'bg-amber-500',
  'Ổn định': 'bg-emerald-500',
  'Nguy kịch': 'bg-red-500',
  'Đang theo dõi': 'bg-blue-400',
};

interface PlantCardProps {
  plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
  const Icon = (careIcons as any)[plant.careType] || Droplets;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl bg-surface-container-lowest shadow-sm transition-all hover:shadow-xl"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 backdrop-blur shadow-sm">
          <div className={`h-2 w-2 rounded-full ${(statusColors as any)[plant.status]}`}></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">
            {plant.status}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-headline text-xl font-bold text-primary">{plant.name}</h3>
        <p className="mb-4 text-xs italic text-on-surface-variant">{plant.scientificName}</p>
        
        <div className="flex items-center justify-between border-t border-outline-variant/20 pt-4">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-outline">Chăm sóc tiếp theo</span>
            <span className="text-sm font-medium text-on-surface">{plant.careType} • {plant.nextCare}</span>
          </div>
          <Icon className="h-5 w-5 text-secondary" />
        </div>
      </div>
    </motion.div>
  );
}
