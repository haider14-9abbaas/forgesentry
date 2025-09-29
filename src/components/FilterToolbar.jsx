import { motion } from 'framer-motion';
import { LayoutDashboard, Bot, ShieldCheck, Code2, Wrench, Sparkles, BrainCircuit } from 'lucide-react';

const FilterToolbar = ({ categories, activeCategory, onCategoryChange }) => {
  const categoryIcons = {
    'UI/UX': LayoutDashboard,
    AI: Bot,
    Security: ShieldCheck,
    Full: Code2,
    Functional: Wrench,
    Interactive: Sparkles,
  };

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((category, index) => {
          const Icon = categoryIcons[category] || BrainCircuit;
          const isActive = activeCategory === category;

          return (
            <motion.button
              key={category}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onCategoryChange(category)}
              className="filter-chip flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm border transition-colors"
              style={
                isActive
                  ? {
                      backgroundColor: 'var(--cn-cyan, #22D3EE)',
                      borderColor: 'var(--cn-cyan, #22D3EE)',
                      color: '#0f172a',
                      boxShadow: '0 8px 24px rgba(2,6,23,0.12)',
                    }
                  : {
                      backgroundColor: '#fff',
                      borderColor: 'rgba(226,232,240,1)',
                      color: 'rgb(51,65,85)',
                    }
              }
            >
              <Icon size={16} />
              <span>{category}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterToolbar;
